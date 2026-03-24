import React, { useState, useRef, useEffect } from 'react';
import {TextField, Box, Grid, Button, ButtonGroup, Typography, MenuItem, Collapse, Alert} from '@mui/material';
import { useSegundosContext } from '../providers/SegundosContext';

const CriarAssuntos = () => {
  
    const {
    Assuntos,
    materias,
    createAssunto,
    openAlert,
    alertMessage,
    alertSeverity,
    setAlertMessage,
    setAlertSeverity,
    setOpenAlert,
    } = useSegundosContext();

    const [materiaId, setMateriaId] = useState(-1);
    const [nomeAssunto, setNomeAssunto] = useState('');

    useEffect(() => {
            setAlertMessage('');
            setAlertSeverity('success');
            setOpenAlert(false);
          }, []);

    const redefinirValores = () => {
        setMateriaId(-1)
        setNomeAssunto('')
    }

    const CriarAssunto = () => {

        createAssunto(nomeAssunto, materiaId)

        redefinirValores()
    }


  return (
    <Box sx={{ backgroundColor: 'white', borderRadius: 2, paddingTop: 3, boxShadow: '5px 5px 10px 0px gray', display: 'flex', textAlign: 'center', flexDirection: "column", justifyContent: "center", alignItems: "center", width: '100%'}}>
        
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            ADICIONAR ASSUNTO
        </Typography>

        <Grid container spacing={2} flexDirection='column' marginY={4} alignItems="center" justifyContent="center">
          <TextField
                    id="outlined-select-currency"
                    select
                    label="Matéria"
                    value={materiaId}
                    helperText="Escolha a matéria onde será criado o assunto"
                    size='small'
                    color='secondary'
                    onChange={(e) => {setMateriaId(parseInt(e.target.value))}}
                  >
                    <MenuItem value={-1} sx={{ color: '#6c04b4' }}>Selecione</MenuItem>
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
                    label="Assunto"
                    value={nomeAssunto}
                    helperText={materiaId ? "Digite o nome do assunto que será criado" : "Selecione uma matéria primeiro"}
                    size='small'
                    disabled={!materiaId} // Desabilita se nenhuma matéria estiver selecionada
                    color='secondary'
                    onChange={(e) => setNomeAssunto(e.target.value)}
                  > 
                  </TextField>

        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 4}}>
            <Button  variant='contained' color='secondary' onClick={() => {CriarAssunto()}}>Incluir</Button>
            <Button  variant='contained' color='secondary' onClick={() => redefinirValores()}>Limpar</Button>
        </Box>
        </Grid>
    </Box>
  );
};

export default CriarAssuntos;