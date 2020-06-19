import React from "react";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "font-awesome/css/font-awesome.min.css";
import Search from "./search/search.js";
import PasswordCard from "./password-card/card.js";
import UpdateCard from "./update-card/update-card.js";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Switch from "@material-ui/core/Switch";
import services from './services';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            passwords: [],
            createCard: false,
            edit: [],
            cardSize: "mt-5 mr-2",
            darkTheme: false
        };
    }

    componentDidMount() {
        services.getPasswords.call(this);
    }

    delete = id => {
        services.deletePassword.call(this, id);
    };

    updateAndGet = updatedData => {
        return services.update(updatedData).then(() => services.getPasswords.call(this));
    };

    updatePassword = (updatedData, key) => {
        this.updateAndGet(updatedData).then(() => this.editMode(key));
    };

    createPassword = (updatedData, key) => {
        this.updateAndGet(updatedData).then(() => this.creatCardDialogue());
    };

    editExistingCard = index => {
        this.state.edit.push(index);
        this.setState({updateMode: true});
    };

    creatCardDialogue = () => {
        this.setState({
            createCard: !this.state.createCard
        });
    };

    editMode = key => {
        const editedCards = this.state.edit;
        editedCards.splice(editedCards.indexOf(key));
        this.setState({edit: editedCards});
    };

    darkThemeClass = () => {
        return this.state.darkTheme ? "dark-theme" : "";
    };

    render() {
        return (
            <div className={`pl-4 pr-4  ${this.darkThemeClass()}`}>

                <div className="actions mt-5">

                    <Search onSearch={services.handleSearch.bind(this)}/>

                    <span
                        className="fa fa-sign-in icon-create"
                        aria-hidden="true"
                        onClick={this.creatCardDialogue}/>

                    <Switch
                        checked={this.state.darkTheme}
                        onClick={this.handleChange}
                        name="Dark Theme"
                        color="secondary"/>
                </div>

                {this.state.createCard ? this.createPasswordDialog() : ""}

                <div className="passwordCard">
                    {this.state.passwords.map((password, index) =>
                        this.state.edit.some(found => found === index)
                            ? this.updateCard(index, password)
                            : this.showPasswordCard(index, password)
                    )}
                </div>

            </div>
        );
    }

    handleChange = event => {
        this.setState({
            darkTheme: !this.state.darkTheme
        });
        document.getElementsByTagName("html")[0].style.backgroundColor = this.state
            .darkTheme
            ? "white"
            : "rgba(50, 62, 75, 0.87)";
    };

    updateCard = (index, password) => {
        return (
            <UpdateCard
                onUpdate={this.updatePassword}
                userData={password}
                cancel={this.editMode}
                darkTheme={this.darkThemeClass()}
                containerSize={this.state.cardSize}
                key={index}
                id={index}
            ></UpdateCard>
        );
    };

    showPasswordCard = (index, password) => {
        return (
            <PasswordCard
                userData={password}
                editExistingCard={this.editExistingCard}
                deleteCard={this.delete}
                darkTheme={this.darkThemeClass()}
                containerSize={this.state.cardSize}
                key={index}
                id={index}
            ></PasswordCard>
        );
    };

    createPasswordDialog = () => {
        return (
            <Dialog open={true}>
                <DialogTitle className={this.darkThemeClass()}>
                    Create Password
                </DialogTitle>
                <DialogContent className={this.darkThemeClass()}>
                    <UpdateCard
                        onUpdate={this.createPassword}
                        cancel={this.creatCardDialogue}
                        darkTheme={this.darkThemeClass()}
                        margin="mb-4 ml-4 mr-4"
                    ></UpdateCard>
                </DialogContent>
            </Dialog>
        );
    };
}

export default App;
