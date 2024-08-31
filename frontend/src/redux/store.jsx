import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import buildingReducer from './buildingSlice';
import billReducer from './billSlice'

export const store = configureStore({
    reducer: {
        users: userReducer,
        buildings: buildingReducer,
        bills: billReducer
    },
});

// export default store;
