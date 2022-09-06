import React, { useRef } from 'react';
import InputBox from '@React/reactComponents/InputBox';
import Button from '@React/reactComponents/Button';
import CheckBox from '@React/reactComponents/CheckBox';

class Login extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      currentPass: "",

      fieldChecks: {
        checkUsername: false,
        checkPasswordInput: false,
      },

      data: {
        username: "",
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
            <div className="title">Log in</div>
            <div className="description">Enter all of the necessary information below to log into your account!</div>
          </div>
          <div className="inputFields">
            <InputBox title="Username" defaultText="Your username" maxLength="21" validate="username" sendState={this.getState} sendData={this.getData}/>
            <InputBox title="Password" defaultText="Your password"  maxLength="21" validate="passwordSimple" sendState={this.getState} sendData={this.getData} sendPass={this.getPass}/>
          </div>
          <div className="startChecks">
            <CheckBox text='Remmember me next time'/>
          </div>
          <div className="actionButtons">
            <Button value="Log in"/>
            <Button value="Register" tag="invert" ref="/register"/>
          </div>
          <div className="helpMessage">If you have any issues logging in, email markusmisins@gmail.com</div>
        </div>
        <div className="MazeBackgroundField">
          <div className="BackgroundMaze">
          
          </div>
        </div>
      </div>
    )
  }
}

export default Login;