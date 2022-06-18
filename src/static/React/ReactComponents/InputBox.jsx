import React from 'react';
import ReactDOM from 'react-dom';

class InputBox extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      input: "",

      inputState: "",
      inputStateText: "",

      passwordConfirm: "",

      users: [
        ["user1", "user1@gmail.com"],
        ["user2", "user2@yandex.com"],
        ["user3", "user3@microsoft.com"],
        ["user4", "user4@wambo.com"],
      ]
    }
    this.inputRef = React.createRef();
    this.handleChange = this.handleChange.bind(this);
  }

  setMessageState(event, state=this.state.inputState, stateText=this.state.inputStateText){
    let infoMessage = event.target.parentNode.querySelectorAll('.infoMessage')[0]

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
          }, () => { this.setMessageState(event) })
        } else if(this.state.users.some(row => row[0] == event.target.value)){ // username exists?
          this.setState({
            inputState: "error",
            inputStateText: "This username already exists",
          }, () => { this.setMessageState(event) })
        } else {
          this.setState({
            inputState: "",
            inputStateText: "",
          }, () => { this.setMessageState(event) })
        }
        break;

      case "email":
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g // email possible?
        if(!event.target.value.match(emailRegex)){
          this.setState({
            inputState: "error",
            inputStateText: "Not a valid email.",
          }, () => { this.setMessageState(event) })

        } else if(this.state.users.some(row => row[1] == event.target.value)){
          this.setState({
            inputState: "error",
            inputStateText: "This email already has an account.",
          }, () => { this.setMessageState(event) })
        } else {
          this.setState({
            inputState: "",
            inputStateText: "",
          }, () => { this.setMessageState(event) })
        }
        break;

      case "password":
        if(event.target.value.length < 8){
          this.setState({
            inputState: "error",
            inputStateText: "Password too short",
          }, () => { this.setMessageState(event) })
        } else if(!event.target.value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g)){ // password check
          this.setState({
            inputState: "warning",
            inputStateText: "Your password is weak. (0-9, a-Z, !%@#)",
          }, () => { this.setMessageState(event) })
        } else {
          this.setState({
            inputState: "success",
            inputStateText: "Seems fine!",
          }, () => {
            this.props.sendPass(event.target.value)
            
            this.setMessageState(event)
            setTimeout(() => {
              this.setState({
                inputState: "",
                inputStateText: "",
              }, () => {
                this.setMessageState(event)
              })
            }, 750);
          })
        }

        break;

      case "passwordRepeat":
        if(this.props.currentPass != event.target.value){
          this.setState({
            inputState: "error",
            inputStateText: "Passwords don't match",
          }, () => { this.setMessageState(event) })
        } else if (this.props.currentPass == event.target.value){
          this.setState({
            inputState: "success",
            inputStateText: "All good!",
          }, () => {            
            this.setMessageState(event)
            setTimeout(() => {
              this.setState({
                inputState: "",
                inputStateText: "",
              }, () => {
                this.setMessageState(event)
              })
            }, 750);
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