import { useContext, useState } from "react";
import { MapContext, PlacesContext } from "../context";
import { LoadingPlaces } from ".";
import { Feature } from "../interfaces/places";

export const SearchResults = () => {

  const { places, isLoadingPlaces, userLocation } = useContext(PlacesContext)
  const { map, getRouteBetweenPoints } = useContext(MapContext)

  const [activeId, setActivId] = useState('')

  const onPlaceClicked = (place: Feature) => {
    const [lng, lat] = place.center

    setActivId(place.id)

    map?.flyTo({
      zoom: 14,
      center: [lng, lat]
    })
  }

  const getRoute = (place: Feature) => {
    if(!userLocation) return

    const [lng, lat] = place.center

    getRouteBetweenPoints( userLocation, [lng, lat])
  }

  if (isLoadingPlaces)
    return <LoadingPlaces />

  if (!places.length)
    return null

  return (
    <ul className="list-group mt-3">
      {places.map(place => (
        <li
          key={place.id}
          onClick={() => onPlaceClicked(place)}
          className={`list-group-item list-group-item-action pointer ${ activeId === place.id ? 'active' : '' }`}
        >
          <h6>{place.text_es}</h6>
          <p
            style={{ fontSize: 12 }}
            >
            {place.place_name_es}
          </p>

          <button
            onClick={() => getRoute(place)}
            className={`btn btn-sm btn-outline-${ activeId === place.id ? 'light' : 'primary'}`}>
            Direcciones
          </button>
        </li>
      ))}
    </ul>
  )
};
