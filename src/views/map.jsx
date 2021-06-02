import React from 'react';
import axios from 'axios';
import Place from '../components/place';
import { API_URL } from '../apiConfig';
import '../style/map.css'
import { GoogleMap, InfoWindow, LoadScript, Marker } from '@react-google-maps/api'

const mapStyles = {
    height: "100vh",
    width: "100%"
}

const defaultCenter = {
    lat: 37.5483,
    lng: -121.9886
}

export default class Map extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            places: [],
            selectedPlace: {}
        }
    }

    async componentDidMount(){
        try {
            const res = await axios.get(`${API_URL}/places`)
            if (res.data.length > 0){
                let places = res.data
                if(places.length > 0){
                    for (let i = 0; i < places.length; i++){
                        if (places[i].people_come <= 1000){
                            places[i].bgColor = `rgba(255, 0, 0, ${places[i].people_come/10})`
                        } else {
                            places[i].bgColor = `rgba(255, 0, 0, 1)`
                        }
                    }
                }
                this.setState({ places: places })
                console.log(res.data)
            }
        } catch (err){
            console.log(err.message)
        }

    }

    onSelect(place, location){
        place.location = location
        this.setState({ selectedPlace: place })
    }

    render(){

        const { places } = this.state;

      return (
        <LoadScript googleMapsApiKey='AIzaSyCyu033xWjFyUNAdbloX9ZQUm4LwpvnGls'>
            <GoogleMap
                mapContainerStyle={mapStyles}
                zoom={7}
                center={defaultCenter} 
            >
                {
                    places && places.length > 0
                    ? places.map(place => {
                        let location = {
                            lat: place.place_latitude,
                            lng: place.place_longitude
                        }
                        let icon = {
                            path: 'm 12,2.4000002 c -2.7802903,0 -5.9650002,1.5099999 -5.9650002,5.8299998 0,1.74375 1.1549213,3.264465 2.3551945,4.025812 1.2002732,0.761348 2.4458987,0.763328 2.6273057,2.474813 L 12,24 12.9825,14.68 c 0.179732,-1.704939 1.425357,-1.665423 2.626049,-2.424188 C 16.809241,11.497047 17.965,9.94 17.965,8.23 17.965,3.9100001 14.78029,2.4000002 12,2.4000002 Z',
                            fillColor: place.bgColor,
                            fillOpacity: 1.0,
                            strokeColor: 'black',
                            strokeWeight: 1,
                            scale: 2,
                            anchor: window.google ? new window.google.maps.Point(12,24) : null
                        }
                        return (
                            <Marker 
                                key={place.id} 
                                position={location} 
                                icon={icon}
                                onClick={() => this.onSelect(place, location)}
                            />
                        )
                    })
                    : null
                }
                {   
                    this.state.selectedPlace.location &&
                    (
                        <InfoWindow
                            pixelOffset= {new window.google.maps.Size(0, 60)}
                            position= {this.state.selectedPlace.location}
                            clickable = {true}
                            onCloseClick = {() => this.setState({ selectedPlace: {} })}
                        >
                            <div>
                                <p>{this.state.selectedPlace.place_name}</p>
                                <b onClick={() => 
                                    this.props.history.push({ 
                                        pathname: '/place',
                                        state: { place: this.state.selectedPlace }
                                })}>Learn more</b>
                            </div>
                        </InfoWindow>
                    )
                }
            </GoogleMap>
        </LoadScript>
      )
    }
  }
  