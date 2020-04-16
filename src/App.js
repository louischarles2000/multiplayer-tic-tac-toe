import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import classes from './App.css';
import axios from 'axios'
import Layout from './HOC/Layout/Layout';
import Home from './container/Home/Home';
import Events from './container/Events/Events';
import Stationary from './container/Stationary/Stationary';
import Building from './container/Building/Building';
import GenSupply from './container/GenSupply/GenSupply';
import Printing from './container/Printing/Printing';
import Office from './container/Office/Office';
import Textile from './container/Textile/Textile';
import MessageBody from './component/MessageBody/MessageBody';

class App extends Component {
  state = {
    orders: null,
    loading: false, 
    error: null
}
componentDidMount(){
    this.setState({loading: true});
    const orderArray = [];
    axios.get('https://wellspring-baa0b.firebaseio.com/orders.json')
    .then(response => {
        for(let key in response.data){
            orderArray.push({id: key, data: response.data[key]});
        }
        this.setState({loading: false, orders: orderArray})
    }).catch(err => this.setState({loading: false, error: err}));
}

  render() {
    return (
      <div className={classes.App}>
        <BrowserRouter>
            <Layout>
              <Route path="/" exact render={() => <Home orders={this.state.orders} loading={this.state.loading} error={this.state.error}/>}/>
              <Route path="/events" render={() => <Events orders={this.state.orders} loading={this.state.loading} error={this.state.error}/>}/>
              <Route path="/stationary" render={() => <Stationary orders={this.state.orders} loading={this.state.loading} error={this.state.error}/>}/>
              <Route path="/building" render={() => <Building orders={this.state.orders} loading={this.state.loading} error={this.state.error}/>}/>
              <Route path="/gen-supply" render={() => <GenSupply orders={this.state.orders} loading={this.state.loading} error={this.state.error}/>}/>
              <Route path="/printing" render={() => <Printing orders={this.state.orders} loading={this.state.loading} error={this.state.error}/>}/>
              <Route path="/office" render={() => <Office orders={this.state.orders} loading={this.state.loading} error={this.state.error}/>}/>
              <Route path="/textile" render={() => <Textile orders={this.state.orders} loading={this.state.loading} error={this.state.error}/>}/>
              <Route path="/message" component={MessageBody} />
            </Layout>
        </BrowserRouter>
      </div>

    );
  }
}

export default App;
