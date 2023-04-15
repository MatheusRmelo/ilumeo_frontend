import React from 'react';
import './style.css';

type Props = {
    children: JSX.Element | string,
    variant?: 'solid' | 'outlined' | 'text',
    disabled?: boolean,
    isLoading?: boolean,
    onClick?: () => {},
}

export default function Button({children, onClick, variant = 'solid', isLoading = false, disabled = false}: Props){
    return (
        <button className={`button ${variant}`} disabled={disabled} onClick={onClick}>
            {
                isLoading ?
                <div>
                    <i className="fa fa-spinner fa-spin" style={{marginRight: '6px'}}></i>
                    Carregando...
                </div>:
                children
            }
        </button>
    );
}