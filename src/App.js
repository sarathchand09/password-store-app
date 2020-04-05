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
import saveAs from 'file-saver';

class App extends React.Component {
    constructor() {
        super();
        this.initState();
    }

    initState() {
        this.state = {
            passwords: [],
            createCard: false,
            edit: [],
            cardSize: "mt-5 card-container",
            showUploadPasswordDialog: false,
            uploadedFile: null,
            darkTheme: false
        };
    }

    componentDidMount() {
        this.getPasswords();
    }

    getPasswords = () => {
        fetch("/passwords")
            .then(result => result.json())
            .then(data =>
                this.setState({passwords: data, searchText: "", editMode: false})
            )
            .catch(err => console.log(err));
    };

    update = data => {
        return fetch("/update", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
    };

    delete = id => {
        fetch("/delete/" + id, {method: "delete"}).then(() =>
            this.getPasswords()
        );
    };

    deleteAll = () => {
        this.downloadPasswords()
            .then(() => fetch("/deleteAll", {method: "delete"}))
            .then(() => this.getPasswords());
    };

    handleSearch = text => {
        if (!text || text.trim().length === 0) {
            this.getPasswords();
        } else {
            fetch("/search/" + text)
                .then(result => result.json())
                .then(passwords => this.setState({passwords: passwords}));
        }
    };

    downloadPasswords = () => {
        return fetch("/passwords/download")
            .then(result => result.json())
            .then(passwords =>
                saveAs(new Blob([JSON.stringify(passwords)], {type: "text/plain;charset=utf-8"}), "password-store.txt")
            )
            .catch(err => console.log(err));
    }

    uploadPasswords = (content) => {
        fetch("/passwords/upload/", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: content
        }).then(() => this.getPasswords())
            .then(result => console.log(result));
    }

    updateAndGet = updatedData => {
        return this.update(updatedData).then(() => this.getPasswords());
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
        return this.state && this.state.darkTheme ? "dark-theme" : "";
    };

    render() {
        return (
            <div className={`pl-5 pr-2 ${this.darkThemeClass()}`}>
                <div className="actions mt-5">
                    <Search onSearch={this.handleSearch}/>

                    <span className="fa fa-sign-in icon-create"
                          aria-hidden="true"
                          onClick={this.creatCardDialogue}/>

                    <Switch checked={this.state.darkTheme}
                            onClick={this.handleChange}
                            name="Dark Theme"
                            color="secondary"/>

                    <span className="fa fa-2x fa-arrow-circle-down cursor" aria-hidden="true"
                          onClick={this.downloadPasswords}/>

                    <span className="fa fa-2x fa-arrow-circle-up cursor" aria-hidden="true"
                          onClick={() => this.setState({showUploadPasswordDialog: true})}/>

                    <span className="fa fa-2x fa-trash cursor" aria-hidden="true"
                          onClick={this.deleteAll}/>
                </div>

                {this.createPasswordDialog()}
                {this.uploadPasswordFileDialog()}

                <div className="passwordCard">
                    {this.state.passwords.map((password, index) =>
                        this.state.edit.some(found => found === index)
                            ? this.updateCard(index, password)
                            : this.showPasswordCard(index, password)
                    )} </div>
            </div>
        );
    }

    handleChange = () => {
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
            <UpdateCard onUpdate={this.updatePassword}
                        userData={password}
                        cancel={this.editMode}
                        darkTheme={this.darkThemeClass()}
                        containerSize={this.state.cardSize}
                        key={index}
                        id={index}/>
        );
    };

    showPasswordCard = (index, password) => {
        return (
            <PasswordCard userData={password}
                          editExistingCard={this.editExistingCard}
                          deleteCard={this.delete}
                          darkTheme={this.darkThemeClass()}
                          containerSize={this.state.cardSize}
                          key={index}
                          id={index}/>
        );
    };
    createPasswordDialog = () => {
        return (
            <Dialog open={this.state.createCard}>
                <DialogTitle className={this.darkThemeClass()}> Create Password </DialogTitle>
                <DialogContent className={this.darkThemeClass()}>
                    <UpdateCard onUpdate={this.createPassword}
                                cancel={this.creatCardDialogue}
                                darkTheme={this.darkThemeClass()}
                                margin="mb-4 ml-4 mr-4"/>
                </DialogContent>
            </Dialog>
        );
    };

    uploadPasswordFileDialog = () => {
        return (<Dialog open={this.state.showUploadPasswordDialog}>
            <DialogTitle className={this.darkThemeClass()}> Upload Password File
                <i className="fa fa-close pull-right cursor"
                   onClick={() => this.setState({showUploadPasswordDialog: false})}/>
                <i className="fa fa-upload pull-right cursor mr-1" onClick={() => this.upload()}/>
            </DialogTitle>
            <DialogContent className={this.darkThemeClass()}>
                <input type="file" className="mr-4 mb-4" onChange={this.onFileUploadHandler}/>
            </DialogContent>
        </Dialog>)
    }

    onFileUploadHandler = event => {
        this.setState({uploadedFile: event.target.files[0]})
    }

    upload = () => {
        let reader = new FileReader();
        reader.onload = (event) => {
            this.uploadPasswords(event.target.result);
            this.setState({showUploadPasswordDialog: false});
        }
        reader.readAsText(this.state.uploadedFile);
    }
}

export default App;
