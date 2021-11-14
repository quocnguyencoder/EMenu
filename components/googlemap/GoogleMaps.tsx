import GoogleMapReact from 'google-map-react'

interface Props {
  formatted_address: string
  lat: number
  lng: number
}

export default function GoogleMaps({ lat, lng, formatted_address }: Props) {
  const renderMarkers = (map: any, maps: any) =>
    new maps.Marker({
      position: { lat: lat, lng: lng },
      map,
      title: `${formatted_address}`,
    })

  return (
    <div style={{ height: '75vh', width: '95%' }}>
      <GoogleMapReact
        // bootstrapURLKeys={{ key: `${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}` }}
        defaultCenter={{ lat: lat, lng: lng }}
        defaultZoom={16}
        yesIWantToUseGoogleMapApiInternals={true}
        onGoogleApiLoaded={({ map, maps }: any) => renderMarkers(map, maps)}
      ></GoogleMapReact>
    </div>
  )
}
