import React, { Component } from "react";
import "./update-card.scss";
class UpdateCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: props.userData.title,
      username: props.userData.username,
      password: props.userData.password,
      lastUpdated: props.userData.lastUpdated,
      description: props.userData.description,
      _id: props.userData._id
    };
  }

  update = () => this.props.onUpdate(this.state, this.props.id);

  titleChanged = eve => this.setState({ title: eve.target.value });
  usernameChanged = eve => this.setState({ username: eve.target.value });
  passwordChanged = eve => this.setState({ password: eve.target.value });
  descriptionChanged = eve => this.setState({ description: eve.target.value });

  render() {
    return (
      <div className="col-md-5 col-xs-5 col-xl-5 col-sm-5">
        <div className="card mt-5">
          <div className="card-body">

            <div>
              <input
                className="card-title"
                id="title"
                value={this.state.title}
                placeholder="title"
                onChange={this.titleChanged}></input>

              <i className="icon-cancel fa fa-times fa-lg pull-right "
                onClick={() => this.props.cancel()} ></i>
              <i  className="icon-save fa fa-check fa-lg pull-right "
                onClick={this.update} ></i>
            </div>

            <input
              id="username"
              value={this.state.username}
              placeholder="username"
              onChange={this.usernameChanged}></input>
            <input
              id="password"
              value={this.state.password}
              placeholder="password"
              onChange={this.passwordChanged}></input>
            <input
              id="description"
              value={this.state.description}
              placeholder="description"
              onChange={this.descriptionChanged}></input>

          </div>
        </div>
      </div>
    );
  }
}

export default UpdateCard;
