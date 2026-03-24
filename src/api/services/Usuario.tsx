import apiSegundos from "../config/apiConfig";
import UsuarioRequestDTO from "../types/request/usuarioRequestDTO";

export const consultarUsuarios = async () => {
  try {
    const response = await apiSegundos.get('users/ListarUsuarios');
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    throw error;
  }
};

export const consultarUsuarioPorId = async (id: number) => {
  try {
    const response = await apiSegundos.get(`usuario/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar usuário com ID ${id}:`, error);
    throw error;
  }
}

export const criarUsuario = async (usuario: UsuarioRequestDTO) => {
  try {
    const response = await apiSegundos.post('users/CriarUsuario', usuario);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    throw error;
  }
};

export const usuarioPorEmail = async (email: string) => {
  try {
    const response = await apiSegundos.put(`users/UsuarioPorEmail/${email}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar usuário por email:", error);
    throw error;
  }
}