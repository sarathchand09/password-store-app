import './search.scss';
import React, {Component} from 'react';

class Search extends Component {

  search = () => this.props.onSearch(this.inputText.value);

  render() {
    return (
        <div className="col-9 search">
          <span className="fa fa-search icon-search" aria-hidden="true"></span>
          <input id="search" ref={(ref) => this.inputText = ref}
                 className="input-search" type="text"
                 onChange={this.search}></input>
        </div>
    );
  }
}

export default Search;
