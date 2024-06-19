import { useEffect, useState } from "react";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useAppSelector } from "@store/hooks";

interface Props {
	from: google.maps.places.PlaceResult | null;
	to: google.maps.places.PlaceResult | null;
}
export function Directions({ from = null, to = null }: Readonly<Props>) {
	const waypoints = useAppSelector((state) => state.maps.currentRoute!.waypoints);
	const map = useMap();
	const routesLibrary = useMapsLibrary("routes");
	const [directionsService, setDirectionsService] = useState<google.maps.DirectionsService>();
	const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer>();
	const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([]);
	const [routeIndex, setRouteIndex] = useState(0);
	const selected = routes[routeIndex];
	const leg = selected?.legs[0];

	// Initialize directions service and renderer
	useEffect(() => {
		if (!routesLibrary || !map) return;
		setDirectionsService(new routesLibrary.DirectionsService());
		setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));
	}, [routesLibrary, map]);

	// Use directions service
	useEffect(() => {
		console.log("update directions");
		if (!directionsService || !directionsRenderer) return;
		if (!from || !to) {
			directionsRenderer.set("directions", null);
			return;
		}
		const waypts: google.maps.DirectionsWaypoint[] = [];
		waypoints?.forEach((waypoint) => {
			if (waypoint) waypts.push({ location: waypoint.geometry!.location, stopover: true });
		});
		directionsService
			.route({
				origin: from?.geometry?.location!,
				destination: to?.geometry?.location!,
				waypoints: waypts,
				travelMode: google.maps.TravelMode.DRIVING,
				provideRouteAlternatives: true,
			})
			.then((response) => {
				console.log("directionsService", response);
				directionsRenderer.setDirections(response);
				setRoutes(response.routes);
			});
	}, [directionsService, directionsRenderer, from, to, waypoints]);

	// Update direction route
	useEffect(() => {
		if (!directionsRenderer) return;
		directionsRenderer.setRouteIndex(routeIndex);
	}, [routeIndex, directionsRenderer]);

	if (!leg) return null;

	return (
		<div className="absolute bottom-0 left-0 right-0 bg-black/50 p-4 text-white">
			<h2 className="text-white">{selected.summary}</h2>
			<p>
				{leg.start_address.split(",")[0]} to {leg.end_address.split(",")[0]}
			</p>
			<p>Distance: {leg.distance?.text}</p>
			<p>Duration: {leg.duration?.text}</p>

			<h2 className="text-white">Other Routes</h2>
			<ul>
				{routes.map((route, index) => (
					<li key={route.summary}>
						<button onClick={() => setRouteIndex(index)}>{route.summary}</button>
					</li>
				))}
			</ul>
		</div>
	);
}
