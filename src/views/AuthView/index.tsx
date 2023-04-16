import React, { useState } from "react";
import Container from "../../components/Container";
import Logo from "../../components/Logo";
import Input from "../../components/Input";
import './style.css';
import Button from "../../components/Button";
import AuthController from "../../controllers/AuthController";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import useController from "../../hooks/useController";

export default function AuthView(){
    const controller = useController(AuthController);
    const navigate = useNavigate();
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);

    const handleClickConfirm = async () => {
        if(code){
            setLoading(true);
            var response = await controller.getUserByCode(code);
            if(response.success){
                navigate("/registros");
            }else{
                toast.error(response.message);
            }
            setLoading(false);
        }
    }

    return (
        <Container>
            <div className="login-area">
                <Logo style={{marginBottom: '48px'}}/>
                <Input 
                    label="Código do usuário"
                    value={code}
                    onChange={(value)=>setCode(value)}
                />
                <Button disabled={!code || loading} isLoading={loading} onClick={handleClickConfirm}>
                    Confirmar
                </Button>
                <ToastContainer />
            </div>
        </Container>
    );
}