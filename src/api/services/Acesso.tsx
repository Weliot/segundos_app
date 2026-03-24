import apiSegundos from "../config/apiConfig";
import AcessoResponseDTO from "../types/response/acessoResponseDTO";
import AcessoRequestDTO from "../types/request/acessoRequestDTO";

export const realizarLogin = async (acessoRequest: AcessoRequestDTO) => {

    try 
    { const response = await apiSegundos.post('autorizacao/autorizar', acessoRequest);

        const data: AcessoResponseDTO = response.data;

        return data;

    } catch (error) {
        console.error("Erro ao realizar login:", error);
        const erroData: AcessoResponseDTO = {
            message: "Erro ao realizar login",
            token: ""
        };
        return erroData;
    }
}