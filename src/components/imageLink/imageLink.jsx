import React from "react";
//import  ipfs from './ipfs';
// import { Redirect } from 'react-router-dom'
import axios from "axios";
// import { BrowserRouter as Router, Route, Link} from "react-router-dom";
// import {Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import Gas from "./gas";
// import Gas from "./gas";
// import Gas from './gas';
// import useForm from 'react-hook-form';
// import BlockChain from './blockchain';
// import Gas from './gas';

class ImageLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ipfsHash: "",
      data: null,
      // ownerid: '',
      ownername: "",
      location: "",
      address: "",
      price: "",
      asset_id: "",
      redirect: false
    };

    this.onButtonSubmit = this.onButtonSubmit.bind(this);
    this.onImageChange = this.onImageChange.bind(this);
    // this.onIdChange = this.onIdChange.bind(this);
    this.onOwnerChange = this.onOwnerChange.bind(this);
    this.onLocationChange = this.onLocationChange.bind(this);
    this.onAddressChange = this.onAddressChange.bind(this);
    this.onPriceChange = this.onPriceChange.bind(this);
  }
  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('shouldComponentUpdate!', nextProps);
  //   return nextProps.asset_id !== this.props.asset_id;
  // }
  onImageChange(e) {
    console.log("capture file...");
    e.preventDefault();
    const file = e.target.files[0];
    const reader = new window.FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.setState({ data: Buffer(reader.result) });
      console.log("buffer", this.state.data);
    };
  }
  // onIdChange(e){
  //     this.setState({ownerid:e.target.value})
  // }
  onOwnerChange(e) {
    this.setState({ ownername: e.target.value });
  }
  onLocationChange(e) {
    this.setState({ location: e.target.value });
  }
  onAddressChange(e) {
    this.setState({ address: e.target.value });
  }
  onPriceChange(e) {
    this.setState({ price: e.target.value });
  }
  onButtonSubmit(e) {
    e.preventDefault();

    this.setState({
      redirect: true
    });
    console.log("on submit..");
    const formData = new FormData();
    var file = document.querySelector("#file");
    formData.append("buffer", file.files[0]);
    // formData.append('ownerid',this.state.ownerid);
    formData.append("location", this.state.location);
    formData.append("ownername", this.state.ownername);
    formData.append("address", this.state.address);
    formData.append("price", this.state.price);

    const config = {
      headers: { "Content-Type": "multipart/form-data" }
    };
    const url = "http://localhost:4000/sendImage";
    console.warn("formdata", formData);
    //    window.location.href = '/ocr';
    axios
      .post(url, formData, config)
      .then(
        response => JSON.stringify(response["data"])

        // window.location.href='/addBlockchain:/' + asset_id;
      )
      .then(result => {
        if (result) {
          this.setState(
            (prevState, prevProps) => {
              return { asset_id: result };
            },
            () => console.log(this.state.asset_id)
          );
          // this.props.loadUser(result);
          // this.props.invoice(result);
        }
        console.log("resdeedde", result);

        this.props.onRouteChange("gas");
      });
  }
  render() {
    // const { asset_id } = this.props;
    return (
      <div>
        <p className="light blue f3">{"Add your property"}</p>
        <div className="flex">
          <div className="form center pa4 br3 shadow-5">
            <fieldset id="land_details" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0 center">Land Details</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">
                  Owner Name
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  value={this.state.ownername}
                  name="owner-name"
                  id="owner-name"
                  onChange={this.onOwnerChange}
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="land-address">
                  Land Details
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  name="land-address"
                  id="location-address"
                  onChange={this.onLocationChange}
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="address">
                  Address
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  name="address"
                  id="address"
                  onChange={this.onAddressChange}
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="number">
                  Price
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="number"
                  step="0.001"
                  min="0"
                  max="20"
                  name="price"
                  id="price"
                  onChange={this.onPriceChange}
                />
              </div>
              <input
                className="f4 pa2 w-70 center"
                id="file"
                type="file"
                name="file"
                onChange={e => this.onImageChange(e)}
              />
              {/* <img src={`https://gateway.ipfs.io/ipfs/${this.state.data}`} alt=""/> */}
              <button
                className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple"
                onClick={e => {
                  this.onButtonSubmit(e);
                }}
                role="status"
              >
                Add Asset
              </button>
              {this.state.redirect ? (
                <Gas asset_id={this.state.asset_id} />
              ) : null}
            </fieldset>
          </div>
        </div>
      </div>
    );
  }
}

export default ImageLink;
