import React from "react";

export default class ImageCard extends React.Component {
  constructor(props) {
    super(props);
    this.imageRef = React.createRef();
    this.state = { spans: 1 };
  }
  componentDidMount() {
    this.imageRef.current.addEventListener("load", () => {
      let spans = Math.ceil(this.imageRef.current.clientHeight/5);
      this.setState({spans});
    });
  }
  render() {
    const { alt_description, urls } = this.props.image;
    return (
      <li style={{gridRowEnd : `span ${this.state.spans}`}}>
        <img ref={this.imageRef} src={urls.regular} alt={alt_description} />
      </li>
    );
  }
}
