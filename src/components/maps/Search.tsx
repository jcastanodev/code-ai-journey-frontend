import React, { useEffect, useState, useCallback, FormEvent } from "react";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { PlaceInterface } from "@interfaces/MapsInterface";

interface Props {
	searchValue: string;
	setSearchValue: React.Dispatch<React.SetStateAction<string>>;
	placeholder?: string;
	onPlaceSelect: (place: PlaceInterface | null) => void;
	showSavedRoutes: boolean;
	toggleShowSavedRoutes: VoidFunction;
	routes: PlaceInterface[][];
}
export const Search = ({
	placeholder,
	onPlaceSelect,
	searchValue,
	setSearchValue,
	showSavedRoutes,
	toggleShowSavedRoutes,
	routes,
}: Props) => {
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
				onPlaceSelect({
					location: {
						lat: placeDetails?.geometry?.location?.lat()!,
						lng: placeDetails?.geometry?.location?.lng()!,
					},
					name: placeDetails?.name ?? "",
					address: placeDetails?.formatted_address ?? "",
					place_id: placeId,
				});
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
			<div className="w-full">
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
			<div className="w-auto">
				<button
					className="w-full p-2 text-white text-center whitespace-nowrap"
					onClick={toggleShowSavedRoutes}
				>
					{!showSavedRoutes && (
						<FontAwesomeIcon icon={faCaretRight} size="xl" className="text-white" />
					)}
					{showSavedRoutes && (
						<FontAwesomeIcon icon={faCaretDown} size="xl" className="text-white" />
					)}
					<span className="ml-2">Saved Routes ({routes.length})</span>
				</button>
			</div>
		</div>
	);
};
