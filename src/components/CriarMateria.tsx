import React, { useState, useRef, useEffect } from 'react';
import {TextField, Box, Grid, Button, ButtonGroup, Typography, MenuItem, Collapse, Alert} from '@mui/material';
import { useSegundosContext } from '../providers/SegundosContext';

const CriarMateria = () => {
  
    const {
    Assuntos,
    materias,
    createMateria,
    openAlert,
    alertMessage,
    alertSeverity,
    setAlertMessage,
    setAlertSeverity,
    setOpenAlert,
    } = useSegundosContext();

    const [nomeMateria, setNomeMateria] = useState('')
    const [nomeAssunto, setNomeAssunto] = useState('')

    useEffect(() => {
            setAlertMessage('');
            setAlertSeverity('success');
            setOpenAlert(false);
          }, []);

    const redefinirValores = () => {
        setNomeMateria('')
        setNomeAssunto('')
    }

    const criarMateria = () => {

        createMateria(nomeMateria, nomeAssunto)

        redefinirValores()
    }


  return (
    <Box sx={{ backgroundColor: 'white', borderRadius: 2, paddingTop: 3, boxShadow: '5px 5px 10px 0px gray', display: 'flex', textAlign: 'center', flexDirection: "column", justifyContent: "center", alignItems: "center", width: '100%', marginBottom: 2}}>
        
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            ADICIONAR MATÉRIA
        </Typography>

        <Grid container spacing={2} flexDirection='column' marginY={4} alignItems="center" justifyContent="center">
          <TextField
          required
          id="outlined-required"
          label="Matéria"
          value={nomeMateria}
          helperText="Escolha a matéria que dejseja adicionar"
          size='small'
          color='secondary'
          onChange={(e) => setNomeMateria(e.target.value)}
        >
        
        </TextField>

        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 4}}>
            <Button  variant='contained' color='secondary' onClick={() => {criarMateria()}}>Incluir</Button>
            <Button  variant='contained' color='secondary' onClick={() => redefinirValores()}>Limpar</Button>
        </Box>
        </Grid>
    </Box>
  );
};

export default CriarMateria;