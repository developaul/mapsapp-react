import { useEffect, useReducer } from 'react';

import { PlacesContext } from './PlacesContext';
import { placesReducer } from './placesReducer';

import { Feature, PlacesResponse } from '../../interfaces/places';
import { getUserLocation } from '../../helpers';
import { searchApi } from '../../apis';


export interface PlacesState {
  isLoading: boolean
  userLocation?: [number, number],
  isLoadingPlaces: boolean,
  places: Feature[]
}

interface PlacesProviderProps {
  children: JSX.Element | JSX.Element[]
}

const INITIAL_STATE: PlacesState = {
  isLoading: true,
  userLocation: undefined,
  isLoadingPlaces: false,
  places: []
}

export const PlacesProvider = ({ children }: PlacesProviderProps) => {

  const [state, dispatch] = useReducer(placesReducer, INITIAL_STATE)

  useEffect(() => {
    getUserLocation()
      .then(lngLat => dispatch({ type: 'setUserLocation', payload: lngLat }))
  }, [])

  const searchPlacesByTerm = async (query: string): Promise<Feature[]> => {
    if (query.length === 0) {
      dispatch({ type: 'setPlaces', payload: [] })

      return []
    }

    if (!state.userLocation) throw new Error('No hay ubicacion del usuario')

    dispatch({ type: 'setLoadingPlaces' })

    const resp = await searchApi.get<PlacesResponse>(`/${query}.json`, {
      params: {
        proximity: state.userLocation.join(',')
      }
    })

    dispatch({ type: 'setPlaces', payload: resp.data.features })

    return resp.data.features
  }

  return (
    <PlacesContext.Provider
      value={{
        ...state,
        searchPlacesByTerm
      }}
    >
      {children}
    </PlacesContext.Provider>
  )
};
