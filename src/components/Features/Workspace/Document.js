import React, { Component } from "react";
import { connect } from "react-redux";
import Quill from "quill";
import "../../../css/quil.snow.css";

class Document extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editor: undefined
    };
  }

  componentDidMount() {
    let options = {
      modules: {
        toolbar: [
          [{ font: [] }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [
            { color: [] },
            "bold",
            "italic",
            "underline",
            "strike",
            "code-block",
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
            { script: "sub" },
            { script: "super" },
            { align: [] }
          ],
          ["link", "image", "video"]
        ],
        history: {
          delay: 2000,
          maxStack: 500,
          userOnly: true
        }
      },
      placeholder: "...",
      theme: "snow"
    };

    this.setState({
      editor: new Quill("#editor", options)
    });
  }

  saveDocument = () => {
    let delta = this.state.editor.getContents();
    console.log(delta);
    // upload delta to database
  };

  setDocument = () => {
    let delta = []; // get delta from database
    this.state.editor.setContents(delta);
  };

  render() {
    return (
      <>
        <div style={{ maxWidth: "48rem" }}>
          <div id="toolbar" />
          <div id="editor" style={{ minHeight: "40rem" }} />
          <button onClick={this.saveDocument}>save doc</button>
          <button onClick={this.setDocument}>set doc</button>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return { ...state.user };
};

export default connect(mapStateToProps)(Document);
