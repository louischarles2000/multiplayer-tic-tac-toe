import React, { Component } from 'react';

// import cssClasses from './Staionary.css';
import Messages from '../../component/Messages/Messages';
import Spinner from '../../component/Spinner/Spinner';
import Empty from '../../component/Note/empty/empty';
import Notify from '../../component/Note/notify/notify';

class Office extends Component{
    render(){
        let messages;
        if(this.props.orders !== null){
            const arr = this.props.orders.filter(el => el.data.service === 'office');
            // console.log();
            messages = <Messages orders={arr}/>
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
            <div>
                <h2>Office</h2>
                {messages}
            </div>
        );
    }
}

export default Office;
