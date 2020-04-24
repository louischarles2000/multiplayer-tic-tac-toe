import React, { useState } from 'react';
// import axios from 'axios';
import * as firebase from 'firebase';
import { withRouter } from 'react-router-dom';
import { faTrash, faEnvelopeOpen } from '@fortawesome/free-solid-svg-icons';

import cssClasses from './Message.css';
import { getTime, textLength, readMessage, unreadMessage } from '../../../Utility';
import IconList from '../../ReusableComps/IconList/IconList';

const Message = props => {
    console.log(props.read.read);
    let readStatus = [cssClasses.container, cssClasses.unread]
    if(props.read.read){
        readStatus = [cssClasses.container, ''];
    }
    const [showIcons, setShowIcons] = useState(false);
    const icons = [
        {name: faEnvelopeOpen, text: 'Mark as read', clicked: unreadMessage(props.id)},
        {name: faTrash, text: 'Delete', clicked: () => console.log('clicked')}
    ];
    let classes = [cssClasses.time, cssClasses.show];
    const mouseHoverHandler = () => {
        setShowIcons(true);
        classes = [cssClasses.time, cssClasses.remove];
    }
    const mouseoutHandler = () => {
        setShowIcons(false);
        classes = [cssClasses.time, cssClasses.show];
    }
      const onClickHandler = () => {
        const fb = firebase.database().ref();
        fb.child(`orders/${props.id}/read/`).update({read: true});
        // readMessage(props.id);
        props.history.push(`/message?id=${props.id}`);
    }
    return(
        <div className={cssClasses.Message} onClick={onClickHandler} onMouseOver={mouseHoverHandler} onMouseOut={mouseoutHandler}>
            <div className={readStatus.join(' ')}>
                <div className={cssClasses.heading}>
                    <p>{props.name}</p>
                </div>
                <div className={cssClasses.group}>
                    <div className={cssClasses.service}>
                        <p>{props.service} : {props.subject}</p>
                    </div>
                    <div className={cssClasses.message}>
                        <p>- {textLength(props.message)}</p>
                    </div>
                </div>
                {showIcons ? <div className={cssClasses.Icons}>
                                <IconList icons={icons}/>
                            </div> :
                <div className={classes.join(' ')}>
                    <p>{getTime(
                        props.time.year ,
                        props.time.month,
                        props.time.date,
                        props.time.hour,
                        props.time.minutes
                        )}</p>
                </div>}
            </div>
        </div>
    );
}

export default withRouter(Message);