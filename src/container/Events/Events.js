import React, { Component } from 'react';
import cssClasses from './Events.css';
import Messages from '../../component/Messages/Messages';
import Spinner from '../../component/Spinner/Spinner';
import Empty from '../../component/ReusableComps/Note/empty/empty';
import Notify from '../../component/ReusableComps/Note/notify/notify';

class Events extends Component {
    render(){
        let classes = [cssClasses.Events, '']
        let messages;
        if(this.props.orders !== null){
            const arr = this.props.orders.filter(el => el.data.service === 'events');
            messages = <Messages orders={arr}/>
            // console.log();
            if(arr.length === 0){
                messages = <Empty />;
            }
        }
        if(this.props.loading){
            messages = <Spinner />;
        }
        if(this.props.error){
            messages = <Notify type="danger">{this.props.error.message}</Notify>
        }
        return (
            <div className={classes.join(' ')}>
                <h2>Events</h2>
                
                {messages}
            </div>
        );
    }
};
export default Events;