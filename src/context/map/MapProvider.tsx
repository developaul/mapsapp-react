import { useReducer } from "react";
import { Map } from "mapbox-gl";
import { MapContext } from "./MapContext";
import { mapReducer } from "./mapReducer";

export interface MapState {
  isMapReady: boolean
  map?: Map
}

export interface MapProviderProps {
  children: JSX.Element | JSX.Element[]
}

const INITIAL_STATE: MapState = {
  isMapReady: false,
  map: undefined
}

export const MapProvider = ({ children }: MapProviderProps) => {

  const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE)



  return (
    <MapContext.Provider
      value={{
        ...state
      }}
    >
      {children}
    </MapContext.Provider>
  )
};
