import React, {Component} from 'react';
import './update-card.scss';
class UpdateCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: props.userData.title,
      username: props.userData.username,
      password: props.userData.password,
      lastUpdated: props.userData.lastUpdated,
      description: props.userData.description,
      _id:props.userData._id
    };
  }

  update = () => this.props.onUpdate(this.state,this.props.id);

  render() {

    return (
        <div className="col-md-5 col-xs-5 col-xl-5 col-sm-5">
          <div className="card mt-5">
            <div className="card-body">
              <input className="card-title" id="title" value={this.state.title}
                     placeholder='title'
                     onChange={(eve) => this.setState(
                         {title: eve.target.value})}></input>
              <span className="icon-cancel fa fa-times fa-lg pull-right " onClick={()=> this.props.cancel()}></span>
              <span className="icon-save fa fa-check fa-lg pull-right " onClick={this.update}></span>
              <div className="card-text">
                <div className="mt-2">
                  <input id="username" value={this.state.username}
                         placeholder='username'
                         onChange={(eve) => this.setState(
                             {username: eve.target.value})}></input>
                </div>
                <div className="mt-2">
                  <input id="password" value={this.state.password}
                         placeholder='password'
                         onChange={(eve) => this.setState(
                             {password: eve.target.value})}></input>
                </div>
                <div className="mt-2">
                  <input
                      id="description" value={this.state.description}
                      placeholder='description'
                      onChange={(eve) => this.setState(
                          {description: eve.target.value})}></input>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default UpdateCard;
