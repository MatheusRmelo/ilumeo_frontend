import React from "react";

type Props = {
    children: JSX.Element
}

export default function Container({children} : Props){
    return (
        <div style={style}>
            {children}
        </div>
    );
}

const style : React.CSSProperties = {
    width: '100%',
    height: '100vh',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};