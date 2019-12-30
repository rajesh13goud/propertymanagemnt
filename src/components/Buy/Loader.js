import React from "react";
import Loader from "react-loader-spinner";
export default class Load extends React.Component {
  //other logic
  render() {
    return <Loader type="Audio" color="#somecolor" height={80} width={80} />;
  }
}
