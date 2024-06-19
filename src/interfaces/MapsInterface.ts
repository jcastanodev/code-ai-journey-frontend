export interface MapsStateInterface {
    currentRoute?: MapsRouteInterface;
}

export interface MapsRouteInterface {
    from: google.maps.places.PlaceResult | null;
    to: google.maps.places.PlaceResult | null;
    waypoints: (google.maps.places.PlaceResult | null)[];
}
