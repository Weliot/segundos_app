import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { Box, Grid, Typography } from '@mui/material';
import { Materia, useSegundosContext } from '../providers/SegundosContext';

const Desempenho = () => {

  const {
    materias,
    questoesFeitas,
  } = useSegundosContext()

  return (
    <Box sx={{backgroundColor: 'white', borderRadius: 2, paddingY: 5, boxShadow: '5px 5px 10px 0px gray', width: '100%', display: 'flex', textAlign: 'center', flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            DESEMPENHO
        </Typography>    
    <Grid container spacing={2} flexDirection="row" justifyContent="center" alignItems="center" width={'100%'} paddingTop={5}>
      {materias.map((mat) => {

      const nomeMateria = mat.nomeMateria;

      const questoes = questoesFeitas.filter(q => q.idMateria === mat.idMateria);
      const questoesTotais = questoes.reduce((sum, questoes) => sum + questoes.qtdQuestoes, 0);
      const somaAcertos = questoes.reduce((sum, acertos) => sum + acertos.qtdAcertos, 0);
      const somaErros = questoes.reduce((sum, erros) => sum + erros.qtdErros, 0);
      
      return (
      <Grid spacing={2} flexDirection="column" justifyContent="center" alignItems="center">
        <p>{nomeMateria}</p>
              <p>Total de questões: {questoesTotais}</p>
      <PieChart
        colors={['#75000cff', '#0a6c2cff']}
        series={[
          {
            data: [
              { id: 0, value: somaErros, label: 'Erros' },
              { id: 1, value: somaAcertos, label: 'Acertos' },
            ],
            cornerRadius: 10,
            paddingAngle: 2,
            innerRadius: 20,
          },
        ]}
        width={200}
        height={200}
      />
      </Grid>);
    })}
    </Grid>
    </Box>
    
  );
}

export default Desempenho