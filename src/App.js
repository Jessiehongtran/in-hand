import React from 'react';
import Map from './views/map';
import Place from './components/place';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

export default class App extends React.Component {

  render(){
    return (
      <Router>
        <Switch>
          <Route 
            exact path = "/"
            render = {
              props => {
                return (
                  <Map  {...props} />
                )
              }
            }
          />
          <Route 
            exact path = "/place"
            render = {
              props => {
                return (
                  <Place  {...props} />
                )
              }
            }
          />
        </Switch>
       
      </Router>
      
    )
  }
}


