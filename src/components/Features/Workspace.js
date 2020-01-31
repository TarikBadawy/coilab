import React, { Component } from "react";
import { connect } from "react-redux";
import Quill from "quill";
import "../../css/quil.snow.css";
import axios from "axios";
import { userLogOut } from "../../redux/actions/userActions";
import PropTypes from "prop-types";

class Workspace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editor: undefined,
      documents: [],
      document_id: undefined,
      document_title: undefined,
      document_delta: undefined
    };
  }

  create_editor = () => {
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

    let editor = new Quill("#editor", options);
    this.setState({ editor });
  };

  redirect_invalid_user = error => {
    if (error) console.error(error);
    this.props.userLogOut();
    this.props.history.push("/");
  };

  get_document_list = login_token => {
    let request = new URLSearchParams({
      list: true,
      login_token
    });
    axios
      .post("http://api.coilab.com/docs", request)
      .then(res => res.data)
      .then(data => {
        if (data.status === "success") {
          this.setState({ documents: data.files });
        } else {
          console.error(data);
          this.redirect_invalid_user();
        }
      })
      .catch(err => console.log(err));
  };

  save_document = (delta, name, file_id) => {
    let request = new URLSearchParams({
      save: true,
      file_id,
      name,
      content: JSON.stringify(delta),
      login_token: this.props.auth_token
    });
    axios
      .post("http://api.coilab.com/docs", request)
      .then(res => res.data)
      .then(data => {
        if (data.status === "success") {
          this.setState({
            document_id: data.file_id,
            document_delta: delta,
            document_title: name
          });
          this.get_document_list(this.props.auth_token);
          this.set_editor_content();
        } else {
          console.error(data);
          this.redirect_invalid_user();
        }
      })
      .catch(err => console.log(err));
  };

  delete_document = (file_id, auth_token) => {
    let request = new URLSearchParams({
      delete: true,
      login_token: auth_token,
      file_id
    });
    axios
      .post("http://api.coilab.com/docs", request)
      .then(res => res.data)
      .then(data => {
        console.log(data);
        if (data.status === "success") {
          this.setState({
            document_id: undefined,
            document_title: undefined,
            document_delta: undefined
          });
          this.get_document_list(this.props.auth_token);
          this.set_editor_content();
        } else {
          console.error(data);
          this.redirect_invalid_user();
        }
      })
      .catch(err => console.log(err));
  };

  get_document = file_id => {
    let request = new URLSearchParams({
      file: true,
      file_id,
      login_token: this.props.auth_token
    });
    axios
      .post("http://api.coilab.com/docs", request)
      .then(res => res.data)
      .then(data => {
        if (data.status === "success") {
          this.setState({
            document_title: data.name,
            document_id: file_id,
            document_delta: JSON.parse(data.content)
          });
          this.set_editor_content();
        } else {
          console.error(data);
          this.redirect_invalid_user();
        }
      })
      .catch(err => console.log(err));
  };

  handle_create_document_button = () => {
    this.save_document([{ insert: "\n" }], "new document");
  };

  handle_delete_document_button = () => {
    this.delete_document(this.state.document_id, this.props.auth_token);
  };

  handle_change = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  handle_list_document_pressed = event => {
    this.get_document(event.target.id);
  };

  handle_save_button = () => {
    if (this.state.editor) {
      this.save_document(
        this.state.editor.getContents(),
        this.state.document_title,
        this.state.document_id
      );
    }
  };

  set_editor_content = () => {
    if (this.state.editor) {
      this.state.editor.setContents(this.state.document_delta);
    }
  };

  componentDidMount() {
    let request = new URLSearchParams({
      get: "login_status",
      login_token: this.props.auth_token
    });
    axios
      .post("http://api.coilab.com/user", request)
      .then(res => res.data.login_status)
      .then(status => {
        if (status === true) {
          this.create_editor();
          this.get_document_list(this.props.auth_token);
        } else {
          this.redirect_invalid_user(status);
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="row m-0 pt-3" style={{ maxWidth: "100%" }}>
        <div className="col-sm-3 border-right mb-4">
          <DocumentList
            documents={this.state.documents}
            document_id={this.state.document_id}
            get_document_list={this.get_document_list}
            handle_list_document_pressed={this.handle_list_document_pressed}
            handle_save_button={this.handle_save_button}
            handle_create_document_button={this.handle_create_document_button}
            handle_delete_document_button={this.handle_delete_document_button}
          />
          <hr />
        </div>
        <div className="col-sm-9">
          <Document
            document_id={this.state.document_id}
            document_title={this.state.document_title}
            handle_change={this.handle_change}
          />
        </div>
      </div>
    );
  }
}

class DocumentList extends Component {
  render() {
    let list_item_style = {
      textOverflow: "ellipsis",
      overflow: "hidden",
      whiteSpace: "nowrap",
      cursor: "pointer",
      borderRadius: "0px"
    };

    let document_cards = this.props.documents.map((document, index) => (
      <li
        className={
          "list-group-item list-group-item-action list-group-item-info " +
          (this.props.document_id === document.file_id && "active")
        }
        key={index}
        onClick={this.props.handle_list_document_pressed}
        id={document.file_id}
        style={list_item_style}
      >
        {document.name}
      </li>
    ));

    let buttons = {
      save: (
        <div
          style={list_item_style}
          key="save_button"
          className="list-group-item list-group-item-action text-center list-group-item-primary"
          onClick={this.props.handle_save_button}
        >
          <span role="img" aria-label="save">
            💾
          </span>
        </div>
      ),
      create: (
        <div
          style={list_item_style}
          key="create_button"
          className="list-group-item list-group-item-action text-center list-group-item-primary"
          onClick={this.props.handle_create_document_button}
        >
          <span role="img" aria-label="create">
            ➕
          </span>
        </div>
      ),
      delete: (
        <div
          style={list_item_style}
          key="delete_button"
          className="list-group-item list-group-item-action text-center list-group-item-danger"
          onClick={this.props.handle_delete_document_button}
        >
          <span role="img" aria-label="delete">
            🗑
          </span>
        </div>
      )
    };

    return (
      <>
        <ul className="list-group list-group-horizontal mb-2">
          {buttons.create}
          {this.props.document_id && [buttons.save, buttons.delete]}
        </ul>
        <ul className="list-group">{document_cards}</ul>
      </>
    );
  }
}

class Document extends Component {
  render() {
    return (
      <div style={{ maxWidth: "100%", minWidth: "100%" }}>
        <form>
          <input
            className="form-control mb-4 rounded-0"
            type="text"
            id="document_title"
            placeholder="Title"
            onChange={this.props.handle_change}
            value={this.props.document_title || ""}
          />
        </form>
        <div id="toolbar" />
        <div id="editor" style={{ minHeight: "40rem" }} />
      </div>
    );
  }
}

DocumentList.propTypes = {
  documents: PropTypes.array,
  document_id: PropTypes.string,
  get_document_list: PropTypes.func.isRequired,
  handle_list_document_pressed: PropTypes.func.isRequired,
  handle_save_button: PropTypes.func.isRequired,
  handle_create_document_button: PropTypes.func.isRequired,
  handle_delete_document_button: PropTypes.func.isRequired
};

Document.propTypes = {
  document_id: PropTypes.string,
  document_title: PropTypes.string,
  handle_change: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return { ...state.user };
};

export default connect(mapStateToProps, { userLogOut })(Workspace);
