import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { faTrash, faEnvelopeOpen } from '@fortawesome/free-solid-svg-icons';

import cssClasses from './Message.css';
import { getTime, textLength } from '../../../Utility';
import IconList from '../../ReusableComps/IconList/IconList';

const Message = props => {
    const [showIcons, setShowIcons] = useState(false);
    const icons = [
        {name: faEnvelopeOpen, text: 'Mark as read', clicked: () => console.log('clicked')},
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
        props.history.push(`/message?id=${props.id}`)
        // props.history.push(`/message?details=${JSON.stringify(details)}`)
        // props.history.push(`/message?name=${details.name}&service=${details.service}&subject=${details.subject}&message=${details.message}&number=${details.number}&time=${details.time}`);
    };

    return(
        <div className={cssClasses.Message} onClick={onClickHandler} onMouseOver={mouseHoverHandler} onMouseOut={mouseoutHandler}>
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
                {showIcons ? <div className={cssClasses.Icons}>
                                <IconList icons={icons}/>
                            </div> :
                <div className={classes.join(' ')}>
                    <p>{getTime(
                        2020,
                        props.time.month,
                        9,
                        props.time.hour,
                        props.time.minutes
                        )}</p>
                </div>}
            </div>
        </div>
    );
}

export default withRouter(Message);