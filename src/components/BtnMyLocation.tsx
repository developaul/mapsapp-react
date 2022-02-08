import { useContext } from "react";
import { MapContext,PlacesContext } from "../context";

export const BtnMyLocation = () => {

  const { isMapReady, map } = useContext(MapContext)
  const { userLocation } = useContext(PlacesContext)

  const _handleClick = () => {
    if(!isMapReady) throw new Error('Mapa no esta listo')
    if(!userLocation) throw new Error('No hay ubicacion de usuario')

    map?.flyTo({
      zoom: 14,
      center: userLocation
    })

  }

  return (
    <button
      onClick={_handleClick}
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 999
      }}
      className="btn btn-primary">
      Mi Ubicacion
    </button>
  )
};
