import React from 'react';

import cssClasses from './Messages.css';
import Message from './Message/Message';

const Messages = () => {
    return(
        <div className={cssClasses.Messages}>
            <h2>THE MESSAGES WILL SHOW HERE</h2>
            <Message />
        </div>
    );
}

export default Messages;