import * as React from 'react'
import { Map as Leaflet, TileLayer, Marker, Popup} from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-markercluster'
import { Icon } from 'leaflet'
import { withFirebase, IFirebaseContext } from '../FirebaseContext'
import 'leaflet/dist/leaflet.css'
import 'react-leaflet-markercluster/dist/styles.min.css'

const mapPosition = [-21.1419936, 55.5502665]

const icon = new Icon({
  iconUrl: "/map_icon.svg",
  iconSize: [24, 32]
});

interface IMap extends IFirebaseContext {
  setMakerId?: Function,
}

interface IMarker {
  id: string,
  lat: Number,
  lng: Number,
  name: String
}

interface IState {
  markers: Array<IMarker>
}

class Map extends React.Component<IMap, IState> {
  constructor(props: IMap) {
    super(props)
    this.handleMarkerClick = this.handleMarkerClick.bind(this)
    this.state = {
      markers: []
    }
  }
  
  async componentDidMount() {
    const { firebase } = this.props
    const markers = []
    const snapshot = await firebase
      .firestore()
      .collection('makers')
      .get()
    snapshot.forEach(doc => {
      markers.push({id: doc.id, ...doc.data()})
    })
    this.setState({
      markers
    })
  }
  
  handleMarkerClick(makerId) {
    if(this.props.setMakerId)
      this.props.setMakerId(makerId)
  }
  
  render() {
    return <Leaflet center={mapPosition} zoom={11} className={"map"} style={{height: `90vh`}}>
    <TileLayer
    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <MarkerClusterGroup>
    {this.state.markers.map(marker => {
      return <Marker 
      key={marker.id}
      position={[marker.lat, marker.lng]}
      icon={icon}
      onclick={this.handleMarkerClick.bind(null, marker.id)}
      >
      <Popup>
      {marker.name}
      </Popup>
      </Marker>
    })}
    </MarkerClusterGroup>
    </Leaflet>
  }
}

export default withFirebase(Map)
