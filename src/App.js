import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';

import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';


export default class App extends Component {

  state = {
    searchQuery: '',
  }

  handleFormSubmit = value => {
    this.setState({searchQuery: value, page: 1})
  }

  render() {
    const { searchQuery, page } = this.state;

    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery searchQuery={searchQuery}/>

        <ToastContainer position='top-right' autoClose={2500}/>
      </>
    )
  }
}
