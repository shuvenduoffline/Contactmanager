import React, {
    Component
} from 'react';
import axios from 'axios';

import { Consumer } from '../../context';
import {Link} from 'react-router-dom';


class Contact extends Component {
    state = {
        showContactInfo : false
    };
    onShowClick = e =>{
        this.setState({showContactInfo : ! this.state.showContactInfo});
    }

    onDeleteClick = async (id, dispatch) => {

        // delete contact from users
        try{
     await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
     dispatch({ type : 'DELETE_CONTACT',
     payload : id})
        }catch(e){

            dispatch({ type : 'DELETE_CONTACT',
            payload : id})
        }

     
    }
    render() {
        const {id, name, email , phone} = this.props.contact;
        const {showContactInfo} = this.state;
        return ( 

            <Consumer>
                {value => {

                    const { dispatch } = value;
                    return (
                        <div className="card card-body mb-3">
                        <h4 className="text-left">{name} <i onClick={this.onShowClick} className="fas fa-sort-down" style={{ cursor : 'pointer'}}></i>
                        <i className="fas fa-times" style={{ cursor : 'pointer' , float: 'right' , color: 'red'}} 
                        onClick={this.onDeleteClick.bind(this, id, dispatch)}></i>
                        <Link to={`contact/edit/${id}`}>
                            <i 
                            className="fas fa-pencil-alt"
                            style={{cursor : 'pointer',
                            float : 'right',
                           color:'black',
                           marginRight: '1rem' }}></i>
                        </Link>
                        </h4> 
                       { showContactInfo ? ( <ul className="list-group">
                        <li className="list-group-item text-left"> Email : {email} </li> 
                        <li className="list-group-item text-left"> Phone : {phone} </li> 
                        </ul> ):null
                       }
                    </div>
                    )
                }}

            </Consumer>
       
        )
    }
}



export default Contact;