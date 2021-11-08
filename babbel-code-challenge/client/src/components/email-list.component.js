import React, { Component } from "react";
import EmailDataService from "../services/email.service";

export default class EmailList extends Component {
  constructor(props) {
    super(props);
    this.retrieveEmails = this.retrieveEmails.bind(this);
    this.refreshList = this.refreshList.bind(this);

    this.state = {
      emails: [],
      currentIndex: -1,
    };
  }

  componentDidMount() {
    this.retrieveEmails();
  }

  retrieveEmails() {
    EmailDataService.getAll()
      .then(response => {
        this.setState({
          emails: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveEmails();
    this.setState({
      currentIndex: -1
    });
  }

  render() {
    const { emails, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-6">
          <h4>Email List</h4>

          <ul className="list-group">
            {emails &&
              emails.map((item, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  key={index}
                >
                  {item.email}
                </li>
              ))}
          </ul>
        </div>
      </div>
    );
  }
}
