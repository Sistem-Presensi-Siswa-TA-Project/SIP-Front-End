// Filename: Button.jsx
import React, { useState } from 'react';
import { Button as BootstrapButton } from 'react-bootstrap';

export const PrimaryButton = (props) => {
    const {
        children = 'Click Here',
        variant = 'primary',
        onClick,
        className = '',
        type = 'button',
        width = '100px',
        height = '40px',
        fontSize = '14px',
        style = {},
        ...rest
    } = props;

    return (
        <BootstrapButton
            variant={variant}
            type={type}
            className={className}
            onClick={onClick}
            style={{
                width,
                height,
                fontSize,
                ...style,
            }}
            {...rest}
        >
            {children}
        </BootstrapButton>
    );
};

export const SecondaryButton = (props) => {
    const {
        children = 'Click Here',
        variant = 'secondary',
        onClick,
        className = '',
        type = 'button',
        width = '100px',
        height = '40px',
        fontSize = '14px',
        style = {},
        ...rest
    } = props;

    return (
        <BootstrapButton
            variant={variant}
            type={type}
            className={className}
            onClick={onClick}
            style={{
                width,
                height,
                fontSize,
                ...style,
            }}
            {...rest}
        >
            {children}
        </BootstrapButton>
    );
};

export const SuccessButton = (props) => {
    const {
        children = 'Click Here',
        variant = 'success',
        onClick,
        className = '',
        type = 'button',
        width = '100px',
        height = '40px',
        fontSize = '14px',
        style = {},
        ...rest
    } = props;

    return (
        <BootstrapButton
            variant={variant}
            type={type}
            className={className}
            onClick={onClick}
            style={{
                width,
                height,
                fontSize,
                ...style,
            }}
            {...rest}
        >
            {children}
        </BootstrapButton>
    );
};

export const DangerButton = (props) => {
    const {
        children = 'Click Here',
        variant = 'danger',
        onClick,
        className = '',
        type = 'button',
        width = '100px',
        height = '40px',
        textSize = '14px',
        style = {},
        ...rest
    } = props;

    return (
        <BootstrapButton
            variant={variant}
            type={type}
            className={className}
            onClick={onClick}
            style={{
                width: width,
                height: height,
                fontSize: textSize,
                ...style,
            }}
            {...rest}
        >
            {children}
        </BootstrapButton>
    );
};

export const LightButton = (props) => {
    const {
        children = 'Click Here',
        variant = 'light',
        onClick,
        className = '',
        type = 'button',
        width = '100px',
        height = '40px',
        textSize = '14px',
        style = {},
        ...rest
    } = props;

    return (
        <BootstrapButton
            variant={variant}
            type={type}
            className={className}
            onClick={onClick}
            style={{
                width: width,
                height: height,
                fontSize: textSize,
                ...style,
            }}
            {...rest}
        >
            {children}
        </BootstrapButton>
    );
};

export const InfoButton = (props) => {
    const {
        children = 'Click Here',
        variant = 'info',
        onClick,
        className = '',
        type = 'button',
        width = '100px',
        height = '40px',
        textSize = '14px',
        style = {},
        ...rest
    } = props;

    return (
        <BootstrapButton
            variant={variant}
            type={type}
            className={className}
            onClick={onClick}
            style={{
                width: width,
                height: height,
                fontSize: textSize,
                ...style,
            }}
            {...rest}
        >
            {children}
        </BootstrapButton>
    );
};

export const CustomButton = (props) => {
    const {
        children = 'Click Here',
        variant = 'custom',
        onClick,
        className = '',
        type = 'button',
        width = '100px',
        height = '40px',
        textSize = '14px',
        backgroundColor = '',
        style = {},
        ...rest
    } = props;

    return (
        <button
            variant={variant}
            type={type}
            className={`btn-custom ${className}`}
            onClick={onClick}
            style={{
                width: width,
                height: height,
                fontSize: textSize,
                backgroundColor: backgroundColor,
                ...style,
            }}
            {...rest}
        >
            {children}
        </button>
    );
};

export const ToggleButton = (props) => {
    const {
        onToggle,
        childrenA,
        childrenB,
        ...rest
    } = props;

    const [active, setActive] = useState('btnA');

    const handleToggle = (type) => {
        setActive(type);
        if (onToggle) onToggle(type);
    };

    return (
        <div className="d-flex togglebtn-container">
            <button
                className={`togglebtn-custom ${active === 'btnA' ? 'togglebtn-animate' : ''}`}
                type="button"
                onClick={() => handleToggle('btnA')}
                {...rest}
            >
                {childrenA}
            </button>

            <button
                className={`togglebtn-custom ${active === 'btnB' ? 'togglebtn-animate' : ''}`}
                type="button"
                onClick={() => handleToggle('btnB')}
                {...rest}
            >
                {childrenB}
            </button>
        </div>
    );
};