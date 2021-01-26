import PropTypes from 'prop-types';

import Form from './Form'

export default function Searchbar({onSubmit}) {
    
    return (
        <header>
            <Form onSubmit={onSubmit}/>
        </header>
    )
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,    
}