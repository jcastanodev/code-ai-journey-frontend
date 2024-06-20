export interface MapsStateInterface {
    currentRoute?: MapsRouteInterface;
}

export interface MapsRouteInterface {
    from: PlaceInterface | null;
    to: PlaceInterface | null;
    waypoints: (PlaceInterface | null)[];
    routes: (PlaceInterface[])[];
}

export interface PlaceInterface {
    place_id: string;
    name: string;
    address: string;
    location: LocationInterface;
}

export interface LocationInterface {
    lat: number;
    lng: number;
}
