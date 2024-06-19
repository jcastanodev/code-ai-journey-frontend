import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { logger } from "@utils/logger";
import { MapsStateInterface } from "@interfaces/MapsInterface";

const initialState: MapsStateInterface = {
    currentRoute: {
        from: null,
        to: null,
        waypoints: [],
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
    },
});

export const { setFrom, setTo, setWaypoints } = MapsSlice.actions;

export default MapsSlice.reducer;
