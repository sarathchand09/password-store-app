import './card.scss';
import React, {Component} from 'react';
import PropTypes from 'prop-types';

class PasswordCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showPassword: false
    }
  }

  delete = () => this.props.deleteCard(this.props.userData._id);
  edit = () => this.props.editExistingCard(this.props.id);
  showPassword = () => this.setState({showPassword: !this.state.showPassword});

  render() {
    return (<div className="col-md-5 col-xs-5 col-xl-5 col-sm-5">
      <div className="card mt-5">

        <div className="card-body">

          <h5 className="card-title" id="title">{this.props.userData.title}
            <span className="fa fa-trash pull-right curser" onClick={this.delete}></span>
            <span className="fa fa-edit pull-right curser" onClick={this.edit}></span>
          </h5>

          <div className="card-text">
              <span id="username">  username : {this.props.userData.username}</span>
              <span>
              password : {this.state.showPassword ?this.props.userData.password : '******'}
              <a className="btn" onClick={this.showPassword}>{this.state.showPassword ?'Hide': 'Show'}</a>
              </span>

              <span id="lastUpdated">  last updated : {this.props.userData.lastUpdated}</span>
              <span id="description">  description : {this.props.userData.description}</span>

          </div>
        </div>
      </div>
    </div>);
  }
}

export default PasswordCard;
