export const getUserLocation = (): Promise<[number, number]> =>
  new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        resolve([coords.longitude, coords.latitude])
      },
      error => {
        alert('No se pudo obtener la geolocalizacion')
        console.error(error)
        reject(error)
      }
    )
  })