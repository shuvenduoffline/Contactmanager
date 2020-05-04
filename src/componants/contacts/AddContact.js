import React, { Component } from 'react'
import { Consumer } from '../../context'
import TextInputGroup from '../layouts/TextInputGroup';
import axios from 'axios';

class AddContact extends Component {
    state = {
        name : '',
        email : '',
        phone :'',
         error : {}
    }
    // [
    
    //  ] 
    onChange = e => this.setState({ [e.target.name] : e.target.value });
    onSubmit = async (dispatch,e) => {
        e.preventDefault();
        const { name , email, phone} = this.state;


        // Check for Erros
        if(name === ''){
            this.setState({
                error : {
                    name : "Name is required!!"
                }
            })

            return;
        }

        if(email === ''){
            this.setState({
                error : {
                    email : "Email is required!!"
                }
            })
            return;
        }

        if(phone === ''){
            this.setState({
                error : {
                    phone : "Phone Number is required!!"
                }
            })
            return;
        }


        const newContact = {
            name,
            email,
            phone
        }

        //add contact...
       const res = await axios.post('https://jsonplaceholder.typicode.com/users', newContact);
    
        dispatch({type : 'ADD_CONTACT' , payload : res.data});

        
        this.setState({
            name : '',
            email:'',
            phone:'',
            error : {}
        });

        //Redirect
        this.props.history.push('/');
    }

    render() {
        const {name , email , phone, error} = this.state;
        return (
            <Consumer>
            {
                value => {
                    const { dispatch } = value; 

                    return (
                        <div className="card mb-3">
                        <div className="card-header float-left">Add Contact</div>
                        <div className="card-body">
                            <form onSubmit={this.onSubmit.bind(this,dispatch)}>
                                <TextInputGroup
                                label="Name"
                                name="name"
                                placeholder="Enter name"
                                value={name}
                                onChange = {this.onChange}
                                errors = {error.name}
                                />


                    <TextInputGroup
                                label="Email"
                                name="email"
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange = {this.onChange}
                                errors = {error.email}
                                />

                    <TextInputGroup
                                label="Phone"
                                name="phone"
                                placeholder="Enter phone number"
                                value={phone}
                                onChange = {this.onChange}
                                errors = {error.phone}
                                />
        
                
        
                                <input type="submit" value="Add Contact"
                                className="btn btn-light btn-block"
                                />
                            </form>
                        </div>
                    </div>
                    )
                }
            }    
            </Consumer>
        )
    }
}
export default AddContact;
