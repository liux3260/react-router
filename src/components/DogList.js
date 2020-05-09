import React from 'react';
import Photo from './Photo';


const DogList = ({dogs}) =>{

  let photo;
  photo = dogs.map(photo=>
    <Photo url={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`} key={photo.id}></Photo>)

  return(
    <div className="photo-container">
        <h2>Image of Dogs</h2>
        <ul>
          {photo}
        </ul>
      </div>
  );

  }

export default DogList;