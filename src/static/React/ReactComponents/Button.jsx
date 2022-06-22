import React from 'react';

class Button extends React.Component{
  constructor(props){
    super(props)

    this.handleClick = this.handleClick.bind(this)
    this.btnRef = React.createRef();
  }

  handleClick(event){
    console.log(event)
  }

  render() { 
    return ( 
      <button type="button" className={"btn btn-"+this.props.tag} onClick={this.handleClick} ref={this.btnRef}>
        {this.props.value}
      </button>
    )
  }
}

export default Button;