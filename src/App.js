import React from 'react';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'font-awesome/css/font-awesome.min.css';
import Search from './search/search.js';
import PasswordCard from './password-card/card.js';
import UpdateCard from './update-card/update-card.js';

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      passwords: [],
      editMode: false,
      edit: [],
      updateMode: false,
    }
  }

  componentDidMount() {
    this.getPasswords();
  }

  getPasswords = () => {
    fetch('http://localhost:5000/passwords')
    .then((result) => result.json())
    .then(data => this.setState(
        {passwords: data, searchText: '', editMode: false}));
  };

  update = (data) => {
    return fetch('http://localhost:5000/update', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    })
  };

  delete = (id) => {
    fetch('http://localhost:5000/delete/' + id, {method: 'delete'})
    .then(() => this.getPasswords());
  };

  handleSearch = (text) => {
    fetch('http://localhost:5000/search/' + text)
    .then((result) => result.json())
    .then((passwords) => this.setState({passwords: passwords}))
  };

  updatePassword = (updatedData, key) => {
    this.update(updatedData)
    .then(() => this.getPasswords());
    this.editMode(key);
  };

  render() {
    let editState = {
      title: '',
      username: '',
      password: '',
      lastUpdated: '',
      description: ''
    };
    let updateCard;
    let editMode = this.state.editMode;
    if (editMode) {
      updateCard =
          <UpdateCard onUpdate={this.updatePassword} userData={editState}
                      cancel={this.editMode}></UpdateCard>
    }
    return (
        <div className="pl-4 pr-4 window">
          <div className="row mt-5 ml-1">
            <Search onSearch={this.handleSearch}></Search>
            <div className="search-bar">
              <span className="fa fa-sign-in icon-create" aria-hidden="true"
                    onClick={this.editMode}></span>
            </div>
          </div>
          <div className="row mb-4">
            {updateCard}
            {
              this.state.passwords
              .map((password, index) => {
                if (this.state.edit.some((found) => found == index)) {
                  return <UpdateCard onUpdate={this.updatePassword}
                                     userData={password} cancel={this.editMode}
                                     key={index} id={index}></UpdateCard>
                }
                return <PasswordCard userData={password}
                                     editExistingCard={this.editExistingCard}
                                     deleteCard={this.delete}
                                     key={index} id={index}></PasswordCard>

              })
            }
          </div>
        </div>
    );
  }

  editExistingCard = (index) => {
    this.state.edit.push(index);
    this.setState({updateMode: true});
  };

  editMode = (key) => {
    let indexS = 0;
    if (this.state.updateMode) {
      this.state.edit.map((val, index) => {
        if (val == key) {
          indexS = index;
        }
      });
      delete this.state.edit[indexS];
      console.log(indexS);
      console.log(this.state.edit);
      if (this.state.edit.length >= 1) {
        this.setState({updateMode: true});
      }
      else {
        this.setState(
            {updateMode: false});
      }
    }
    else {
      this.setState({editMode: !this.state.editMode});
    }
  }

}

export default App;
