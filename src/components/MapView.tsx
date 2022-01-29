import { useContext, useLayoutEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

import { Loading } from "./";
import { PlacesContext } from "../context";

export const MapView = () => {

  const { userLocation, isLoading } = useContext(PlacesContext)
  const mapDiv = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (isLoading) return

    const map = new mapboxgl.Map({
      container: mapDiv.current!, // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: userLocation, // starting position [lng, lat]
      zoom: 14 // starting zoom
    });

    console.log("🚀 ~ useLayoutEffect ~ map", map)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading])

  if (isLoading) return <Loading />

  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        position: 'fixed',
        top: 0,
        left: 0
      }}
      ref={mapDiv}>
      {userLocation?.join(',')}
    </div>
  )
};
