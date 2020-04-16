import React from 'react';

import cssClasses from './Message.css';
import { getTime, textLength } from '../../../Utility';

const Message = props => (
    <div className={cssClasses.Message}>
        <div className={cssClasses.container}>
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
            <div className={cssClasses.time}>
                <p>{getTime(
                    2020,
                    props.time.month,
                    9,
                    props.time.hour,
                    props.time.minutes
                    )}</p>
            </div>
        </div>
    </div>
);

export default Message;