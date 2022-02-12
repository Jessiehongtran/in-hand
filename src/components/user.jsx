import axios from 'axios';
import React from 'react';
import '../style/user.css';
import { API_URL } from '../apiConfig';

export default class User extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            user: {}
        }
    }

    async postConnection(friendIds){
        try {
            const response = await axios.post(`${API_URL}/friends`, friendIds)
            console.log('res in posting friend connection', response)
        } catch (err){
            console.log(err.message)
        }
    }

    addFriend(){
        //if cur userId is different this user id then collect both of them and post connection 
        //this is to prevent they connect with themselves :) which is most likely not happening but just in case
        //where this cur userId stored? local storage?
        
    }

    async componentDidMount(){
        const userId = this.props.location.state.userId
        try {
            const user = await axios.get(`${API_URL}/users/${userId}`)
            this.setState({user: user.data})
            console.log('user', user.data)
        } catch (err){
            console.log(err.message)
        }
    }

    render(){
        const { user } = this.state;

        return (
            <div class="user-container">
                <div class="user-wrapper">
                    <div class="identity">
                        <div class="avatar">
                            {user.first_name[0]}
                        </div>
                        <div class="name-address">
                            <div class="name">
                                {user.first_name}
                            </div>
                            <div class="address">
                                San Jose, CA
                            </div>
                        </div>
                    </div>
                    <div class="add-friend">
                        <button class="add-friend-btn">Add friend</button>
                    </div>
                    <div class="my-stories">
                        <div class="each-story">
                            <div class="date">
                                <p style={{margin: 0}}>Jan</p>
                                <p style={{margin: 0}}>2</p>
                            </div>
                            <div class="user-details">
                                <div class="place">
                                    At Yosemite National Park
                                </div>
                                <div class="text" >
                                    Donec eget ex magna. Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque venenatis dolor imperdiet dolor mattis sagittis magna etiam. Donec eget ex magna. Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque venenatis dolor imperdiet dolor mattis sagittis magna etiam.
                                </div>
                                <div class="buttons">
                                    <div class="like">
                                        <div class="icon">
                                            <i class="far fa-heart"></i>
                                        </div>
                                        <div class="number" >
                                            120
                                        </div>
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