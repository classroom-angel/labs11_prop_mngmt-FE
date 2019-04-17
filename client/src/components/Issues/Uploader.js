import React from 'react';
// import axios from '../axiosInstance';

export default function Uploader(props) {
  const { uploading } = props;
  const content = () => {
    switch (true) {
      case uploading:
        const success = 'Images added :)';
        return <div>{success}</div>;
      default:
        return (
          <div className="uploader">
            <label htmlFor="files">Upload Image(s)?</label>
            <input
              type="file"
              id="files"
              name="files"
              onChange={props.imgAdder}
              multiple
            />
          </div>
        );
    }
  };
  return <div>{content()}</div>;
}
