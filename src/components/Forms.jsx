// Filename: Forms.jsx
import React from 'react';
import { Form } from 'react-bootstrap';
import { iconList } from '../data/iconData.js';

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
        show = false,
        toggleIcon = null,
        style={},
        ...rest
    } = props;

    const isPassword = type === 'password';

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
                {required && <Form.Label className="fw-bold mb-0 text-danger"> * </Form.Label>}
            </div>

            {/* Input form wrapper */}
            <div className="position-relative">
                <Form.Control
                    type={isPassword && show ? 'text' : type}
                    placeholder={placeholder}
                    className="custom-textInput"
                    {...rest}
                    style={isPassword ? { paddingRight: '40px' } : {}}
                />

                {/* Eye Icon (inside input password) */}
                {isPassword && toggleIcon && (
                    <div
                        className="position-absolute top-50 translate-middle-y"
                        style={{
                            right: '10px',
                            cursor: 'pointer',
                        }}
                        onClick={toggleIcon}
                    >
                        <img
                            src={
                                show
                                ? iconList.find((i) => i.label === 'Eye Icon')?.src
                                : iconList.find((i) => i.label === 'Eye Off Icon')?.src
                            }
                            alt="Toggle visibility"
                            width="20"
                            height="20"
                        />
                    </div>
                )}
            </div>
        </Form.Group>
    );
};
