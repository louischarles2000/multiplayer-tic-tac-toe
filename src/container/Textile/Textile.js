import React, { Component } from 'react';

// import cssClasses from './Staionary.css';
import Messages from '../../component/Messages/Messages';
import Spinner from '../../component/Spinner/Spinner';
import Empty from '../../component/ReusableComps/Note/empty/empty';
import Notify from '../../component/ReusableComps/Note/notify/notify';

class Textile extends Component{
    render(){
        let messages;
        if(this.props.orders !== null){
            const arr = this.props.orders.filter(el => el.data.service === 'textile');
            // console.log(this.props.orders + 'orders');
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
                <h2>Textile</h2>
                {messages}
            </div>
        );
    }
}

export default Textile;
