import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import Loader from 'react-loader-spinner';
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";
import { IoMdClose } from "react-icons/io"
import { AiOutlineArrowUp } from 'react-icons/ai';
import 'react-toastify/dist/ReactToastify.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

import ImageGalleryItem from "../ImageGalleryItem";
import Modal from '../Modal/Modal';
import Button from '../Button';

import fetchArticles from '../../services/servicesApi';
import s from "./ImageGallery.module.css";
 
const STATUS = {
    IDLE: 'idle',
    PENDING: 'pending',
    RESOLVED: 'resolved',
    REJECTED: 'rejected',
}

export default class ImageGallery extends Component {
    state = {
        response: [],
        error: null,
        page: 1,
        currentSearch: '',
        status: 'idle',
        largeImageURL: '',

    }

    componentDidUpdate(prevProps, prevState) {

        const {searchQuery} = this.props;
        const {page, status, error} = this.state;

            if(status === STATUS.REJECTED) {
                toast.error(`${error}`)
                this.setState({status: STATUS.IDLE})
            }

        if(prevProps.searchQuery !== this.props.searchQuery) {
            this.setState({currentSearch: searchQuery, response: [], page: 1})
        }

        if(prevState.currentSearch !== this.state.currentSearch) {
            this.performerFetch(searchQuery, page)
        }
    }

    performerFetch(searchQuery, page) {

        this.setState({status: STATUS.PENDING})

        setTimeout(() => {
            fetchArticles(searchQuery, page).then(r => this.setState(prevState => ({response: [...prevState.response, ...r], page: prevState.page + 1, status: STATUS.RESOLVED})))
            .catch(errorMsg => this.setState({error: errorMsg, status: STATUS.REJECTED}));
        }, 500);

    }

    onLoadMore = () => {
        const {searchQuery} = this.props;
        const {page} = this.state;

        this.performerFetch(searchQuery, page)
    }

    onShowLargeImgModal = (e) => {
       if(e.target.nodeName !== 'IMG') {
           return
       }

       const largeImage = e.target.getAttribute('data-largeimg');
       this.setState({largeImageURL: largeImage});
    }

    onCloseModal = () => {
        this.setState({largeImageURL: ''})
    }

    render () {

        const { status, response, largeImageURL } = this.state;
   
        return (
        <div>
            {/* =========================== Gallery =========================== */}

             <ul className={s.ImageGallery} onClick={this.onShowLargeImgModal}>
             
                {status !== STATUS.IDLE && 

                <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 750: 2}}>
                    <Masonry gutter='30px'>
                        {response.map(item => <ImageGalleryItem item={item}/>)}
                    </Masonry> 
                </ResponsiveMasonry>
                    
                }

            </ul>

            {/* =========================== Load More =========================== */}

            {status === STATUS.RESOLVED &&  
            <>
                <div className={s.LoarMoreBox}>
                    <Button className={s.LoadMore} type='button' children="Load More" onClick={this.onLoadMore}/>  
                </div>          
                <a href="#form" className={s.ToBeginning }><AiOutlineArrowUp size={'30px'} color={'#ffffff'} /></a>
            </>     
            }

            {/* =========================== Loader =========================== */}

            {status === STATUS.PENDING && 
                <Modal>
                    <Loader className={s.Loader} type="Hearts" color="#00BFFF" height={80} width={80} />
                </Modal>
            }

            {/* =========================== Large Image =========================== */}

            {largeImageURL !== '' && 
                <Modal onClose={this.onCloseModal}>
                    <img src={largeImageURL}></img>
                    <Button className={s.CloseModal} type='button' onClick={this.onCloseModal} children={<IoMdClose size={'30px'} color={'#ffffff'}/>}/>
                </Modal>
            }

        </div>)
    }
}

ImageGallery.propTypes = {
    searchQuery: PropTypes.string.isRequired,
}

// ============================================== prev Version =========================================== >

// componentDidUpdate(prevProps, prevState) {

//     const { status, error } = this.state;

//     if(status === STATUS.REJECTED) {

//         toast.error(`${error}`)
//         this.setState({status: STATUS.IDLE})
//     }

//     if(prevProps.searchQuery !== this.props.searchQuery) {
//         this.setState({ response: [], page: 1})
//     }

//     if(prevProps.searchQuery !== this.props.searchQuery || prevState.page !== this.state.page) {

//         this.setState({status: STATUS.PENDING});

//         setTimeout(() => {
//             fetchArticles(this.props.searchQuery, this.state.page)
//             .then(r => this.setState(prevState => ({response: [...prevState.response, ...r], status: STATUS.RESOLVED})))
//             .catch(errorMsg => this.setState({error: errorMsg, status: STATUS.REJECTED}));
//         }, 300)
//     }
// }

// return (
//     <div>
//         {/* =========================== Gallery =========================== */}

//          <ul className={s.ImageGallery} onClick={this.onShowLargeImgModal}>
         
//             {status !== STATUS.IDLE && 

//             <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 750: 2}}>
//                 <Masonry gutter='30px'>
//                     {response.map(item => <ImageGalleryItem item={item}/>)}
//                 </Masonry> 
//             </ResponsiveMasonry>
                
//             }

//         </ul>

//         {/* =========================== Load More =========================== */}

//         {status === STATUS.RESOLVED &&  <LoadMore type='button' children="Load More" onClick={this.onLoadMore}/>}

//         {/* =========================== Loader =========================== */}

//         {status === STATUS.PENDING && 
//             <Modal>
//                 <Loader className={s.Loader} type="Hearts" color="#00BFFF" height={80} width={80} />
//             </Modal>
//         }

//         {/* =========================== Large Image =========================== */}

//         {largeImageURL !== '' && 
//             <Modal>
//                 <img src={largeImageURL}></img>
//                 <Button className={s.CloseModal} type='button' onClick={this.onCloseModal} children={<IoMdClose size={'50px'} color={'#ffffff'}/>}/>
//             </Modal>}

//     </div>)