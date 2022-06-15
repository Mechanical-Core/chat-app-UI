import React from 'react';
import UserCard from '@React/ReactComponents/UserCard';

class MainLeftBar extends React.Component{
  render() { 
    return ( 
      <div className="MainLeftBar">
        <UserCard imageDir="src\static\Graphics\Images\orangutan1.jpg" userName="SnowyBall" userDesc="Consequat id culpa ad voluptate commodo anim ea."/>
      </div>
    )
  }
}

export default MainLeftBar;