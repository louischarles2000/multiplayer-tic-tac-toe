import React, { useState } from 'react';
import cssClasses from './Home.css';
import Messages from '../../component/Messages/Messages';
import Spinner from '../../component/Spinner/Spinner';
import Empty from '../../component/ReusableComps/Note/empty/empty';
import Notify from '../../component/ReusableComps/Note/notify/notify';
// import { getNumbers } from '.././../Utility';

const Home = props => {
    // const [numbers, setNumbers] = useState();
    let messages;
    if(props.orders){
        // const {overAllNumber, numberOfRead, numberOfUnread} = getNumbers(props.orders);
        // const nums = {
        //     ...getNumbers(props.orders)
        // };
        
        // console.log(nums)
        // setNumbers(getNumbers(props.orders));
        messages = <Messages orders={props.orders}/>
        if(props.orders.length === 0){
            messages = <Empty />;
        }
    }
    if(props.loading){
        messages = <Spinner />;
    }
    if(props.error){
        messages = <Notify type="danger">{props.error.message}</Notify>
    }

    return(
        <div className={cssClasses.Home}>         
            <h2>Home:</h2>
            {messages}
        </div>
    );
};


export default Home;