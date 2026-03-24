import React from 'react'
import MateriaRequestDTO from '../types/request/materiaRequestDTO'
import apiSegundos from '../config/apiConfig';

export const cadastrarMateria = async (materiaRequest: MateriaRequestDTO) => {
  
    try {
        const response = await apiSegundos.post('materia/CadastrarMateria', materiaRequest);
        return response.data;
    } catch (error) {
        console.error("Erro ao cadastrar matéria:", error);
        throw new Error("Erro ao cadastrar matéria");
    }
}

export const listarMaterias = async () => {
  
    try {
        const response = await apiSegundos.get('materia/ListarMaterias');
        return response.data;
    } catch (error) {
        console.error("Erro ao listar matérias:", error);
        throw new Error("Erro ao listar matérias");
    }
}

export const materiasPorUsuario = async (usuarioId: string) => {
    try {
        const response = await apiSegundos.get(`materia/MateriasPorIdUsuario/${usuarioId}`);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar matérias por usuário:", error);
        throw new Error("Erro ao buscar matérias por usuário");
    }
}

export const materiasPorId = async (materiaId: string) => {
    try {
        const response = await apiSegundos.get(`materia/MateriaPorId/${materiaId}`);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar matéria por ID:", error);
        throw new Error("Erro ao buscar matéria por ID");
    }
}

export const deletarMateria = async (idMateria: number) => {
    try {
        const response = await apiSegundos.delete(`materia/DeletarMateria/${idMateria}`);
        return response.data
    } catch (error) {
        console.error("Erro ao deletar matéria:", error);
        throw new Error("Erro ao deletar matéria.");
    }
}

export const atualizarMateria = async (idMateria: number, novoNome: string) => {
    try {
        const response = await apiSegundos.put(`materia/AtualizarMateria/${idMateria}`, novoNome)
        return response.data
    } catch (error) {
        console.error("Erro ao aditar materia:", error);
        throw new Error("Erro ao aditar materia.");
    }
}