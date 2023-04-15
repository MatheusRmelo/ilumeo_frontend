import React, { useEffect, useMemo, useState } from 'react';
import Container from '../../components/Container';
import './style.css';
import Button from '../../components/Button';
import IRegisterByDay, { IRegisterAttributes } from '../../models/RegisterModel';
import RegisterController from '../../controllers/RegisterController';
import DayCard from '../../components/DayCard';
import Utils from '../../utils/utils';
import { toast } from 'react-toastify';

export default function RegistersView(){
    const controller = new RegisterController();
    const [registers, setRegisters] = useState<IRegisterByDay[]>([]);
    const [currentRegister, setCurrentRegister] = useState<IRegisterByDay|null>(null);
    const [loading, setLoading] = useState(false);
    const status = useMemo(() => currentStatus(currentRegister), [currentRegister]);

    useEffect(()=>{
        getRegisters();
    }, []);

    const getRegisters = async () => {
        var response = await controller.getRegisters();
        if(response.success){
            setRegisters(response.data!.data.filter((element)=>element.day != new Date().toLocaleDateString('pt-BR')));
            let current = response.data!.data.find((element)=>element.day == new Date().toLocaleDateString('pt-BR'));
            if(current){
                setCurrentRegister(current);
            }
        }
    }

    const handleClickRegisterPoint = async () => {
        setLoading(true);
        var response = await controller.create(status);
        if(response.success){
            if(currentRegister == null){
                let register = {
                    day: new Date().toLocaleDateString('pt-BR'),
                    registers: [response.data!]
                }
                let newRegisters = [...registers];
                newRegisters.unshift(register);
                setRegisters([...newRegisters]);
                setCurrentRegister({...register});
            }else{
                let register = currentRegister;
                register?.registers.unshift(response.data!);
                console.log(register);
                setCurrentRegister({...register});
            }
        }else{
            toast.error(response.message);
        }
        setLoading(false);
    }

    return (
        <Container>
            <div className='registers-area'>
                <div className="registers-header">
                    <h4>Relógio de ponto</h4>
                    <div className='user-details'>
                        <h4>#{localStorage.getItem("code")}</h4>
                        <small>Usuário</small>
                    </div>
                </div>
                <div className="registers-body">
                    <h2>
                        {
                            currentRegister == null ? "0h 00m" : 
                            Utils.differenceHoursBetweenDates(currentRegister.registers.map((element)=>new Date(element.register_at)))
                        }
                    </h2>
                    <h4>Horas de hoje</h4>
                    <Button disabled={loading} isLoading={loading} onClick={handleClickRegisterPoint}>
                        {`Hora de ${status == 'entry' ? 'Entrada' : 'Sáida'}`}
                    </Button>
                </div>
                <div className="registers-footer">
                    <h4>Dias anteriores</h4>
                    <div className="registers-days">
                        {
                            registers.map((element)=><DayCard key={element.day} day={element} />)
                        }
                    </div>
                </div>
            </div>
        </Container>
    )
}

const currentStatus = (day: IRegisterByDay | null) : string => {
    if(day == null || day.registers.length == 0) return "entry";
    return day.registers[0].status == 'entry' ? 'leave' : 'entry';
}