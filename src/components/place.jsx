import axios from 'axios';
import React from 'react';
import '../style/place.css';
import { API_URL } from '../apiConfig';

export default class Place extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            place: this.props.location.state.place,
            indVisitors: [],
            groupVisitors: [],
            stories: [],
            monthPairs: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        }
    }

    async getIndVisitors(){
        try {
            const res = await axios.get(`${API_URL}/places/${this.state.place.id}/visitors/individual`)
            if ( res.data.length > 0){
                this.setState({ indVisitors: res.data })
            }
        } catch (err){
            console.log(err.message)
        }
    }

    async getGroupVisitors(){
        try {
            const res = await axios.get(`${API_URL}/places/${this.state.place.id}/visitors/group`)
            if ( res.data.length > 0){
                this.setState({ groupVisitors: res.data })
            }
        } catch (err){
            console.log(err.message)
        }
    }

    async getStories(){
        try {
            const res = await axios.get(`${API_URL}/places/${this.state.place.id}/stories`)
            if ( res.data.length > 0){
                this.setState({ stories: res.data })
            }
        } catch (err){
            console.log(err.message)
        }
    }

    turnDateToInt(m, d, y){
        return (y-1970)*365*24*3600 + m*30*24*3600 + d*24*3600 
    }

    turnIntToDate(n){
        const y = Math.round(n/(365*24*3600) + 1970)
        const m = Math.round((n - (y-1970)*365*24*3600)/(30*24*3600))
        const d = Math.round((n- (y-1970)*365*24*3600 - m*30*24*3600)/(24*3600))

        return {
            y: y,
            m: this.state.monthPairs[m-1],
            d: d
        }
    }

    showUser(userId){
        this.props.history.push({
            pathname: 'user',
            state: { userId: userId }
        })
    }

    componentDidMount(){
        this.getIndVisitors()
        this.getGroupVisitors()
        this.getStories()
    }

    render(){

        const { place, indVisitors, groupVisitors, stories } = this.state;

        console.log( place, indVisitors, groupVisitors, stories )

        console.log('props in place', this.props)

        return (
            <div class="place-container">
                <div class="place-banner" >
                    <img src={place.place_banner}/>
                </div>
                <div class="place-info">
                    <div class="wrapper">
                        <div class="quick-info" >
                            <div class="place-icon">
                                {place.place_name[0]}
                            </div>
                            <div class="name-address">
                                <div class="place-name" >
                                    {place.place_name}
                                </div>
                            </div>
                        </div>
                        <div class="place-details">
                            <div class="stories">
                                <textarea class="user-story" placeholder="Mike, how was your hike?" ></textarea>
                                <div class="shared-stories">
                                    {
                                        stories.length > 0
                                        ? stories.map(story => 
                                        <div class="each-story">
                                            <div class="author-avatar" onClick={() => this.showUser(story.author_id)}>
                                                {story.author_first_name[0].toUpperCase()}
                                            </div>
                                            <div class="content">
                                                <div class="author-name" onClick={() => this.showUser(story.author_id)}>
                                                    {story.author_first_name + " " + story.author_last_name}
                                                </div>
                                                <div class="written-date">
                                                    {this.turnIntToDate(story.created_timeInt).m + " " + this.turnIntToDate(story.created_timeInt).d + ", " + this.turnIntToDate(story.created_timeInt).y}
                                                </div>
                                                <div class="story">
                                                    {story.content}
                                                </div>
                                            </div>
                                        </div>)
                                        : null
                                    }
                                </div>
                            </div>
                            <div class="people">
                                <div class="individual-coming">
                                    <div class="title">
                                        Who are coming here
                                    </div>
                                    <div class="hikers">
                                        { indVisitors.length > 0
                                        ? indVisitors.map(visitor => 
                                        <div class="each-hiker" onClick={() => this.showUser(visitor.hiker_id)}>
                                            {visitor.hiker_first_name[0]}
                                        </div>)
                                        : null}
                                    </div>
                                    <a href="" class="more-hikers" >
                                        <div class="more-hikers-text">
                                            +20 more 
                                        </div>
                                    </a>
                                </div>
                                <div class="group-coming">
                                    <div class="title" >
                                        Groups are coming here
                                    </div>
                                    <div class="hike-groups">
                                        {groupVisitors.length > 0
                                        ? groupVisitors.map(group => 
                                            <div class="each-group">
                                                <div class="group-avatar">
                                                    {group.group_name[0]}
                                                </div>
                                                <a href="" class="group-name-link">
                                                    <div class="group-name">
                                                    {group.group_name}
                                                    </div>
                                                </a>
                                            </div>
                                        )
                                        : null}
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}