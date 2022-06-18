import React from 'react';

class UserCard extends React.Component{
  render() { 
    const {imageDir, userName, userDesc} = this.props;

    return ( 
      <div className="UserCard">
        <img src={imageDir} alt="pfp"/>
        <div className='UserData'>
          <div className="UserName">{userName}</div>
          <div className="UserDesc">{userDesc}</div>
        </div>
      </div>
    )
  }
}

export default UserCard;