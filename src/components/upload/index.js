import React from 'react';
import { render } from 'react-dom';
import { observer } from 'mobx-react';
import ImgUpload from './ImageUpload';

const styles = {
  fontFamily: 'sans-serif',
  textAlign: 'center',
};


const App = observer(() => (
  <div style={styles}>
    <h2>Graceful Image Upload Preview {'\u2728'}</h2>
    <ImgUpload />
  </div>
))  ;

render(<App />, document.getElementById('root'));
