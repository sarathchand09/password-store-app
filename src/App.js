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
      searchText: '',
      passwords: [],
      editMode: false
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
    fetch('http://localhost:5000/delete/' + id,{method:'delete'})
    .then(() => this.getPasswords());
  };

  handleSearch = (text) => this.setState(
      {searchText: text, passwords: this.state.passwords});

  updatePassword = (updatedData) => {
    this.update(updatedData)
    .then(() => this.getPasswords());
    this.editMode();
  };

  render() {
    let updateCard;
    let editMode = this.state.editMode;
    if (editMode) {
      updateCard = <UpdateCard onUpdate={this.updatePassword} cancel={this.editMode}></UpdateCard>
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
              .filter(
                  password => password.title.includes(this.state.searchText))
              .map((password, index) => <PasswordCard userData={password} deleteCard={this.delete}
                                                      key={index}></PasswordCard>)
            }
          </div>
        </div>
    );
  }

  editMode = () => {
    this.setState({editMode: !this.state.editMode});
  }

}

export default App;
