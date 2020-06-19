import './card.scss';
import React, {useState} from 'react';


const PasswordCard = (props) => {
    const [state, setState] = useState({showPassword: false})
    return (
        <div className={props.containerSize}>
            <div className="card">

                <div className={`card-body  ${props.darkTheme}`}>

                    <h5 className="card-title" id="title">{props.userData.title}
                        <span className="fa fa-trash pull-right curser"
                              onClick={() => props.deleteCard(props.userData._id)}>

                        </span>
                        <span className="fa fa-edit pull-right curser"
                              onClick={() => props.editExistingCard(props.id)}>

                        </span>
                    </h5>

                    <div className="card-text">
                        <span id="username">  username : {props.userData.username}</span>
                        <span>
              password : {state.showPassword ? props.userData.password : '******'}
                            <a className="btn"
                               onClick={() => setState({showPassword: !state.showPassword})}>
                                {state.showPassword ? 'Hide' : 'Show'}
                            </a>
                        </span>
                        <span id="lastUpdated">  last updated : {props.userData.lastUpdated}</span>
                        <span id="description">  description : {props.userData.description}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default React.memo(PasswordCard);
