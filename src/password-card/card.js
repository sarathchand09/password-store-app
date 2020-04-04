import './card.scss';
import React, {Component} from 'react';

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
        return (
            <div className={this.props.containerSize}>
                <div className="card">

                    <div className={`card-body  ${this.props.darkTheme}`}>

                        <h5 className="card-title" id="title">{this.props.userData.title}
                            <span className="fa fa-trash pull-right curser" onClick={this.delete}/>
                            <span className="fa fa-edit pull-right curser" onClick={this.edit}/>
                        </h5>

                        <div className="card-text">
                            <span id="username">  username : {this.props.userData.username}</span>
                            <span>
              password : {this.state.showPassword ? this.props.userData.password : '******'}
                                <button className="btn"
                                   onClick={this.showPassword}>{this.state.showPassword ? 'Hide' : 'Show'}</button>
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
