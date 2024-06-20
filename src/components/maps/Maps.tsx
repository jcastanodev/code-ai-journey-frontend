import { useState } from "react";
import { APIProvider, Map, MapCameraChangedEvent, MapCameraProps } from "@vis.gl/react-google-maps";
import { Directions } from "./Directions";
import { Search } from "./Search";
import { BreadcrumbBar } from "./BreadcrumbBar";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { setFrom, setTo, setWaypoints, setMapRoutes } from "@store/reducers/MapsReducer";
import { SavedRoutes } from "./SavedRoutes";
import { PlaceInterface } from "@interfaces/MapsInterface";

// Replace with your Google Maps API key
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY ?? "";

export function Maps() {
	const dispatch = useAppDispatch();
	// TODO: const isDarkMode = useAppSelector((state) => state.appSetting.isDarkMode);
	const INITIAL_CAMERA = {
		center: { lat: 4.7, lng: -74.063644 },
		zoom: 12,
	};
	const [cameraProps, setCameraProps] = useState<MapCameraProps>(INITIAL_CAMERA);
	const handleCameraChange = (event: MapCameraChangedEvent): void => {
		setCameraProps(event.detail);
	};
	const fromPlace = useAppSelector((state) => state.maps.currentRoute!.from);
	const toPlace = useAppSelector((state) => state.maps.currentRoute!.to);
	const waypoints = useAppSelector((state) => state.maps.currentRoute!.waypoints);
	const routes = useAppSelector((state) => state.maps.currentRoute!.routes);
	const [searchValue, setSearchValue] = useState<string>("");
	const [editFrom, setEditFrom] = useState<boolean>(false);
	const [editTo, setEditTo] = useState<boolean>(false);
	const [editWaypointIndex, setEditWaypointIndex] = useState<number | null>(null);
	const [showSavedRoutes, setShowSavedRoutes] = useState<boolean>(false);

	const onPlaceSelect = (place: PlaceInterface | null) => {
		setCameraProps({
			center: {
				lat: place?.location?.lat ?? 43.65,
				lng: place?.location?.lng ?? -79.38,
			},
			zoom: 12,
		});
		console.log(place);
		if (editTo || toPlace === null) {
			setEditTo(false);
			dispatch(setTo(place));
			return;
		}
		if (editFrom || fromPlace === null) {
			setEditFrom(false);
			dispatch(setFrom(place));
			return;
		}
		if (editWaypointIndex !== null) {
			dispatch(
				setWaypoints(
					waypoints.length > editWaypointIndex + 1
						? [
								...waypoints.slice(0, editWaypointIndex),
								place,
								...waypoints.slice(editWaypointIndex + 1),
						  ]
						: [...waypoints.slice(0, editWaypointIndex), place]
				)
			);
			return;
		}
		const index = waypoints.indexOf(null);
		if (index != -1) {
			const tempWaypoints = waypoints.filter((element) => element !== null);
			dispatch(
				setWaypoints([...tempWaypoints.slice(0, index), place, ...tempWaypoints.slice(index)])
			);
		}
	};

	const addWaypoint = (index: number) => {
		console.log(index);
		const tempWaypoints = waypoints.filter((element) => element !== null);
		dispatch(setWaypoints([...tempWaypoints.slice(0, index), null, ...tempWaypoints.slice(index)]));
		setSearchValue("");
		setEditFrom(false);
		setEditTo(false);
		setEditWaypointIndex(null);
	};

	const editWaypoint = (index: number) => {
		const tempWaypoints = waypoints.filter((element) => element !== null);
		dispatch(setWaypoints(tempWaypoints));
		setEditFrom(false);
		setEditTo(false);
		setEditWaypointIndex(index);
		setSearchValue(waypoints[index]?.name ?? "");
	};

	const deleteWaypoint = (index: number) => {
		dispatch(
			setWaypoints(
				waypoints.length > index + 1
					? [...waypoints.slice(0, index), ...waypoints.slice(index + 1)]
					: [...waypoints.slice(0, index)]
			)
		);
	};

	const saveRoute = () => {
		console.log(routes);
		dispatch(
			setMapRoutes(
				routes
					? [[fromPlace!, ...waypoints.filter((element) => element !== null), toPlace!], ...routes]
					: [[fromPlace!, ...waypoints.filter((element) => element !== null), toPlace!]]
			)
		);
		clearRoute();
	};

	const restoreSavedRoute = (savedRoute: PlaceInterface[]) => {
		dispatch(setWaypoints(savedRoute.slice(1, savedRoute.length - 1)));
		dispatch(setTo(savedRoute[savedRoute.length - 1]));
		dispatch(setFrom(savedRoute[0]));
		setEditFrom(false);
		setEditTo(false);
		setEditWaypointIndex(null);
	};

	const deleteSavedRoute = (index: number) => {
		dispatch(
			setMapRoutes(
				routes.length > index + 1
					? [...routes.slice(0, index), ...routes.slice(index + 1)]
					: [...routes.slice(0, index)]
			)
		);
	};

	const clearRoute = () => {
		dispatch(setWaypoints([]));
		dispatch(setTo(null));
		dispatch(setFrom(null));
		setEditFrom(false);
		setEditTo(false);
		setEditWaypointIndex(null);
	};

	return (
		<div className="w-full h-full relative">
			<APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
				<Map
					mapId="app_map"
					reuseMaps={true}
					{...cameraProps}
					onCameraChanged={handleCameraChange}
					gestureHandling={"greedy"}
					disableDefaultUI={true}
				>
					<Search
						searchValue={searchValue}
						setSearchValue={setSearchValue}
						placeholder={"Search a place?"}
						onPlaceSelect={onPlaceSelect}
						showSavedRoutes={showSavedRoutes}
						toggleShowSavedRoutes={() => {
							setShowSavedRoutes(!showSavedRoutes);
						}}
						routes={routes}
					/>
					<BreadcrumbBar
						from={fromPlace}
						to={toPlace}
						waypoints={waypoints}
						onEditFrom={() => {
							setSearchValue(fromPlace?.name ?? "");
							setEditFrom(true);
							setEditTo(false);
							setEditWaypointIndex(null);
						}}
						onEditTo={() => {
							setSearchValue(toPlace?.name ?? "");
							setEditFrom(false);
							setEditTo(true);
							setEditWaypointIndex(null);
						}}
						addWaypoint={addWaypoint}
						editWaypoint={editWaypoint}
						deleteWaypoint={deleteWaypoint}
						saveRoute={saveRoute}
					/>
					<SavedRoutes
						showSavedRoutes={showSavedRoutes}
						routes={routes}
						onSelectSavedRoute={restoreSavedRoute}
						onDeleteSavedRoute={deleteSavedRoute}
					/>
					<Directions from={fromPlace} to={toPlace} />
				</Map>
			</APIProvider>
		</div>
	);
}
