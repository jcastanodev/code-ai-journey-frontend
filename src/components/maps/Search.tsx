import React, { useEffect, useState, useCallback, FormEvent } from "react";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";

interface Props {
	searchValue: string;
	setSearchValue: React.Dispatch<React.SetStateAction<string>>;
	placeholder?: string;
	onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
}
export const Search = ({ placeholder, onPlaceSelect, searchValue, setSearchValue }: Props) => {
	const map = useMap();
	const places = useMapsLibrary("places");

	// https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompleteSessionToken
	const [sessionToken, setSessionToken] = useState<google.maps.places.AutocompleteSessionToken>();

	// https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service
	const [autocompleteService, setAutocompleteService] =
		useState<google.maps.places.AutocompleteService | null>(null);

	// https://developers.google.com/maps/documentation/javascript/reference/places-service
	const [placesService, setPlacesService] = useState<google.maps.places.PlacesService | null>(null);

	const [predictionResults, setPredictionResults] = useState<
		Array<google.maps.places.AutocompletePrediction>
	>([]);

	useEffect(() => {
		if (!places || !map) return;

		setAutocompleteService(new places.AutocompleteService());
		setPlacesService(new places.PlacesService(map));
		setSessionToken(new places.AutocompleteSessionToken());

		return () => setAutocompleteService(null);
	}, [map, places]);

	const fetchPredictions = useCallback(
		async (searchValue: string) => {
			if (!autocompleteService || !searchValue) {
				setPredictionResults([]);
				return;
			}

			const request = { input: searchValue, sessionToken };
			const response = await autocompleteService.getPlacePredictions(request);

			setPredictionResults(response.predictions);
		},
		[autocompleteService, sessionToken]
	);

	const onInputChange = useCallback(
		(event: FormEvent<HTMLInputElement>) => {
			const value = (event.target as HTMLInputElement)?.value;

			setSearchValue(value);
			fetchPredictions(value);
		},
		[fetchPredictions]
	);

	const handleSuggestionClick = useCallback(
		(placeId: string) => {
			if (!places) return;

			const detailRequestOptions = {
				placeId,
				fields: ["geometry", "name", "formatted_address"],
				sessionToken,
			};

			const detailsRequestCallback = (placeDetails: google.maps.places.PlaceResult | null) => {
				console.log("placeDetails", placeDetails);
				onPlaceSelect(placeDetails);
				setPredictionResults([]);
				setSearchValue(""); // setSearchValue(placeDetails?.formatted_address ?? "");
				setSessionToken(new places.AutocompleteSessionToken());
			};

			placesService?.getDetails(detailRequestOptions, detailsRequestCallback);
		},
		[onPlaceSelect, places, placesService, sessionToken]
	);

	return (
		<div className="absolute top-0 left-0 right-0 bg-black/50 z-50 flex justify-center">
			<div className="w-4/5 sm:w-2/3 lg:w-1/3">
				<input
					className="w-full p-2 text-black rounded-xl border-black border text-center"
					value={searchValue}
					onInput={(event: FormEvent<HTMLInputElement>) => onInputChange(event)}
					placeholder={placeholder ?? "Search for a place"}
				/>

				{predictionResults.length > 0 && (
					<ul className="custom-list">
						{predictionResults.map(({ place_id, description }) => {
							return (
								<li
									key={place_id}
									className="text-white p-2 cursor-pointer hover:bg-white/10 rounded-xl"
									onClick={() => handleSuggestionClick(place_id)}
								>
									{description}
								</li>
							);
						})}
					</ul>
				)}
			</div>
		</div>
	);
};
