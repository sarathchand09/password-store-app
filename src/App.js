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

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      passwords: [],
      createCard: false,
      edit: []
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
    fetch("/search/" + text)
      .then(result => result.json())
      .then(passwords => this.setState({ passwords: passwords }));
  };

  updateAndGet = updatedData => {
    this.update(updatedData).then(() => this.getPasswords());
  };

  updatePassword = (updatedData, key) => {
    this.updateAndGet(updatedData);
    this.editMode(key);
  };

  createPassword = (updatedData, key) => {
    this.updateAndGet(updatedData);
    this.createNewCard();
  };

  editExistingCard = index => {
    this.state.edit.push(index);
    this.setState({ updateMode: true });
  };

  createNewCard = () => {
    this.setState({ createCard: !this.state.createCard });
  };

  editMode = key => {
    const index = this.state.edit.findIndex(ele => ele === key);
    delete this.state.edit[index];
  };

  render() {
    return (
      <div className="pl-4 pr-4 window">
        <div className="row mt-5 ml-1">
          <Search onSearch={this.handleSearch}></Search>
          <div className="search-bar">
            <span
              className="fa fa-sign-in icon-create"
              aria-hidden="true"
              onClick={this.createNewCard}
            ></span>
          </div>
        </div>

        {this.state.createCard ? this.createPasswordDialog() : ""}

        <div className="row mb-4">
          {this.state.passwords.map((password, index) =>
            this.state.edit.some(found => found == index)
              ? this.updateCard(index, password)
              : this.showPasswordCard(index, password)
          )}
        </div>
      </div>
    );
  }

  updateCard = (index, password) => {
    return (
      <UpdateCard
        onUpdate={this.updatePassword}
        containerSize="col-md-5 col-xs-5 col-xl-5 col-sm-5 mt-5"
        userData={password}
        cancel={this.editMode}
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
        key={index}
        id={index}
      ></PasswordCard>
    );
  };

  createPasswordDialog = () => {
    return (
      <Dialog open={true}>
        <DialogTitle>Create Password</DialogTitle>
        <DialogContent>
          <UpdateCard
            onUpdate={this.createPassword}
            cancel={this.createNewCard}
          ></UpdateCard>
        </DialogContent>
      </Dialog>
    );
  };
}
export default App;
