import React from "react";
import Pic from "./Pic";

class App extends React.Component {
  constructor() {
    super();
    this.state = { images: [] };
  }

  componentDidMount() {
    fetch("https://boiling-refuge-66454.herokuapp.com/images")
      .then(response => response.json())
      .then(res => {
        this.setState({ images: res });
      });
  }

  render() {
    const pictures = this.state.images.map((item, i) => (
      <Pic url={item.url} key={i} id={item.id} />
    ));
    return (
      <div className="page">
        <div className="main-content">
          <header>HELLO WORLD!</header>
          <div id="img-container">{pictures}</div>
        </div>
        <div className="footer">© 2018-2020</div>
      </div>
    );
  }
}

export default App;
