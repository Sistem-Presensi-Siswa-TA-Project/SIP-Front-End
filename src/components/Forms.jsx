// Filename: Forms.jsx
import React, { useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { iconList } from '../data/iconData.js';

/**
 * Komponen FormInput
 * @param {string} label - Label untuk input
 * @param {string} name - Nama field input
 * @param {string} value - Nilai input
 * @param {function} onChange - Fungsi untuk menangani perubahan input
 * @param {boolean} disabled - Apakah input nonaktif
 * @param {string} placeholder - Placeholder opsional
*/

export const FormInput = (props) => {
    const {
        label = 'Label',
        type = 'text',
        name,
        value,
        onChange,
        disabled = false,
        readOnly = false,
        required = false,
        placeholder = '',
        ...rest
    } = props;

    const isPhoneField = name === 'hp';
    const isPassword = type === 'password';
    const [showPassword, setShowPassword] = useState(false);

    const handlePhoneChange = (e) => {
        const inputValue = e.target.value;
        if (/^[1-9][0-9]*$/.test(inputValue) || inputValue === '') {
            onChange(e); // hanya update jika bukan dimulai 0
        }
    };

    return (
        <Form.Group className="mb-3" controlId={name} {...rest}>
            <Form.Label className="custom-formLabel" style={{ fontSize: '14px', marginBottom: '12px' }}>
                {label}
                {required && <span className="text-danger"> * </span>}
            </Form.Label>

            {isPhoneField ? (
                // === Input khusus untuk nomor HP dengan prefix +62 ===
                <InputGroup>
                    <InputGroup.Text
                        style={{
                            backgroundColor: '#D6D6D6',
                            color: '#000',
                            fontWeight: 'bold',
                            fontSize: '14px',
                            border: '1px solid #333',
                            borderRight: 'none',
                            boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.25)',
                            borderRadius: '4px 0 0 4px',
                        }}
                    >
                        +62
                    </InputGroup.Text>

                    <Form.Control
                        className="custom-formInput"
                        type="tel"
                        name={name}
                        value={value}
                        onChange={handlePhoneChange}
                        required={required}
                        disabled={disabled}
                        readOnly={readOnly}
                        placeholder={placeholder}
                        style={{
                            fontSize: '14px',
                            borderRadius: '0 4px 4px 0',
                            borderLeft: 'none',
                        }}
                        {...rest}
                    />
                </InputGroup>
            ) : isPassword ? (
                // === Input password dengan toggle visibility ===
                <div className="position-relative">
                    <Form.Control
                        className="custom-formInput"
                        type={showPassword ? 'text' : 'password'}
                        name={name}
                        value={value}
                        onChange={onChange}
                        required={required}
                        disabled={disabled}
                        readOnly={readOnly}
                        placeholder={placeholder}
                        style={{ fontSize: '14px', paddingRight: '40px' }}
                        {...rest}
                    />

                    <div
                        className="position-absolute top-50 translate-middle-y"
                        style={{ right: '12px', cursor: 'pointer' }}
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        <img
                            src={
                                showPassword
                                    ? iconList.find((i) => i.label === 'Eye Icon')?.src
                                    : iconList.find((i) => i.label === 'Eye Off Icon')?.src
                            }
                            alt="Toggle password"
                            width="20"
                            height="20"
                        />
                    </div>
                </div>
            ) : (
                // === Input biasa ===
                <Form.Control
                    className={`custom-formInput ${readOnly ? 'readonly-input' : ''}`}
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    required={required}
                    disabled={disabled}
                    readOnly={readOnly}
                    placeholder={placeholder}
                    style={{ fontSize: '14px' }}
                    {...rest}
                />
            )}
        </Form.Group>
    );
};

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
                    style={isPassword ? { paddingRight: '40px' } : {}}
                    {...rest}
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