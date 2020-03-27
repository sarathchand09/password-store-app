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

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      passwords: [],
      createCard: false,
      edit: [],
      cardSize: "col-md-5 col-xs-5 col-xl-5 col-sm-5 mt-5",
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
        this.setState({ passwords: data, searchText: "", editMode: false })
      )
      .catch(err => console.log(err));
  };

  update = data => {
    return fetch("/update", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
  };

  delete = id => {
    fetch("/delete/" + id, { method: "delete" }).then(() =>
      this.getPasswords()
    );
  };

  handleSearch = text => {
    if (!text || text.trim().length === 0) {
      this.getPasswords();
    } else {
      fetch("/search/" + text)
        .then(result => result.json())
        .then(passwords => this.setState({ passwords: passwords }));
    }
  };

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
    this.setState({ updateMode: true });
  };

  creatCardDialogue = () => {
    this.setState({ createCard: !this.state.createCard });
  };

  editMode = key => {
    const editedCards = this.state.edit;
    editedCards.splice(editedCards.indexOf(key));
    this.setState({ edit: editedCards });
  };

  darkThemeClass = () => {
    return this.state.darkTheme ? 'dark-theme' : '';
  }

  render() {
    return (
      <div className={`pl-4 pr-4  ${this.darkThemeClass()}`}>
        <div className="row mt-5 ml-1 relative">
          <Search onSearch={this.handleSearch}></Search>
          <div>
            <span
              className="fa fa-sign-in icon-create"
              aria-hidden="true"
              onClick={this.creatCardDialogue}
            />
          </div>

          <div className="switch">
            <Switch
              checked={this.state.darkTheme}
              onClick={this.handleChange}
              name="Dark Theme"
              color="secondary"
            />
          </div>
        </div>

        <div> {this.state.createCard ? this.createPasswordDialog() : ""}</div>

        <div className="row mb-4">
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
    this.setState({ darkTheme: !this.state.darkTheme });
  };

  updateCard = (index, password) => {
    return (
      <UpdateCard
        onUpdate={this.updatePassword}
        containerSize={this.state.cardSize}
        userData={password}
        cancel={this.editMode}
        darkTheme={this.darkThemeClass()}
        key={index}
        id={index}
      ></UpdateCard>
    );
  };

  showPasswordCard = (index, password) => {
    return (
      <PasswordCard
        userData={password}
        containerSize={this.state.cardSize}
        editExistingCard={this.editExistingCard}
        deleteCard={this.delete}
        darkTheme={this.darkThemeClass()}
        key={index}
        id={index}
      ></PasswordCard>
    );
  };

  createPasswordDialog = () => {
    return (
      <Dialog open={true}>
        <DialogTitle className={this.darkThemeClass()}>Create Password</DialogTitle>
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
