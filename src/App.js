import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';

import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';


export default class App extends Component {

  state = {
    searchQuery: '',
  }

  handleFormSubmit = value => {
    this.setState({searchQuery: value})
  }

  render() {
    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery searchQuery={this.state.searchQuery}/>

        <ToastContainer position='top-right' autoClose={2500}/>
      </>
    )
  }
}
