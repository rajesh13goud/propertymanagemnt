
import React from 'react';
import { format } from 'path';

class Form extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            propertyname: '',
            ownername: '',
            mobile: '',
            price:'',
            address: '',
            landetails: ''
        }
    }

        onNameChange = (event) => {
            this.setState({ownername: event.target.value})
        }
        onEmailChange = (event) => {
            this.setState({email: event.target.value})
        }
        onPropertyChange = (event) => {
            this.setState({propertyname: event.target.value})
        }
        onMobileChange = (event) => {
            this.setState({mobile: event.target.value})
        }
        onLandChange = (event) => {
            this.setState({landetails: event.target.value})
        }
        onPriceChange = (event) => {
            this.setState({price: event.target.value})
        }
        onAddressChange = (event) => {
            this.setState({address: event.target.value})
        }
        onButtonSubmit = () => {
            fetch('http://localhost:3001/seller', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    email: this.state.email,
                    propertyname: this.state.propertyname,
                    landetails: this.state.landetails,
                    price: this.state.price,
                    address: this.state.address,
                    ownername: this.state.ownername,
                    mobile: this.state.mobile
                })
            })
                .then(response => response.json())
                .then(user => {
                    if(user.id){
                        this.props.loadForm(user);
                        this.props.onRouteChange('home');
                }
            })
            // this.props.onRouteChange('home');
    
        }
        render() {
            // const { onRouteChange } = this.props;
            return(
                <article className="br3 ba  b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                    <main className="pa4 black-80">
                        <div className="measure">
                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                <legend className="f1 fw6 ph0 mh0 center">Land Details</legend>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" htmlFor="name">OwnerName</label>
                                    <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="text" 
                                    name="name" 
                                    id="name"
                                    onChange = {this.onNameChange} />
                                </div>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                    <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="email" 
                                    name="email-address" 
                                    id="email-address"
                                    onChange = {this.onEmailChange} />
                                </div>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" htmlFor="number">Mobile Number</label>
                                    <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="mobile" 
                                    name="mobile-number" 
                                    id="email-address"
                                    onChange= {this.onMobileChange} />
                                </div>
                                <div className="mv3">
                                    <label className="db fw6 lh-copy f6" htmlFor="name">Property Area</label>
                                    <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="text" 
                                    name="text" 
                                    id="text"
                                    onChange= {this.onPropertyChange} />
                                </div>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" htmlFor="file">Land Docs</label>
                                    <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="file" 
                                    name="Land" 
                                    id="Landetails"
                                    onChange = {this.onLandChange} />
                                </div>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" htmlFor="name">price</label>
                                    <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="price" 
                                    name="price" 
                                    id="price"
                                    onChange = {this.onPriceChange} />
                                </div>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" htmlFor="name">Address</label>
                                    <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="text" 
                                    name="address" 
                                    id="address"
                                    onChange = {this.onAddressChange} />
                                </div>
                            </fieldset>
                                <div className="">
                                    <input onClick={this.onButtonSubmit} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Add" />
                                </div>
                        </div>
                    </main>
                </article>
            )
        }
  
    }
export default Form;