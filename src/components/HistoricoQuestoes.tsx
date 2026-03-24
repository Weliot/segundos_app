import React, { useEffect } from 'react'
import { Box, Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Collapse } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useSegundosContext, Materia, QuestoesFeitas } from '../providers/SegundosContext'

const HistoricoQuestoes = () => {
  const {
    Assuntos,
    materias,
    questoesFeitas
  } = useSegundosContext()

  const toDate = (data: Date): Date => {
    const registro = new Date (data)
    return registro;
  }

  interface RowProps {
    materia: Materia;
  }

  function Row({ materia }: RowProps) {
    const [open, setOpen] = React.useState(false);

    // Filtrar questões por matéria
    const questoesDaMateria = questoesFeitas.filter(questao => questao.idMateria === materia.idMateria);

    // Calcular totais para esta matéria
    const totalQuestoesMateria = questoesDaMateria.reduce((sum, questao) => sum + questao.qtdQuestoes, 0);
    const totalAcertosMateria = questoesDaMateria.reduce((sum, questao) => sum + questao.qtdAcertos, 0);
    const totalErrosMateria = questoesDaMateria.reduce((sum, questao) => sum + questao.qtdErros, 0);

    // Calcular total geral de questões
    const totalGeralQuestoes = questoesFeitas.reduce((sum, questao) => sum + questao.qtdQuestoes, 0);

    // Calcular percentual
    const percentual = totalGeralQuestoes > 0 
      ? (totalQuestoesMateria / totalGeralQuestoes) * 100 
      : 0;

    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' }, p: 1}}>
          <TableCell align='center' sx={{ p: 1 }}>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell align="center" component="th" scope="row" sx={{ p: 1 }}>
            {materia.nomeMateria} {/* Nome da matéria exibido corretamente */}
          </TableCell>
          <TableCell align="center" sx={{ p: 1 }}>
            {totalQuestoesMateria} {/* Total de questões por matéria */}
          </TableCell>
        </TableRow>

        <TableRow sx={{ paddingBottom: 0, paddingTop: 0, backgroundColor: 'rgba(108, 4, 180, 0.5)' }}>
          <TableCell sx={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1, paddingBottom: 2 }}>
                <Typography padding={1} align="center" variant="h6" gutterBottom component="div">
                  histórico por assunto
                </Typography>
                <Table size="small" aria-label="assuntos">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">Assunto</TableCell>
                      <TableCell align="right">Questões</TableCell>
                      <TableCell align="right">Acertos</TableCell>
                      <TableCell align="right">Erros</TableCell>
                      <TableCell align='right'>Data</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {questoesDaMateria.map((questao) => {
                      // Encontrar o nome do assunto
                      const assunto = Assuntos.find(a => a.idAssunto === questao.idAssunto);
                      return (
                        <TableRow key={questao.idQuestoes}>
                          <TableCell align="left">
                            {assunto ? assunto.nomeAssunto : questao.idAssunto} {/* Exibir nome do assunto ou ID se não encontrado */}
                          </TableCell>
                          <TableCell align="right">{questao.qtdQuestoes}</TableCell>
                          <TableCell align="right">{questao.qtdAcertos}</TableCell>
                          <TableCell align="right">{questao.qtdErros}</TableCell>
                          <TableCell align='right'>{`${toDate(questao.dataRegistro).getDate().toString().padStart(2, '0')}` + '/' + `${(toDate(questao.dataRegistro).getMonth()+1).toString().padStart(2, '0')}` + '/' + `${toDate(questao.dataRegistro).getFullYear()}`}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  return (
    <Box sx={{ backgroundColor: 'white', borderRadius: 2, paddingY: 3, boxShadow: '5px 5px 10px 0px gray', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: 0, marginBottom: 2, width: '100%' }}>
      <Grid container spacing={2} display={'flex'} justifyContent={'center'} flexDirection={'column'} paddingTop={2} width={'100%'}>
        <Typography variant='h4' sx={{ marginBottom: 2, textAlign: 'center', fontWeight: 'bold' }}>
          HISTÓRICO DE QUESTÕES
        </Typography>
        <Grid container display={'flex'} justifyContent={'center'} flexDirection={'column'} alignItems={'center'} width={'100%'}>
          <TableContainer component={Paper} sx={{ width: '96%', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '5px 5px 10px 0px gray' }}>
            <Table aria-label="collapsible table" sx={{width: '100%', display: {xs: 'block', sm:'block', lg: 'table'}}}>
              <TableHead sx={{ backgroundColor: 'rgba(108, 4, 180, 1)', p: 1}}>
                <TableRow sx={{ backgroundColor: 'rgba(108, 4, 180, 1)', p: 1}}>
                  <TableCell/>
                  <TableCell align="center" sx={{ color: 'white', p: 1 }}>Matéria</TableCell>
                  <TableCell align="center" sx={{ color: 'white', p: 1 }}>Total de Questões Feitas</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {materias.map((materia) => (
                  <Row key={materia.idMateria} materia={materia} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
  )
}

export default HistoricoQuestoes