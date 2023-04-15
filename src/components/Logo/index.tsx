import React from 'react';
import './style.css';

type Props = {
    style?: React.CSSProperties
}
export default function Logo({style} : Props){
    return (
        <h1 className='logo' style={style}>
            Ponto <strong>Ilumeo</strong>
        </h1>
    );
}