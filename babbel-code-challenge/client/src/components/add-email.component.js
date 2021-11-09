import React, { Component } from "react";
import EmailDataService from "../services/email.service";

export default class AddEmail extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDomain = this.onChangeDomain.bind(this);
    this.saveGeneratedEmail = this.saveGeneratedEmail.bind(this);
    this.newEmail = this.newEmail.bind(this);

    this.state = {
      id: null,
      name: "",
      domain: "", 
      email: "",
      generated: false
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeDomain(e) {
    this.setState({
      domain: e.target.value
    });
  }

  getInitials (name) {
    let initials = name.split(' ');
    if(initials.length > 1) {
      initials = initials.shift().charAt(0) + initials.pop();
    } else {
      initials = name.substring(0, 2);
    }
    
    return initials.toLowerCase();
  }

  async saveGeneratedEmail() {
    let firstNameLastName = ""
    let nameInitialLastName = ""
    let generatedEmail
    if (this.state.domain && this.state.name) {
      firstNameLastName = this.state.name.split(' ').shift().toLowerCase() + this.state.name.split(' ').pop().toLowerCase() + '@' + this.state.domain
      nameInitialLastName = this.getInitials(this.state.name) + '@' + this.state.domain
    }
    const validate = await EmailDataService.checkEmail(firstNameLastName)

    if (validate.data.response.status === 0) {
      const validateAgain = await EmailDataService.checkEmail(nameInitialLastName)
      
      if (validateAgain.data.response.status === 0) {
        alert("The gerenated email ID is not present in mail box")
      } else {
          generatedEmail = nameInitialLastName
      }
    } else {
      generatedEmail = firstNameLastName
    }

    // async check the email
    var data = {
      name: this.state.name,
      domain: this.state.domain,
      email: generatedEmail
    };
    
    EmailDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          domain: response.data.domain,
          email: response.data.email,
          generated: true
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  newEmail() {
    this.setState({
      id: null,
      name: "",
      domain: "",
      email: "",
      generated: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.generated ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newEmail}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={this.state.name}
                onChange={this.onChangeName}
                name="name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="domain">Domain</label>
              <input
                type="text"
                className="form-control"
                id="domain"
                required
                value={this.state.domain}
                onChange={this.onChangeDomain}
                name="domain"
              />
            </div>

            <button onClick={this.saveGeneratedEmail} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
