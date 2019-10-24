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
            <span className="fa fa-trash pull-right icon-delete" onClick={this.delete}></span>
            <span className="fa fa-edit pull-right icon-delete" onClick={this.edit}></span>
          </h5>

          <div className="card-text">
            <div className="mt-2">
              username :
              <span id="username">{this.props.userData.username}</span>
            </div>
            <div className="mt-2">
              password : {
                this.state.showPassword
                  ? <span id="password">{this.props.userData.password}</span>
                  : <span class="passwordStar">******</span>
              }
              <a class="btn" onClick={this.showPassword}>show</a>
            </div>
            <div className="mt-2">
              last updated :
              <span id="lastUpdated">{this.props.userData.lastUpdated}</span>
            </div>
            <div className="mt-2">
              description :
              <span id="description">{this.props.userData.description}</span>
            </div>

          </div>
        </div>
      </div>
    </div>);
  }
}

PasswordCard.proptotype = {
  title: PropTypes.string,
  username: PropTypes.string,
  password: PropTypes.string,
  lastUpdated: PropTypes.string,
  description: PropTypes.string

}
export default PasswordCard;
