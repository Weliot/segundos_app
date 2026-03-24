import React from 'react'
import {User} from '../../providers/SegundosContext'
import { consultarUsuarios } from '../services/Usuario'; // Ajuste o caminho conforme necessário

const CarregarUsuarios = () => {
    const [usuarios, setUsuarios] = React.useState<User[]>([]);

    React.useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const response = await consultarUsuarios();
                setUsuarios(response);
                return;
            } catch (error) {
                console.error("Erro ao carregar usuários:", error);
            }
        }; fetchUsuarios()}, []);
  return ( usuarios )
}

export default CarregarUsuarios