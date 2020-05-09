import React from 'react';
import Photo from './Photo';


const ComputerList = ({computers}) =>{

  let photo;
  photo = computers.map(photo=>
    <Photo url={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`} key={photo.id}></Photo>)

  return(
    <div className="photo-container">
        <h2>Image of Computers</h2>
        <ul>
          {photo}
        </ul>
      </div>
  );

  }

export default ComputerList;