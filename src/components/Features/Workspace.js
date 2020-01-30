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

  get_document_list = () => {
    let request = new URLSearchParams({
      list: true,
      login_token: this.props.auth_token
    });
    axios
      .post("http://api.coilab.com/docs", request)
      .then(res => res.data)
      .then(data => {
        data.status === "success"
          ? this.setState({ documents: data.files })
          : this.redirect_invalid_user(data.status);
      })
      .catch(err => console.log(err));
  };

  save_document = (delta, file_id) => {
    let request = new URLSearchParams({
      save: true,
      file_id,
      name: this.state.document_title,
      content: JSON.stringify(delta),
      login_token: this.props.auth_token
    });
    axios
      .post("http://api.coilab.com/docs", request)
      .then(res => res.data)
      .then(data => {
        if (data.status === "success") {
          this.setState({ document_id: data.file_id });
          this.get_document_list();
        } else console.error(data.status);
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
        data.status === "success"
          ? this.setState({ document_id: data.file_id })
          : console.error(data.status);
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
        } else console.error(data.status);
      })
      .catch(err => console.log(err));
  };

  handle_create_document_button = () => {
    this.save_document([{ insert: "\n" }]);
  };

  handle_change = event => {
    this.setState({ [event.target.id]: event.target.value });
    if (event.target.id === "document_title") {
      this.get_document_list();
    }
  };

  handle_list_document_pressed = event => {
    this.get_document(event.target.id);
  };

  handle_save_button = () => {
    this.save_document(this.state.editor.getContents(), this.state.document_id);
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
        if (status !== true) {
          this.redirect_invalid_user(status);
        } else {
          this.create_editor();
          this.get_document_list();
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="d-flex">
        <nav className="d-none d-md-block p-3 border-right vh-100">
          <DocumentList
            documents={this.state.documents}
            document_id={this.state.document_id}
            handle_list_document_pressed={this.handle_list_document_pressed}
            handle_create_document_button={this.handle_create_document_button}
          />
        </nav>
        <main className="p-3 mx-auto">
          <Document
            document_id={this.state.document_id}
            document_title={this.state.document_title}
            handle_change={this.handle_change}
            handle_save_button={this.handle_save_button}
            handle_create_document_button={this.handle_create_document_button}
          />
        </main>
      </div>
    );
  }
}

class DocumentList extends Component {
  render() {
    let document_cards =
      this.props.documents &&
      this.props.documents.map((document, index) => (
        <li className="list-group-item" key={index}>
          <button
            id={document.file_id}
            className={
              "list-group-item list-group-item-action " +
              (this.props.document_id === document.file_id
                ? "bg-warning"
                : "bg-light")
            }
            onClick={this.props.handle_list_document_pressed}
          >
            {document.name}
          </button>
        </li>
      ));

    return (
      <ul className="list-group">
        <li className="list-group-item">
          <button
            className="text-center list-group-item list-group-item-action bg-secondary text-light"
            onClick={this.props.handle_create_document_button}
          >
            create document
          </button>
        </li>
        {document_cards ? document_cards : "Something went wrong"}
      </ul>
    );
  }
}

class Document extends Component {
  render() {
    return (
      <div style={{ maxWidth: "48rem" }}>
        <form>
          <input
            className="form-control mb-4"
            type="text"
            id="document_title"
            placeholder="Title"
            onChange={this.props.handle_change}
            value={this.props.document_title || ""}
          />
        </form>
        <div id="toolbar" />
        <div id="editor" style={{ minHeight: "40rem" }} />
        <button
          className="btn btn-dark m-2"
          onClick={
            this.props.document_id
              ? this.props.handle_save_button
              : this.props.handle_create_document_button
          }
        >
          save doc
        </button>
      </div>
    );
  }
}

DocumentList.propTypes = {
  documents: PropTypes.array,
  document_id: PropTypes.string,
  handle_list_document_pressed: PropTypes.func.isRequired,
  handle_create_document_button: PropTypes.func.isRequired
};

Document.propTypes = {
  document_id: PropTypes.string,
  document_title: PropTypes.string,
  handle_change: PropTypes.func.isRequired,
  handle_save_button: PropTypes.func.isRequired,
  handle_create_document_button: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return { ...state.user };
};

export default connect(mapStateToProps, { userLogOut })(Workspace);
