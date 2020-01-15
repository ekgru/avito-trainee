import React from "react";
import Modal from "./Modal";

class Pic extends React.Component {
  constructor() {
    super();
    this.state = {
      modalOn: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }
//
//обработчик отвечает за открытие и закрытие модалки
//
  handleClick() {
    this.setState(prevState => {
      return {
        modalOn: !prevState.modalOn
      };
    });
  }

  render() {
  
    return (
      <div>
        {this.state.modalOn&&<Modal closeClick={this.handleClick} altPic={this.props.url} picID={this.props.id}/>}
        <img
          src={this.props.url}
          id={this.props.id}
          alt="Здесь должна быть картинка, но ее нет"
          onClick={this.handleClick}
        />
      </div>
    );
  }
}

export default Pic;
