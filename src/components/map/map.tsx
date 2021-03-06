import * as React from 'react'
import { Map as Leaflet, TileLayer, Marker, Popup} from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-markercluster'
import { withFirebase, IFirebaseContext } from '../FirebaseContext'

const mapPosition = [-21.1419936, 55.5502665]

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
  
  async fetchMarkers() {
    const { firebase } = this.props
    // firebase can not be initialized yet
    if(!firebase) return
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

  componentDidMount() {
    this.fetchMarkers()
  }
  
  componentDidUpdate(prevProps) {
    if(prevProps.firebase == null && this.props.firebase) {
      this.fetchMarkers()
    }
  }

  handleMarkerClick(makerId) {
    if(this.props.setMakerId)
      this.props.setMakerId(makerId)
  }

  render() {
    if (typeof window !== 'undefined') {
      return (
        <Leaflet center={mapPosition} zoom={11} className={"map"} style={{height: `90vh`}}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MarkerClusterGroup>
            {this.state.markers.map(marker => {
              return (
                <Marker 
                  key={marker.id}
                  position={[marker.lat, marker.lng]}
                  onclick={() => this.handleMarkerClick(marker.id)}
                >
                  <Popup>
                    {marker.name}
                  </Popup>
                </Marker>
              )
            })}
          </MarkerClusterGroup>
        </Leaflet>
      )
    }
    return null
  }
}

export default withFirebase(Map)
