// Filename: Forms.jsx
import React from 'react';
import { Form } from 'react-bootstrap';

export const TextInput = (props) => {
    const {
        label = '',
        required = false,
        type = 'text',
        placeholder = '',
        controlId = '',
        fontSize='15px',
        width = '310px',
        className = '',
        style={},
        ...rest
    } = props;

    return (
        <Form.Group 
            className={className} 
            style={{ 
                width, 
                fontSize,
                ...style, 
            }} 
            controlId={controlId} 
            {...rest}
        >
            {/* Label */}
            <div className="d-flex align-items-center mb-1">
                <Form.Label className="fw-bold mb-0"> {label} </Form.Label>
                {required && <span className="text-danger ms-1"> * </span>}
            </div>

            {/* Input */}
            <Form.Control
                type={type}
                placeholder={placeholder}
                className="custom-textInput"
            />

        </Form.Group>
    );
};
