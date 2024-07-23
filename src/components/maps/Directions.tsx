import { useEffect, useState } from "react";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useAppSelector } from "@store/hooks";
import { PlaceInterface } from "@interfaces/MapsInterface";
import { MapsUtil } from "@utils/maps/MapsUtil";
import { useTranslation } from "react-i18next";

interface Props {
	from: PlaceInterface | null;
	to: PlaceInterface | null;
}
export function Directions({ from = null, to = null }: Readonly<Props>) {
	const { t } = useTranslation();
	const waypoints = useAppSelector((state) => state.maps.currentRoute!.waypoints);
	const map = useMap();
	const routesLibrary = useMapsLibrary("routes");
	const [directionsService, setDirectionsService] = useState<google.maps.DirectionsService>();
	const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer>();
	const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([]);
	const [routeIndex, setRouteIndex] = useState(0);
	const selected = routes[routeIndex];
	const legs = selected?.legs;

	// Initialize directions service and renderer
	useEffect(() => {
		if (!routesLibrary || !map) return;
		setDirectionsService(new routesLibrary.DirectionsService());
		const newDirectionsRenderer = new routesLibrary.DirectionsRenderer({
			draggable: true,
			map,
		});
		newDirectionsRenderer.addListener("directions_changed", () => {
			const directions = newDirectionsRenderer.getDirections();

			console.log("directions_changed", directions);
		});
		setDirectionsRenderer(newDirectionsRenderer);
	}, [routesLibrary, map]);

	// Use directions service
	useEffect(() => {
		console.log("update directions");
		if (!directionsService || !directionsRenderer) return;
		if (!from || !to) {
			directionsRenderer.set("directions", null);
			setRoutes([]);
			setRouteIndex(0);
			return;
		}
		const waypts: google.maps.DirectionsWaypoint[] = [];
		waypoints?.forEach((waypoint) => {
			if (waypoint) waypts.push({ location: waypoint.location, stopover: true });
		});
		directionsService
			.route({
				origin: from?.location,
				destination: to?.location,
				waypoints: waypts,
				travelMode: google.maps.TravelMode.DRIVING,
				provideRouteAlternatives: true,
			})
			.then((response) => {
				console.log("directionsService", response);
				directionsRenderer.set("directions", null);
				directionsRenderer.setDirections(response);
				setRoutes(response.routes);
			});
	}, [directionsService, directionsRenderer, from, to, waypoints]);

	// Update direction route
	useEffect(() => {
		if (!directionsRenderer) return;
		directionsRenderer.setRouteIndex(routeIndex);
	}, [routeIndex, directionsRenderer]);

	if (!legs) return null;

	return (
		<div className="absolute bottom-0 left-0 right-0 bg-black/50 p-4 text-white max-h-48 overflow-y-auto">
			<h2 className="text-white text-center mb-2">{selected.summary}</h2>
			<div className="flex flex-wrap gap-2">
				{legs.map((leg) => (
					<div key={leg.start_address}>
						<span>
							<a href="#">{MapsUtil.shortAddress(leg.start_address)}</a> to{" "}
							{MapsUtil.shortAddress(leg.end_address)}
						</span>
						<p>
							{t("distance")}: {leg.distance?.text}
						</p>
						<p>
							{t("duration")}: {leg.duration?.text}
						</p>
					</div>
				))}
			</div>
			<div className="text-center">
				<h2 className="text-white">{t("otherRoutes")}</h2>
				<ul>
					{routes.map((route, index) => (
						<li key={route.summary}>
							<button onClick={() => setRouteIndex(index)}>{route.summary}</button>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
