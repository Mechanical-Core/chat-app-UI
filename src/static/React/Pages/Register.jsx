import React, { useRef } from 'react';
import InputBox from '@React/reactComponents/InputBox';

class Register extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      currentPass: "",
    }
    this.getPass = this.getPass.bind(this);
  }

  componentDidMount(){
    document.body.classList.add('BackgroundRain')
  }
  componentWillUnmount(){
    document.body.classList.remove("BackgroundRain")
  }

  getPass(value){
    this.setState({
      currentPass: value,
    })
  }

  render() { 
    return ( 
      <div className="registerField">
        <div className="registerTitleFrame">
          <div className="title">Registration</div>
          <div className="description">Enter all of the necessary information below to create a new account!</div>
        </div>
        <div className="inputFields">
          <InputBox title="Username" defaultText="Your username..." maxLength="21" validate="username"/>
          <InputBox title="Email" defaultText="Your email address.." maxLength="254" validate="email"/>
          <InputBox title="Password" defaultText="Your password"  maxLength="21" validate="password" sendPass={this.getPass}/>
          <InputBox title="Password Confirmation" defaultText="Repeat your password..." maxLength="21" validate="passwordRepeat" currentPass={this.state.currentPass}/>
        </div>
      </div>
    )
  }
}

export default Register;