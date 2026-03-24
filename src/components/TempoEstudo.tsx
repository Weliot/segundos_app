import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { height } from '@mui/system';
import {useSegundosContext, Materia, Assunto, TempoDeEstudo, DadosPorMateria, Timer} from '../providers/SegundosContext'
import { extendTheme } from '@mui/material';

const TempoEstudo = () => {

const {
    TempoDeEstudos,
    dadosPorMateria
  } = useSegundosContext()


const [tempoTotal, setTempoTotal] = React.useState(0.0);

function Row(dados: DadosPorMateria) {
  const [open, setOpen] = React.useState(false);

  // Calcular tempo total da matéria
  const tempoTotalPorMateria = dados.assuntosComTempos.reduce(
    (total, assunto) => total + assunto.tempos.reduce(
      (sum, tempo) => sum + tempo.tempoEstudo, 0
    ), 0
  );
  
   
  const somarTempototal = () => {
    if((TempoDeEstudos.reduce((sum, total) => sum + total.tempoEstudo, 0)) > 0) {
      setTempoTotal(TempoDeEstudos.reduce((sum, total) => sum + total.tempoEstudo, 0))
    } else {
      setTempoTotal(0.00)
    }}

  useEffect(() => {
    somarTempototal()
  }, [tempoTotalPorMateria])

  

  function timeToMs(time: Timer) {
  return (
    time.hour * 3600000 +
    time.minute * 60000 +
    time.second * 1000 +
    time.millisecond
    );
  }

// Função para formatar milissegundos em HH:MM:SS
  function formatMsToHHMMSS(ms: number) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${String(hours).padStart(2, '0')}hs:${String(minutes).padStart(2, '0')}min`;
    }

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset'}, p: 1}}>
        <TableCell align='center' sx={{p:1}}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="center" component="th" scope="row" sx={{p:1}}>
          {dados.nome}
        </TableCell>
        <TableCell align="center" sx={{p:1}}>{formatMsToHHMMSS(tempoTotalPorMateria)}</TableCell>
        <TableCell align='center'sx={{p:1}}> {tempoTotal > 0 ? ((tempoTotalPorMateria / tempoTotal)*100).toFixed(2) : '0.00'}%</TableCell>
      </TableRow>
      
      <TableRow sx={{ paddingBottom: 0, paddingTop: 0, backgroundColor: 'rgba(108, 4, 180, 0.5)'}}>
        <TableCell sx={{ paddingBottom: 0, paddingTop: 0}} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1, paddingBottom: 2}}>
              <Typography padding={1} align="center" variant="h6" gutterBottom component="div">
                Tempo por assuntos
              </Typography>
              <Table size="small" aria-label="assuntos">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Assunto</TableCell>
                    <TableCell align="right">Tempo</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dados.assuntosComTempos.map((assunto) => (
                    <TableRow key={assunto.id}>
                      <TableCell align="left">{assunto.nome}</TableCell>
                      <TableCell align="right">
                        {formatMsToHHMMSS(assunto.tempos.reduce((sum, tempo) => sum + tempo.tempoEstudo, 0 ))}
                      </TableCell>
                    </TableRow>
                  ))}
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
    <Box sx={{ backgroundColor: 'white', borderRadius: 2, paddingY: 5, boxShadow: '5px 5px 10px 0px gray', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: 2, width: '100%' }}>
        
    <Typography variant='h4'  sx={{ marginBottom: 4, textAlign: 'center', fontWeight: 'bold' }}>
        TEMPO DE ESTUDO
    </Typography>
    <TableContainer component={Paper} sx={{width: '96%', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '5px 5px 10px 0px gray' }}>
      <Table aria-label="collapsible table" sx={{width: '100%'}} >
        <TableHead sx={{ backgroundColor:  'rgba(108, 4, 180, 1)', p:1}}>
          <TableRow sx={{ backgroundColor:  'rgba(108, 4, 180, 1)', p:1}}>
            <TableCell sx={{maxWidth: '5px'}}/>
            <TableCell align="center" sx={{color: 'white',  p:1}}>Matéria</TableCell>
            <TableCell align="center" sx={{color: 'white',  p:1}}>Tempo total</TableCell>
            <TableCell align="center" sx={{color: 'white',  p:1}}>%</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {dadosPorMateria.map((dadosMateria) => (
          <Row key={dadosMateria.id} {...dadosMateria} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
  );
}

export default TempoEstudo