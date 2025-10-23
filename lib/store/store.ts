import { configureStore } from "@reduxjs/toolkit"
import fleetReducer from "./fleet-slice"

export const makeStore = () => {
  return configureStore({
    reducer: {
      fleet: fleetReducer,
    },
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]
