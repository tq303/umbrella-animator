import React from 'react'

const Btn = ({
    className,
    disabled = false
}) => (
    <button disabled={ disabled }><i className={ className }></i></button>
)

export default Btn
