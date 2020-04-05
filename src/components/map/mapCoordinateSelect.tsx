import * as React from 'react'
import { Map as Leaflet, TileLayer, Marker, Popup} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'react-leaflet-markercluster/dist/styles.min.css'

const mapPosition = [-21.1419936, 55.5502665]

interface IMap {
  onCoordinateChange: Function,
}


const MapCoordinateSelect = (props: IMap) => {
  const [coordinates, setCoordinates] = React.useState(null)

  const handleMapClick = (e) => {
    setCoordinates(e.latlng)
    props.onCoordinateChange(e.latlng)
  }

  const handleMarkerMove = (e) => {
    const newCoordinates = e.target.getLatLng()
    setCoordinates(newCoordinates);
    props.onCoordinateChange(newCoordinates)
  }

  if (typeof window !== 'undefined') {
    return (
      <Leaflet 
        center={mapPosition}
        zoom={10}
        className={"map"}
        style={{height: `300px`}}
        onClick={handleMapClick}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {coordinates && 
          <Marker
            position={[coordinates.lat, coordinates.lng]}
            draggable={true}
            onDragend={handleMarkerMove}
          />
        }
      </Leaflet>
    )
  }
  return null
}

export default MapCoordinateSelect
