import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Input from '../Input';
import Button from '../Button';

import s from './Form.module.css';

class Form extends Component {
    state = {
        value: '',
    }

    handleInputChange = e => {
        const inputValue = e.currentTarget.value;

        this.setState({value: inputValue.toLowerCase()})
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const { value } = this.state;

        if(value.trim() === '') {
            toast.warning('Вы ничего не ввели...');
            
            return
        }

        this.props.onSubmit(value);
        this.setState({value: ''})
    }

    render() {
        return (
            <form className={s.Form} id='form' onSubmit={this.handleSubmit}> 
                <Input className={s.Input} type='text' name='search' value={this.state.value} placeholder='Search images and photos' onChange={this.handleInputChange}/> 
                <Button className={s.Button} type='submit' children='Search' />
            </form>
        )
    }
}

export default Form;

Form.propTypes = {
    onSubmit: PropTypes.func.isRequired,  
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.object,), PropTypes.element,])  
}