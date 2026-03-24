import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { Box, Grid } from '@mui/material';
import Desempenho from '../components/Desempenho';
import Cronometro from '../components/Cronometro';
import TempoEstudo from '../components/TempoEstudo';

const Informacoes = () => {
  return (
  <Box sx={{width: '100%'}}>
    {<TempoEstudo />}
    {<Desempenho />}
  </Box>
  );
}

export default Informacoes