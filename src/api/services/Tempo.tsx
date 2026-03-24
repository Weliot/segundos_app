import { TempoDeEstudo } from "../../providers/SegundosContext";
import apiSegundos from "../config/apiConfig";
import TempoRequestDTO from "../types/request/tempoRequestDTO";

export const cadastrarTempoDeEstudo = async (tempoRequest: TempoRequestDTO) => {
    try {
        const response = await apiSegundos.post('tempo/RegistrarTempo', tempoRequest)
        return response.data;
    } catch (error) {
        console.error("Não foi possível cadastrar o tempo de estudo:", error)
        throw new Error("Não foi possível cadastrar o tempo de estudo")        
    }
}

export const tempoDeEstudoPorMateria = async (idMateria: number) => {
    try {
        const response = await apiSegundos.get(`tempo/TemposPorIdMateria/${idMateria}`)
        
        const tempos: TempoDeEstudo[] = response.data;
        
        return tempos;

    } catch (error) {
        console.error("Não foi possível consultar os tempos de estudo:", error)
        throw new Error("Não foi possível consultar os tempos de estudo")        
    }
}

export const tempoDeEstudoPorAssunto = async (idAssunto: number) => {
    try {
        const response = await apiSegundos.get(`tempo/TemposPorIdAssunto/${idAssunto}`)
        return response.data;
    } catch (error) {
        console.error("Não foi possível consultar os tempos de estudo:", error)
        throw new Error("Não foi possível consultar os tempos de estudo")        
    }
}