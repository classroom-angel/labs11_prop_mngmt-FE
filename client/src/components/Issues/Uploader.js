import React, { Component } from 'react';
// import axios from '../axiosInstance';

export default class Uploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: []
    };
  }
  content = () => {
    const images = document.querySelector('#files');
    if (images) {
      this.setState({
        files: Array.from(images.files)
      });
    }
  };

  updateFiles = e => {
    e.preventDefault();
    const images = e.target.files;
    const files = Array.from(images);
    this.setState({ files });
    console.log('UPDATED', files);
  };

  render() {
    return (
      <div className="uploader">
        <label htmlFor="files" className="btn cyan same-button">
          Upload Image(s)? ({this.state.files.length})
        </label>
        <input
          type="file"
          id="files"
          name="files"
          onChange={this.updateFiles}
          multiple
        />
      </div>
    );
  }
}
