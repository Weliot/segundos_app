import React, { useState } from 'react'
import {Box, Grid, Typography, TextField, MenuItem, Button} from '@mui/material'
import { useSegundosContext } from '../providers/SegundosContext'

const IncluirQuestoesPorAssunto = () => {

    const {
        Assuntos,
        materias,
        createQuestoesFeitas,
    } = useSegundosContext()

    const [selectedMateria, setSelectedMateria] = useState(-1);
    const [selectedAssunto, setSelectedAssunto] = useState(-1);
    const [qtdQuestoes, setQtdQuestoes] = useState(0);
    const [qtdQuestoesCertas, setQtdQuestoesCertas] = useState(0);
    const [qtdQuestoesErradas, setQtdQuestoesErradas] = useState(0);

    const limparCampos = () => {
        setQtdQuestoes(0);
        setQtdQuestoesCertas(0);
        setQtdQuestoesErradas(0);
        setSelectedMateria(-1);
        setSelectedAssunto(-1);
        return
    }


  return (
    <Box sx={{ backgroundColor: 'white', borderRadius: 2, paddingY: 3, boxShadow: '5px 5px 10px 0px gray', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: 0, marginBottom: 2, width: '100%' }}>
        <Grid container spacing={2} display={'flex'} justifyContent={'center'} justifyItems={'center'} flexDirection={'column'} paddingTop={2}>
            <Typography variant='h4'  sx={{ marginBottom: 2, textAlign: 'center', fontWeight: 'bold' }}>
            INCLUIR QUESTÕES POR ASSUNTO
            </Typography>
            <Grid display={'flex'} justifyContent={'center'} justifyItems={'center'} flexDirection={'column'} alignItems={'center'}>
                <Grid container spacing={2} display={'flex'} columns={{xs: 6, sm: 6, md: 12}}justifyContent={'center'} alignItems={'center'} width={{xs: '80%', sm: '80%', md: '60%'}}>
                    <Grid size={6} >
                    <TextField
                    id='outlined'
                    select
                    size='small'
                    color='secondary'
                    label='Selecione a matéria'
                    value={selectedMateria}
                    helperText='Selecione a matéria das questões'
                    onChange={(e) => setSelectedMateria(parseInt(e.target.value))}
                    fullWidth>
                        <MenuItem value={-1} sx={{ color: '#6c04b4' }}>Selecione</MenuItem>
                        {materias.map((materia) => (
                        <MenuItem 
                        key={materia.idMateria} 
                        value={materia.idMateria} // Usa o ID como valor (pode ser alterado para materia.nome se necessário)
                        sx={{ color: '#6c04b4' }}>
                        {materia.nomeMateria}
                        </MenuItem>
                        ))}
                    </TextField>
                    </Grid>

                    <Grid size={6}>
                    <TextField
                    id='outlined'
                    select
                    disabled = {selectedMateria < 0 }
                    size='small'
                    color='secondary'
                    label='Selecione o assunto'
                    value={selectedAssunto}
                    helperText={selectedMateria ? "Escolha o assunto da matéria" : "Selecione uma matéria primeiro"}
                    onChange={(e) => setSelectedAssunto(parseInt(e.target.value))}
                    fullWidth>
                        <MenuItem value={-1} sx={{ color: '#6c04b4' }}>Selecione</MenuItem>
                        {Assuntos.filter(assuntos => assuntos.idMateria === selectedMateria).map((assunto) => (
                        <MenuItem 
                        key={assunto.idAssunto} 
                        value={assunto.idAssunto} // Usa o ID como valor (pode ser alterado para materia.nome se necessário)
                        sx={{ color: '#6c04b4' }}>
                        {assunto.nomeAssunto}
                        </MenuItem>
                        ))}
                    </TextField>
                    </Grid>

                    <Grid size={6}>
                    <TextField
                    id='outlined'
                    size='small'
                    type='number'
                    color='secondary'
                    label='Quantidade de questões'
                    helperText='Digite a quantidade de questões feitas'
                    value={qtdQuestoes}
                    onChange={(e) => setQtdQuestoes(parseInt(e.target.value))}
                    fullWidth>
                    </TextField>
                    </Grid>

                    <Grid size={3}>
                    <TextField
                    id='outlined'
                    size='small'
                    type='number'
                    color='secondary'
                    label='Acertos'
                    helperText='Questões que acertou'
                    value={qtdQuestoesCertas}
                    onChange={(e) => setQtdQuestoesCertas(parseInt(e.target.value))}
                    fullWidth>
                    </TextField>
                    </Grid>

                    <Grid size={3}>
                    <TextField
                    id='outlined'
                    size='small'
                    type='number'
                    color='secondary'
                    label='Erros'
                    helperText='Questões que errou'
                    value={qtdQuestoesErradas}
                    onChange={(e) => setQtdQuestoesErradas(parseInt(e.target.value))}
                    fullWidth>
                    </TextField>
                    </Grid>
                </Grid>
                <Grid p={3} gap={2} display={'flex'} justifyContent={'center'} alignItems={'center'} width={'100%'}>
                    <Button variant="contained" onClick={() => (createQuestoesFeitas(selectedMateria, selectedAssunto, qtdQuestoes,qtdQuestoesErradas, qtdQuestoesCertas), limparCampos())}>Adicionar</Button>
                    <Button variant="contained" color='secondary' onClick={() => limparCampos()}>Limpar Campos</Button>
                </Grid>

            </Grid>
        </Grid>
    </Box>
  )
}

export default IncluirQuestoesPorAssunto