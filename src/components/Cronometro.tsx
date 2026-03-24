import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import {TextField, Box, Grid, Button, ButtonGroup, Typography, MenuItem, Collapse, Alert} from '@mui/material';
import {useSegundosContext} from '../providers/SegundosContext'
import TempoEstudo from './TempoEstudo';

const Cronometro = () => {

  const [selectedMateria, setSelectedMateria] = useState<number>(0);
  const [selectedAssunto, setSelectedAssunto] = useState<number>(0)

  const {
    materias,
    Assuntos,
    createTempoDeEstudo,
    timer,
    start,
    reset,
    pause,
    formatNumber,
    setAlertMessage,
    setAlertSeverity,
    setOpenAlert,
    TempoDeEstudos,
    openAlert,
    alertSeverity,
    alertMessage,
    tempoMs
  } = useSegundosContext()

      useEffect(() => {
        setAlertMessage('');
        setAlertSeverity('success');
        setOpenAlert(false);
      }, []);

  const formattedTime = useMemo(() => {
    return `${formatNumber(timer.hour, 2)}:${formatNumber(timer.minute, 2)}:${formatNumber(timer.second, 2)}:${formatNumber(timer.millisecond, 3)}`;
  }, [timer]);

  // 2. Memorizar handlers com useCallback
  const handleStart = useCallback(() => {
    start();
  }, [start]);

  const handlePause = useCallback(() => {
    pause();
  }, [pause]);

  const handleSave = useCallback(() => {
    createTempoDeEstudo(selectedAssunto, selectedMateria, tempoMs);
  }, [createTempoDeEstudo, selectedAssunto, selectedMateria, timer, TempoDeEstudos]);

  const handleReset = useCallback(() => {
    reset();
  }, [reset]);

  return (
    <Box sx={{width: '100%', height: '100vh'}}>
      <Box sx={{ backgroundColor: 'white', borderRadius: 2, paddingY: 5, boxShadow: '5px 5px 10px 0px gray', display: 'flex', textAlign: 'center', flexDirection: "column", justifyContent: "top", alignItems: "center", width: '100%'}}>
        
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            CRONÔMETRO
        </Typography>

        <Grid container spacing={2} marginTop={4} alignItems={"center"} justifyContent="center">
          <TextField
          id="outlined-select-currency"
          select
          label="Matéria"
          defaultValue = {0}
          helperText="Escolha a matéria que está estudando"
          size='small'
          color='secondary'
          onChange={(e) => setSelectedMateria(parseInt(e.target.value))}
        >
          <MenuItem value={0} sx={{ color: '#6c04b4' }}>Selecione</MenuItem>
            {materias.map((materia) => (
              <MenuItem 
                key={materia.idMateria} 
                value={materia.idMateria} // Usa o ID como valor (pode ser alterado para materia.nome se necessário)
                sx={{ color: '#6c04b4' }}
              >
                {materia.nomeMateria}
              </MenuItem>
              
            ))}
        </TextField>

        <TextField
          id="outlined-select-currency"
          color='secondary'
          select
          label="Assunto da Matéria"
          defaultValue={0}
          helperText={selectedMateria ? "Escolha o assunto da matéria" : "Selecione uma matéria primeiro"}
          size='small'
          disabled={!selectedMateria} // Desabilita se nenhuma matéria estiver selecionada
          onChange={(e) => setSelectedAssunto(parseInt(e.target.value))}
        >
          <MenuItem value={0} sx={{ color: '#6c04b4' }}>Selecione</MenuItem>
          {Assuntos
          .filter(assunto => assunto.idMateria === (selectedMateria))
          .map((assunto) => (
            <MenuItem 
              key={assunto.idAssunto} 
              value={assunto.idAssunto}
              sx={{ color: '#6c04b4' }}
            >
              {assunto.nomeAssunto}
            </MenuItem>
          ))
        }
        </TextField>
        </Grid>
        
      <Grid container spacing={2} flexDirection="row" justifyContent="center" alignItems="center" border={1} borderColor='#6c04b4' borderRadius={1} maxWidth={150} padding={1} paddingX={12} marginY={2}>
        <Grid container fontSize={24} textAlign="center" fontWeight="bold" justifyContent="center" alignItems="center" color={'#6c04b4'}>
          {formattedTime}
        </Grid>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 4}}>
          <Button onClick={handleStart} color='secondary'>Iniciar</Button>
          <Button onClick={handlePause} color='secondary'>Pausar</Button>
        </Box>
      </Grid>

      <ButtonGroup variant="contained" aria-label="Basic button group" color='secondary' sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <Button onClick={handleSave} color='secondary'>Salvar</Button>
        <Button onClick={handleReset} color='secondary'>Reiniciar</Button>
      </ButtonGroup>
    </Box>
  </Box>
    

  );
};

export default Cronometro;