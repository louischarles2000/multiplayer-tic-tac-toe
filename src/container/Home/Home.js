import React, { Component } from 'react';
import axios from 'axios'
import cssClasses from './Home.css';
import Messages from '../../component/Messages/Messages';
import Spinner from '../../component/Spinner/Spinner';

class Home extends Component{
    state = {
        orders: null,
        loading: false, 
        error: null
    }
    componentDidMount(){
        this.setState({loading: true})
        const orderArray = [];
        axios.get('https://wellspring-baa0b.firebaseio.com/orders.json')
        .then(response => {
            for(let key in response.data){
                orderArray.push({id: key, data: response.data[key]});
            }
            this.setState({loading: false, orders: orderArray})
        }).catch(err => this.setState({loading: false, error: err}));
        // console.log(orderArray);
    }

    render(){
        let messages;
        if(this.state.orders){
            messages = <Messages orders={this.state.orders}/>
        }
        if(this.state.loading){
            messages = <Spinner />;
        }
        if(this.state.error){
            messages = <h4>{this.state.error.message}</h4>
        }
        return(
            <div className={cssClasses.Home}>         
                <h2>Home:</h2>
                {messages}
            </div>
        );
    }
}

export default Home;