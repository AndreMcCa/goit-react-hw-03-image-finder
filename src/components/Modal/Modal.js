import React, { Component } from 'react';
import {createPortal} from 'react-dom';
import PropTypes from 'prop-types';

import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);        
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown = (e) => {
        if(e.code === 'Escape') {
            this.props.onClose()
        }
    }

    handleClickBackdrop = (e) => {
        if(e.target === e.currentTarget) {
            this.props.onClose()
        }
    }

    render() {
        const { children } = this.props;

        return createPortal(
            <div className={s.ModalBackdrop} onClick={this.handleClickBackdrop}>
                <div className={s.ModalContent}>
                    {children}  
                </div>
            </div>, modalRoot
        )
    }
}

Modal.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.object,), PropTypes.element]),
    onClose: PropTypes.func,
}
