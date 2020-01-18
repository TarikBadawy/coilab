import React, { Component } from "react";
import Document from "./Document";

class Workspace extends Component {
  render() {
    return (
      <div className="d-flex">
        <nav className="d-none d-md-block p-3 border-right vh-100">
          <DocumentList />
        </nav>
        <main className="p-3 mx-auto">
          <Document />
        </main>
      </div>
    );
  }
}

class DocumentList extends Component {
  render() {
    let example = (
      <button className="list-group-item list-group-item-action">
        ABCDEFGHI
      </button>
    );

    return (
      <ul className="list-group">
        <li className="list-group-item">{example}</li>
        <li className="list-group-item">
          <button className="list-group-item list-group-item-action bg-secondary text-light">
            new document
          </button>
        </li>
      </ul>
    );
  }
}

export default Workspace;
