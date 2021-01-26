import PropTypes from 'prop-types';

export default function Button({type, children, onClick}) {
    return (
        <button type={type} onClick={onClick}>{children}</button>
    )
}



Button.propTypes = {
    type: PropTypes.string.isRequired,
    children: PropTypes.string.isRequired,
    onClick: PropTypes.func,
}