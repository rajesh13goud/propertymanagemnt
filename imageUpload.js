import React from 'react';
import {observer} from 'mobx-react';
import Model from './someModel';

const flexCenterStyles = {
  display: 'flex',
  alignItems: 'center'
};

const fileUploadStyles = {
  justifyContent: 'space-around'
};

const imgContainerStyles = {
  padding: 5,
  border: '1px solid cornflowerblue',
  borderRadius: 3,
  backgroundColor: 'lightgray'
};

const imgStyles = {
  maxHeight: '100%',
  maxWidth: '100%'
};

const btnStyles = {
  marginLeft: 15,
  padding: '10px 5px',
  fontSize: '1.5rem',
  borderRadius: 5,
  backgroundColor: 'cornflowerblue',
  color: 'whitesmoke',
  fontWeight: 'bold',
  position: 'relative'
};

const inputStyles = {
  cursor: 'pointer',
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  opacity: 0
};

@observer
export default class ImageUplaoder extends React.Component {
  componentWillMount() {
    this.img = new Model();
  }

  onImgFileChange = evt => {
    const { files } = evt.target,
      hasFile = files && files.length > 0;
    if (hasFile) {
      //create a FormData to put the file and its name into
      //also, if we were to persist to some backend, FormData is what we'd send
      let fd = new FormData();
      fd.append('file', files[0]);
      fd.append('name', files[0].name);
      this.img.imgFormData = fd;
    } else {
      this.img.imgFormData = null;
    }
  }

  render() {
    let {img} = this;
    return (
      <div style={Object.assign({}, flexCenterStyles, fileUploadStyles)}>
        <div style={imgContainerStyles}>
          <img style={imgStyles} src={img.previewUrl} alt="Upload an image" />
        </div>
        <button style={btnStyles}>
          {img.imgFileName || 'Select Image'}
          <input type="file" style={inputStyles} accept="image/*" onChange={this.onImgFileChange} />
        </button>
      </div>
    );
  }
}