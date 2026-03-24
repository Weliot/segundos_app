import React from 'react'
import { useSegundosContext } from '../providers/SegundosContext'
import CriarMateria from '../components/CriarMateria'
import { Box } from '@mui/material'
import ListarMaterias from '../components/ListarMaterias'
import CriarAssuntos from '../components/CriarAssunto'
import IncluirQuestoesPorAssunto from '../components/IncluirQuestoesPorAssunto'
import QuestoesPorMateria from '../components/QuestoesPorMateria'
import HistoricoQuestoes from '../components/HistoricoQuestoes'

const Questoes = () => {
  return (
    <Box sx={{width: '100%', height: '100%'}}>
        <IncluirQuestoesPorAssunto />
        <QuestoesPorMateria />
        <HistoricoQuestoes />
    </ Box>
  )
}

export default Questoes