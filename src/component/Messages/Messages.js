import React from 'react';

import cssClasses from './Messages.css';
import Message from './Message/Message';

const Messages = props => {
    console.log(props.orders);

    let messages;
    let classes = [cssClasses.Messages, cssClasses.Remove]
    if(props.orders.length >= 10){
        classes = [cssClasses.Messages, '']
    }
    if(props.orders !== null){
        messages = props.orders.reverse().map(order => (
                <Message 
                    key={order.id}
                    name={order.data.name}
                    service={order.data.service}
                    subject={order.data.subject}
                    message={order.data.message}
                    time={order.data.date}
                    number={order.data.phone}
                    id={order.id}/>
        ));
    }else{
        messages = <p>THERE ARE NO MESSAGES YET</p>
    }
    return(
        <div className={classes.join(' ')}>
            {messages}
        </div>
    );
}

export default Messages;   
    // const dataObject = [
    //     {
    //         name: 'Louis',
    //         message: 'testing something again',
    //         service: 'events',
    //         subject: 'Wedding'
    //     },
    //     {
    //         name: 'Onen',
    //         message: 'testing something again',
    //         service: 'building',
    //         subject: 'bricks'
    //     },
    //     {
    //         name: 'Luka',
    //         message: 'testing something again',
    //         service: ' general supply',
    //         subject: 'jerry cans'
    //     },
    //     {
    //         name: 'Chris',
    //         message: 'testing something again',
    //         service: 'events',
    //         subject: 'birthday'
    //     },
    //     {
    //         name: 'Lindri',
    //         message: 'testing something again',
    //         service: 'office',
    //         subject: 'tables'
    //     }
    // ]