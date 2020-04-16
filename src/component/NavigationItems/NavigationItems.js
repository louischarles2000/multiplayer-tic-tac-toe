import React from 'react';

import cssClasses from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';
const navigationItems = props => {
    let classes = [cssClasses.NavigationItems, cssClasses.shut];

    if(props.show){
        classes = [cssClasses.NavigationItems, cssClasses.Open];
    }

    const navigationItems = [
        {link: '/', name: 'home'},
        {link: '/events', name: 'events'},
        {link: '/stationary', name: 'stationary'},
        {link: '/gen-supply', name: 'gen supply'},
        {link: '/building', name: 'building'},
        {link: '/printing', name: 'printing'},
        {link: '/office', name: 'office'},
        {link: '/textile', name: 'textile'},
        {link: '/contacts', name: 'customers'},
    ]

    
    return(
        <nav className={classes.join(' ')}>
            {navigationItems.map(item => (
                <NavigationItem key={item.link} link={item.link} clicked={props.clicked}>{item.name}</NavigationItem>
            ))}
        </nav>
    );
}
export default navigationItems;