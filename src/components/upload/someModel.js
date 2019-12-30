import {action, computed, observable, observe} from 'mobx';

const imgPreviewFallback = 'https://via.placeholder.com/200?text=Your+Image+Here';

export default class Model {
  //will hold the file's FormData if we have one
  @observable imgFormData = null;
  //will hold the preview URL for the image
  @observable imgPreviewUrl = null;

  constructor() {
    //let's observe changes to the imgFormData
    observe(this, 'imgFormData', () => {
      this.imgPreviewUrl = null;
      let {imgFormData} = this;
      if (imgFormData && !(imgFormData instanceof FormData)) {
        this.imgFormData = null;
      } else if (imgFormData && window.FileReader && imgFormData.get('file')) {
        try {
          //See https://developer.mozilla.org/en-US/docs/Web/API/FileReader
          let fr = new FileReader();

          //here's where the magic happens - the FileReader can read a file input as a DataURL, 
          //which can then be used as an image's src
          fr.onload = action(() => { this.imgPreviewUrl = fr.result; });
          fr.readAsDataURL(imgFormData.get('file'));
        } catch (e) { }
      }
    });
  }

  @computed get previewUrl() {
    let { imgPreviewUrl } = this;
    return imgPreviewUrl || imgPreviewFallback;
  }
  @computed get imgFileName() {
    let { imgFormData } = this;
    if (imgFormData && imgFormData instanceof FormData) {
      return imgFormData.get('name');
    }
  }

}