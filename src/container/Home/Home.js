import React, { Component } from 'react';
import cssClasses from './Home.css';
import Messages from '../../component/Messages/Messages';
import Spinner from '../../component/Spinner/Spinner';
import Empty from '../../component/ReusableComps/Note/empty/empty';
import Notify from '../../component/ReusableComps/Note/notify/notify';

class Home extends Component{

    render(){
        let messages;
        if(this.props.orders){
            messages = <Messages orders={this.props.orders}/>
            if(this.props.orders.length === 0){
                messages = <Empty />;
            }
        }
        if(this.props.loading){
            messages = <Spinner />;
        }
        if(this.props.error){
            messages = <Notify type="danger">{this.props.error.message}</Notify>
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