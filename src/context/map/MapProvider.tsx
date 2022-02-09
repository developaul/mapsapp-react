import { useContext, useEffect, useReducer } from "react";
import { Map, Marker, Popup } from "mapbox-gl";
import { MapContext } from "./MapContext";
import { mapReducer } from "./mapReducer";
import { PlacesContext } from '../';

export interface MapState {
  isMapReady: boolean
  map?: Map,
  markers: Marker[]
}

export interface MapProviderProps {
  children: JSX.Element | JSX.Element[]
}

const INITIAL_STATE: MapState = {
  isMapReady: false,
  map: undefined,
  markers: []
}

export const MapProvider = ({ children }: MapProviderProps) => {

  const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE)

  const { places } = useContext(PlacesContext)

  useEffect(() => {
    state.markers.forEach(marker => marker.remove())

    const newMarkers: Marker[] = []

    for (const place of places) {
      const [lng, lat] = place.center

      const poppup = new Popup()
        .setHTML(`
          <h4>${place.text_es}</h4>
          <p>${place.place_name_es}</p>
        `)

      const newMarker = new Marker()
        .setPopup(poppup)
        .setLngLat([lng, lat])
        .addTo(state.map!)

      newMarkers.push(newMarker)
    }

    dispatch({ type: 'setMarkers', payload: newMarkers })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [places])


  const setMap = (map: Map) => {

    const myLocationPopup = new Popup()
      .setHTML(`
        <h4>Aqui estoy</h4>
        <p>En algun lugar del mundo</p>
      `)

    new Marker({
      color: '#61DAFB'
    })
      .setLngLat(map.getCenter())
      .setPopup(myLocationPopup)
      .addTo(map)

    dispatch({ type: 'setMap', payload: map })
  }

  return (
    <MapContext.Provider
      value={{
        ...state,
        setMap
      }}
    >
      {children}
    </MapContext.Provider>
  )
};
