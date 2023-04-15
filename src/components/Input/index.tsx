import React, { useEffect, useRef, useState } from "react";
import './style.css';

type Props = {
    label: string,
    value: string,
    onChange: (value: string) => void
}
export default function Input({label, value, onChange} : Props){
    const inputRef : React.LegacyRef<HTMLInputElement> = useRef(null)
    const [focused, setFocused] = useState(false)

    const onFocus = () => setFocused(true);
    const onBlur = () => setFocused(false);

    const handleClickFocus = () => {
        inputRef.current!.focus();
    }

    useEffect(()=>{
        if (document.activeElement === inputRef.current) {
            setFocused(true);
        }
    }, []);

    

    return (
        <div className={`input ${focused && 'focus'}`} onClick={handleClickFocus}>
            <label className={focused || value ? 'active' : ''}>{label}</label>
            <input className={focused || value ? 'active' : ''} type="text" ref={inputRef} 
                value={value} 
                onChange={(e)=>onChange(e.target.value)} 
                onFocus={onFocus} 
                onBlur={onBlur}
            />
        </div>
    );
}