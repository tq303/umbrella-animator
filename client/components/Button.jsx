import React from 'react'

const Btn = ({
    className,
    disabled = false,
    onClick
}) => (
    <button onClick={ e => { e.preventDefault(); onClick() } } disabled={ disabled }><i className={ className }></i></button>
)

export default Btn
