import React from 'react';
import ReactDOM from 'react-dom';

class InputBox extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      input: "",

      inputState: "",
      inputStateText: "",

      users: [
        ["user1", "user1@gmail.com"],
        ["user2", "user2@yandex.com"],
        ["user3", "user3@microsoft.com"],
        ["user4", "user4@wambo.com"],
      ]
    }
    this.inputRef = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.hash = this.hash.bind(this);
  }

  hash(str) {
    let h1 = 0xdeadbeef ^ 23, h2 = 0x41c6ce57 ^ 23;
    for (let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1>>>16), 2246822507) ^ Math.imul(h2 ^ (h2>>>13), 3266489909);
    h2 = Math.imul(h2 ^ (h2>>>16), 2246822507) ^ Math.imul(h1 ^ (h1>>>13), 3266489909);
    return 4294967296 * (2097151 & h2) + (h1>>>0);
  };


  setMessageState(event, state=this.state.inputState, stateText=this.state.inputStateText){
    var infoMessage = event.target.parentNode.querySelectorAll('.infoMessage')[0]

    if(state == ""){
      infoMessage.parentNode.classList.remove('active')
      infoMessage.querySelector("#decal").src = ""
      infoMessage.querySelector("#text").innerHTML = ""

      infoMessage.querySelector("#decal").className = ""
      infoMessage.querySelector("#text").className = ""
    } else {
      infoMessage.parentNode.classList.add('active')
      infoMessage.querySelector("#decal").src = `src/static/graphics/svg/${state}.svg`
      infoMessage.querySelector("#text").innerHTML = stateText
  
      infoMessage.querySelector("#decal").classList.add(state)
      infoMessage.querySelector("#text").classList.add(state)
    }
  }

  handleChange(event){
    switch (this.props.validate) {
      case "username":
        if(event.target.value.length < 3){ // username length
          this.setState({
            inputState: "error",
            inputStateText: "Username too short.",
            usernameState: false,
          }, () => {
            this.setMessageState(event)
            this.props.sendState("checkUsername", false)
          })
        } else if(this.state.users.some(row => row[0] == event.target.value)){ // username exists?
          this.setState({
            inputState: "error",
            inputStateText: "This username already exists",
            usernameState: false,
          }, () => {
            this.setMessageState(event)
            this.props.sendState("checkUsername", false)
          })
        } else {
          this.setState({
            inputState: "",
            inputStateText: "",
            usernameState: true,
          }, () => {
            this.setMessageState(event)
            this.props.sendData("username", event.target.value)
            this.props.sendState("checkUsername", true)
          })
        }
        
        break;

      case "email":
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g // email possible?
        if(!event.target.value.match(emailRegex)){
          this.setState({
            inputState: "error",
            inputStateText: "Not a valid email.",
            emailState: false,
          }, () => {
            this.setMessageState(event)
            this.props.sendState("checkEmail", false)
          })

        } else if(this.state.users.some(row => row[1] == event.target.value)){
          this.setState({
            inputState: "error",
            inputStateText: "This email already has an account.",
            emailState: false,
          }, () => {
            this.setMessageState(event)
            this.props.sendState("checkEmail", false)
          })
        } else {
          this.setState({
            inputState: "",
            inputStateText: "",
            emailState: true,
          }, () => {
            this.setMessageState(event)
            this.props.sendData("email", event.target.value)
            this.props.sendState("checkEmail", true)
          })
        }

        break;

      case "password":
        if(event.target.value.length < 8){
          this.setState({
            inputState: "error",
            inputStateText: "Password too short",
            passwordInput: false,
          }, () => {
            this.setMessageState(event)
            this.props.sendPass(event.target.value)
            this.props.sendState("checkPasswordInput", false)
          })
        } else if(!event.target.value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g)){ // password check
          this.setState({
            inputState: "warning",
            inputStateText: "Your password is weak. (0-9, a-Z, !%@#)",
            passwordInput: false,
          }, () => {
            this.setMessageState(event)
            this.props.sendPass(event.target.value)
            this.props.sendState("checkPasswordInput", false)
          })
        } else {
          this.setState({
            inputState: "success",
            inputStateText: "Seems fine!",
            passwordInput: event.target.value,
          }, () => {
            this.setMessageState(event)
            this.props.sendPass(event.target.value)
            this.props.sendState("checkPasswordInput", true)
            setTimeout(() => {
              this.setState({
                inputState: "",
                inputStateText: "",
              }, () => {
                event.target.parentElement.parentElement.get
                this.setMessageState(event)
              })
            }, 750);
          })
        }

        var infoMessage = document.querySelectorAll('.inputFields')[0].querySelectorAll('.inputBoxFrame')[3].querySelectorAll(".infoMessage")[0]

        infoMessage.parentElement.querySelectorAll('.inputBox')[0].value = "";

        infoMessage.parentElement.classList.remove('active')
        infoMessage.querySelector("#decal").src = ""
        infoMessage.querySelector("#text").innerHTML = ""

        infoMessage.querySelector("#decal").className = ""
        infoMessage.querySelector("#text").className = ""

        this.props.sendState("checkPasswordState", false)

        break;

      case "passwordRepeat":
        if(this.props.currentPass != event.target.value){
          this.setState({
            inputState: "error",
            inputStateText: "Passwords don't match",
            passwordState: false,
          }, () => {
            this.setMessageState(event)
            this.props.sendState("checkPasswordState", false)
          })
        } else if (this.props.currentPass == event.target.value){
          this.setState({
            inputState: "",
            inputStateText: "",
            passwordState: true,
          }, () => {            
            this.setMessageState(event)
            this.props.sendData("password", this.hash(event.target.value))
            this.props.sendState("checkPasswordState",true)
          })
        }

        break;
    }
  }

  componentDidMount(){
    if(this.props.validate == "password" || this.props.validate == "passwordRepeat"){
      this.inputRef.current.type = "password"
    }
  }

  render() { 
    return ( 
      <div className="inputBoxFrame">

        <div className='title'>{this.props.title}</div>
        <input className="inputBox" type="text" ref={this.inputRef} placeholder={this.props.defaultText} maxLength={this.props.maxLength} onChange={e => this.handleChange(e)}/>
        <div className="infoMessage">
          <img id="decal"/>
          <div id="text"></div>
        </div>
      </div>
    )
  }
}



export default InputBox;