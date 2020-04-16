import React from 'react';
import { withRouter } from 'react-router-dom';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import {  } from '@fortawesome/free-solid-svg-icons'

import cssClasses from './MessageBody.css';

const MessageBody = () => {

    const test = {
            name: 'Louis Charles Guma',
            time: '11:45 AM (3 hours ago)',
            email: 'louischarles.2000@gmail.com',
            message: `Un-forgiveness is downright dangerous. It will make your spirit feeble and your prayers ineffective. It will pull the plug on your faith so completely that you won't have enough power to move the molehills in your life - much less the mountains. The Bible says it grows into a festering root of bitterness that doesn't just harm us, but defiles anyone who keeps company with us. Why on earth would we willingly want to hold onto our disappointment and offense`,
            service: 'events',
            subject: 'Wedding'
        }

    return(
        <div className={cssClasses.MessageBody}>
            <div className={cssClasses.head}>
                <p>{test.name} - {test.service} : {test.subject}</p>
                <p></p> 
            </div>

        </div>
    );
};
export default withRouter(MessageBody);