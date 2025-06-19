// Filename: Button.jsx
import React from 'react';
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