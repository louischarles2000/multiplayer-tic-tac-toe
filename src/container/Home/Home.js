import React, { Component } from 'react';
import axios from 'axios'
import cssClasses from './Home.css';
import Messages from '../../component/Messages/Messages';

class Home extends Component{
    componentDidMount(){
        axios.get('https://wellspring-baa0b.firebaseio.com/orders.json')
        .then(response => {
            console.log(response);
        })
    }

    render(){
        return(
            <div className={cssClasses.Home}>         
                <h1>WELLSPRINGS ADMIN PAGE</h1>
                <h2>New:</h2>
                <Messages />
            </div>
        );
    }
}

export default Home;