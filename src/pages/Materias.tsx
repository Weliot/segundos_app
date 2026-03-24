import React from 'react'
import { useSegundosContext } from '../providers/SegundosContext'
import CriarMateria from '../components/CriarMateria'
import { Box } from '@mui/material'
import ListarMaterias from '../components/ListarMaterias'
import CriarAssuntos from '../components/CriarAssunto'

const Materias = () => {
  return (
    <Box sx={{width: '100%', height: '100%'}}>
        <CriarMateria />
        <CriarAssuntos />
        <ListarMaterias />
    </ Box>
  )
}

export default Materias