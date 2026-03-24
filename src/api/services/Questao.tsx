import apiSegundos from "../config/apiConfig";
import questaoRequestDTO from "../types/request/questaoRequestDTO";

export const cadastrarQuestoes = async (questaoRequest: questaoRequestDTO) => {
    try {
        const response = await apiSegundos.post('questao/RegistrarQuestoes', questaoRequest)
        return response.data
    } catch (error) {
        console.error("Erro ao cadastrar questões", error)
        throw new Error("Erro ao cadastrar questões")
        
    }
}

export const consultarQuestoesPorMateria = async (idMateria: number) => {
    try {
        const response = await apiSegundos.get(`questao/QuestoesPorMateria/${idMateria}`)
        return response.data;
    } catch (error) {

        console.error("Erro ao consultar questões", error);
        throw new Error("Erro ao consultar questões");
        
    }
}

export const consultarQuestoesPorAssunto = async (idAssunto: number) => {
    try {
        const response = await apiSegundos.get(`questao/QuestoesPorAssunto/${idAssunto}`)
        return response.data;
    } catch (error) {

        console.error("Erro ao consultar questões", error);
        throw new Error("Erro ao consultar questões");
        
    }
}