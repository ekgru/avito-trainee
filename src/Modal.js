import React from "react";

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      url: this.props.altPic,
      name: "",
      comment: "",
      comments: []
    };
    this.handleChange = this.handleChange.bind(this);

    this.postComment = this.postComment.bind(this);
  }
  //
  //делаем запрос для отображения нужной информации в модальном окне
  //
  componentDidMount() {
    fetch(
      `https://boiling-refuge-66454.herokuapp.com/images/${this.props.picID}`
    )
      .then(response => response.json())
      .then(res => {
        this.setState({ id: res.id, url: res.url, comments: res.comments });
      });
  }
  //
  // создаем комментарии
  //
  doComments() {
    let commentsArr = this.state.comments;
    let options = {
      day: "numeric",
      month: "numeric",
      year: "numeric"
    };
    let comments;
    if (Array.isArray(commentsArr) && commentsArr.length) {
      comments = commentsArr.map((item, i, arr) => (
        <div className='comment' key={i}>
          <div className="comment-date">
            {new Date(item.date).toLocaleString("ru", options)}
          </div>
          <div className="comment-text">{item.text}</div>
        </div>
      ));
    }
    return comments;
  }
  //
  //метод для отправки комментария
  //
  postComment() {
    let message = { name: "", comment: "" };
    message.name = this.state.name;
    message.comment = this.state.comment;
    fetch(
      `https://boiling-refuge-66454.herokuapp.com/images/${this.state.id}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify(message)
      }
    );
    this.state.comments.push({ text: this.state.comment, date: new Date() });
    this.setState(prevState => {
      return { name: "", comment: "" };
    });
  }
  //
  //оботчик изменений в форме отправки комментария
  //

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <div className="modal-win">
        <div className="modal-content">
          <div className="modal-col">
            <img className="modal-img" src={this.state.url} alt="Загружаюсь" />
            <form>
              <input
                type="text"
                name="name"
                placeholder="Ваше имя"
                value={this.state.name}
                onChange={this.handleChange}
              />
              <br />
              <input
                type="text"
                name="comment"
                placeholder="Ваш комментарий"
                value={this.state.comment}
                onChange={this.handleChange}
              />
              <br />
              <button
                disabled={
                  this.state.name && this.state.comment ? "" : "disabled"
                }
                type="button"
                onClick={this.postComment}
              >
                Оставить комментарий
              </button>
            </form>
          </div>
          <div className="modal-col">
            <div className="modal-comment-area">{this.doComments()}</div>{" "}
            <span onClick={this.props.closeClick} className="modal-close"></span>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
