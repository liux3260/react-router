import React from 'react';
import Photo from './Photo';
import NotFound from './NotFound';

const PhotoList = (props) =>{

  const {photoList} = props;
  let photos;
  let name = props.match.params.name;
  if(photoList.length >0){
    photos = photoList.map(photo=>
      <Photo url={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`} key={photo.id}></Photo>
      );
  }
  else{
    photos = <NotFound></NotFound>
  }

  return(
    <div className="photo-container">
        <h2>Image of {name}</h2>
        <ul>
          {photos}
        </ul>
      </div>
  );

  }

export default PhotoList;