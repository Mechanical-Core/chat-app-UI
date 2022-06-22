import React from 'react';

class CheckBox extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      confirmed: false,
    }

    this.checkBoxRef = React.createRef();
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(event){
    console.log(this.state.confirmed == true)

    if(!this.state.confirmed){
      this.setState({
        confirmed: true
      }, ()=>{
        this.checkBoxRef.current.classList.add("enabled")
      })
    } else {
      this.setState({
        confirmed: false
      }, ()=>{
        this.checkBoxRef.current.classList.remove("enabled")
      })
    }
  }

  render() { 
    return ( 
      <div className='checkBoxFrame' onClick={this.handleClick}>
        <div className='circle' ref={this.checkBoxRef}></div>
        <div className='text'>
          {this.props.text}
        </div>
      </div>
    )
  }
}

export default CheckBox;