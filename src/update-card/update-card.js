import React, {Component} from "react";
import "./update-card.scss";

class UpdateCard extends Component {
    constructor(props) {
        super(props);
        const data = props.userData || {};
        this.state = {
            title: data.title,
            username: data.username,
            password: data.password,
            lastUpdated: data.lastUpdated,
            description: data.description,
            _id: data._id
        };
    }

    update = () => this.props.onUpdate(this.state, this.props.id);

    titleChanged = eve => this.setState({title: eve.target.value});
    usernameChanged = eve => this.setState({username: eve.target.value});
    passwordChanged = eve => this.setState({password: eve.target.value});
    descriptionChanged = eve => this.setState({description: eve.target.value});

    render() {
        return (
            <div className={this.props.containerSize}>
                <div className={`card ${this.props.margin}`}>
                    <div className={`card-body ${this.props.darkTheme}`}>
                        <div>
                            <input className="card-title"
                                   id="title"
                                   value={this.state.title}
                                   placeholder="title"
                                   onChange={this.titleChanged}/>

                            <i className="icon-cancel fa fa-times fa-lg pull-right"
                               onClick={() => this.props.cancel(this.props.id)}/>
                            <i className="icon-save fa fa-check fa-lg pull-right "
                               onClick={this.update}/>
                        </div>

                        <input id="username"
                               value={this.state.username}
                               placeholder="username"
                               onChange={this.usernameChanged}/>

                        <input id="password"
                               value={this.state.password}
                               placeholder="password"
                               onChange={this.passwordChanged}/>

                        <input id="description"
                               value={this.state.description}
                               placeholder="description"
                               onChange={this.descriptionChanged}/>
                    </div>
                </div>
            </div>);
    }
}

export default UpdateCard;
