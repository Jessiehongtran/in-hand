import axios from 'axios';
import React from 'react';
import '../style/user.css';
import { API_URL } from '../apiConfig';

export default class User extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    async componentDidMount(){
        try {
            const user = await axios.get()
        } catch (err){
            console.log(err.message)
        }
    }

    render(){
        return (
            <div class="user-container">
                <div class="user-wrapper">
                    <div class="identity">
                        <div class="avatar">
                            H
                        </div>
                        <div class="name-address">
                            <div class="name">
                                Hong Tran
                            </div>
                            <div class="address">
                                San Jose, CA
                            </div>
                        </div>
                    </div>
                    <div class="my-stories">
                        <div class="each-story">
                            <div class="date">
                                <p style={{margin: 0}}>Jan</p>
                                <p style={{margin: 0}}>2</p>
                            </div>
                        </div>
                        <div class="details">
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
        )
    }
}