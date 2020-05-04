import React from 'react';
import { HashRouter as Router, Route, Switch} from 'react-router-dom';

import './App.css';

import { Provider } from './context';
import EditContacts from './componants/contacts/editcontact';

import Contacts from './componants/contacts/Contacts';
import Header from './componants/layouts/Header';
import AddContact from './componants/contacts/AddContact';
import About from './componants/pages/about';

import 'bootstrap/dist/css/bootstrap.min.css';
import NotFound from './componants/pages/NotFound';

function App() {
  return ( 
  <Provider>
    <Router>
  <div className = "App">
     <Header banding="Contact Manager"/>
     <div className="container">
      <Switch>
        <Route exact path="/" component={Contacts}/>
        <Route exact path="/about" component={About}/>
        <Route exact path="/contact/add" component={AddContact}/>
        <Route exact path="/contact/edit/:id" component={EditContacts}/>
        <Route component={NotFound}/>
      </Switch>
    </div>
    </div>
    </Router>
    </Provider>
  );
}

export default App;