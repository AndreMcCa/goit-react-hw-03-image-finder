import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ImageGalleryItem from "./ImageGalleryItem";
import LoadMore from './Button';

import fetchArticles from '../services/servicesApi';
 
const STATUS = {
    IDLE: 'idle',
    PENDING: 'pending',
    RESOLVED: 'resolved',
    REJECTED: 'rejected',
    // PRIMARY: 'primary',
    // SUBSEQUENT: 'subsequent',

}

export default class ImageGallery extends Component {
    state = {
        response: [],
        error: null,
        page: 1,
        status: 'idle',
        // currentSearchQueryState: '',
    }

    componentDidUpdate(prevProps, prevState) {

        if(prevProps.searchQuery !== this.props.searchQuery) {
            this.setState({response: [], page: 1, status: STATUS.PENDING})            
        }

        if(prevProps.searchQuery !== this.props.searchQuery || prevState.page !== this.state.page) {
            fetchArticles(this.props.searchQuery, this.state.page).then(r => this.setState(prevState => ({response: [...prevState.response, ...r], status: STATUS.RESOLVED})))
        }
    }

    onLoadMore = () => {
        this.setState(prevState => ({page: prevState.page + 1}))
    }

    render () {

        const { status, response, onLoadMore } = this.state;

        return (
        <div>
             <ol className="ImageGallery">
                {(status !== 'idle' && status !== 'pending') && response.map(item => <ImageGalleryItem item={item} />)}          
            </ol>

            {status === 'resolved' &&  <LoadMore type='button' children="Load More" onClick={this.onLoadMore}/>}
        </div>)
    }
}



// if(prevProps.searchQuery !== this.props.searchQuery) {
//     this.setState({currentSearchQuery: this.props.searchQuery, page: 1, response: []})
// }

// if(prevProps.searchQuery !== this.state.currentSearchQuery || prevState.page !== this.state.page) {
//     fetchArticles(this.props.searchQuery, this.state.page)
//     .then(r => this.setState(prevState => ({response: [...prevState.response, ...r.hits], status: STATUS.RESOLVED})))
//     .catch(errorMsg => this.setState({error: errorMsg, status: STATUS.REJECTED}));
// }