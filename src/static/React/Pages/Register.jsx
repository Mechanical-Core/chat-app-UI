import React, { useRef } from 'react';
import InputBox from '@React/reactComponents/InputBox';
import Button from '@React/reactComponents/Button';
import CheckBox from '@React/reactComponents/CheckBox';

class Register extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      currentPass: "",

      fieldChecks: {
        checkUsername: false,
        checkEmail: false,
        checkPasswordInput: false,
        checkPasswordState: false,
      },

      data: {
        username: "",
        email: "",
        password: "",
      }
    }

    this.getPass = this.getPass.bind(this);
    this.getState = this.getState.bind(this)
    this.getData = this.getData.bind(this)
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

  getState(state, value){
    var fieldChecks = {...this.state.fieldChecks}
    fieldChecks[state] = value

    this.setState({fieldChecks}, ()=> {
      console.log(this.state.fieldChecks)
    })
  }

  checkState(){
    var result = true
    
    for(var field in this.state.fieldChecks){
      if(!this.state.fieldChecks[field]) {
        result = false
        break;
      }
    }
    
    return result;
  }

  getData(dataField, dataValue){
    var data = {...this.state.data}
    data[dataField] = dataValue

    
    this.setState({data}, ()=> {
      if(this.checkState()){
        console.log(this.state.data)
      }
    })
  }

  render() { 
    return ( 
      <div className="startFrame">
        <div className="startField">
          <div className="startTitleFrame">
            <div className="title">Registration</div>
            <div className="description">Enter all of the necessary information below to create a new account!</div>
          </div>
          <div className="inputFields">
            <InputBox title="Username" defaultText="Your username" maxLength="21" validate="username" sendState={this.getState} sendData={this.getData}/>
            <InputBox title="Email" defaultText="Your email address" maxLength="254" validate="email" sendState={this.getState} sendData={this.getData}/>
            <InputBox title="Password" defaultText="Your password"  maxLength="21" validate="password" sendPass={this.getPass} sendState={this.getState} sendData={this.getData}/>
            <InputBox idName="passwordConfirm" title="Password Confirmation" defaultText="Repeat your password" maxLength="21" validate="passwordRepeat" currentPass={this.state.currentPass} sendState={this.getState} sendData={this.getData}/>
          </div>
          <div className="registerChecks">
            <CheckBox text='I agree to my data being stored and processed by Example'/>
            <CheckBox text="I have read and accepted the EULA"/>
          </div>
          <div className="actionButtons">
            <Button value="Sign up"/>
            <Button value="Return" tag="invert"/>
          </div>
        </div>
        <div className="MazeBackgroundField">
          <div className="BackgroundMaze">
          
          </div>
        </div>
      </div>
    )
  }
}

export default Register;