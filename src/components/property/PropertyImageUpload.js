import React from 'react';
import { Button } from '@mui/material';

export default function PropertyImageUpload({ images, setImages }) {
  const handleImageChange = (event) => {
    const files = event.target.files;
    const imageList = Array.from(files).map((file) => URL.createObjectURL(file));
    setImages(imageList);
    //setImages(files);
  };

  return (
    <div>
      <input
        accept="image/*"
        style={{ display: 'none' }}
        id="upload-button"
        multiple
        type="file"
        onChange={handleImageChange}
      />
      <label htmlFor="upload-button">
        <Button variant="contained" component="span">
          Upload Images
        </Button>
      </label>
      <div>
        {images.map((image, index) => (
          <img key={index} src={image} alt={`Uploaded ${index}`} width={100} style={{ margin: '10px' }} />
        ))}
      </div>
    </div>
  );
}
