import axios from 'axios';
import React from 'react';
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
            <div>
                
            </div>
        )
    }
}