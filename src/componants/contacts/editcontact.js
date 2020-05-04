import React, { Component } from 'react'
import { Consumer } from '../../context'
import TextInputGroup from '../layouts/TextInputGroup';
import axios from 'axios';

class EditContact extends Component {
    state = {
        name : '',
        email : '',
        phone :'',
         error : {}
    }
    // [
    
    //  ] 
    //get the data and update input filed
    async componentDidMount(){
        const { id } = this.props.match.params;
        const res = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
        const contact = res.data;
        this.setState({
            name : contact.name,
            email : contact.email,
            phone : contact.phone
        })
    }

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


        const updateContact = {
            name,
            email,
            phone
        }

//make request to backend
const { id } = this.props.match.params;
const res = await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`,updateContact);
dispatch({
    type : 'UPDATE_CONTACT',
    payload : res.data
});
        
        //clear state
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
                        <div className="card-header float-left">Edit Contact</div>
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
        
                
        
                                <input type="submit" value="Edit Contact"
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
export default EditContact;
