import apiSegundos from "../config/apiConfig";
import AssuntoRequestDTO from "../types/request/assuntoRequestDTO";
import { Assunto } from '../../providers/SegundosContext';

export const cadastrarAssunto = async (assuntoRequest: AssuntoRequestDTO) => {
    try {
        const response = await apiSegundos.post('assunto/CadastrarAssunto', assuntoRequest);
        return response.data;
    } catch (error) {
        console.error("Erro ao cadastrar assunto:", error);
        throw new Error("Erro ao cadastrar assunto");
    }
}

export const assuntosPorMateria = async (idMateria: number) => {

    try {
        const response = await apiSegundos.get(`assunto/AssuntosPorIdMateria/${idMateria}`);
        
        const assuntos: Assunto[] = response.data

        return assuntos;
        
    } catch (error) {
        console.error("Erro ao buscar assuntos por matéria:", error);
        throw new Error("Erro ao buscar assuntos por matéria");
    }

}

export const deletarAssunto = async (idAssunto: number) => {
    try {
        const response = await apiSegundos.delete(`assunto/DeletarAssunto/${idAssunto}`);
        return response.data
    } catch (error) {
        console.error("Erro ao deletar assunto:", error);
        throw new Error("Erro ao deletar assunto.");
    }
}

export const atualizarAssunto = async (idAssunto: number, novoNome: string) => {
    try {
        const response = await apiSegundos.put(`assunto/AtualizarAssunto/${idAssunto}`, novoNome)
        return response.data
    } catch (error) {
        console.error("Erro ao aditar assunto:", error);
        throw new Error("Erro ao aditar assunto.");
    }
}