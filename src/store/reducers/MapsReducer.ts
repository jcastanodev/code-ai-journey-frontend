import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { logger } from "@utils/logger";
import { MapsStateInterface } from "@interfaces/MapsInterface";

const initialState: MapsStateInterface = {
    currentRoute: {
        from: null,
        to: null,
        waypoints: [],
        routes: [],
    },
};

export const MapsSlice = createSlice({
    name: "Maps",
    initialState,
    reducers: {
        setFrom: (state, action: PayloadAction<google.maps.places.PlaceResult | null>) => {
            logger.debug("setFrom: ", action.payload);
            state.currentRoute!.from = action.payload;
        },
        setTo: (state, action: PayloadAction<google.maps.places.PlaceResult | null>) => {
            logger.debug("setTo: ", action.payload);
            state.currentRoute!.to = action.payload;
        },
        setWaypoints: (state, action: PayloadAction<(google.maps.places.PlaceResult | null)[]>) => {
            logger.debug("setWaypoints: ", action.payload);
            state.currentRoute!.waypoints = action.payload;
        },
        setMapRoutes: (state, action: PayloadAction<(google.maps.places.PlaceResult[])[]>) => {
            logger.debug("setMapRoutes: ", action.payload);
            state.currentRoute!.routes = action.payload;
        },
    },
});

export const { setFrom, setTo, setWaypoints, setMapRoutes } = MapsSlice.actions;

export default MapsSlice.reducer;
