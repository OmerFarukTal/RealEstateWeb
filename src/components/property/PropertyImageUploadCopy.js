import React from 'react';
import { Button } from '@mui/material';

export default function PropertyImageUploadCopy({ images, setImages }) {
  const handleImageChange = (event) => {
    const files = event.target.files;
    //const imageList = Array.from(files).map((file) => URL.createObjectURL(file));
    //setImages(imageList);
    setImages(Array.from(files));
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
          <img key={index} src={URL.createObjectURL(image)} alt={`Uploaded ${index}`} width={100} style={{ margin: '10px' }} />
        ))}
      </div>
    </div>
  );
}
