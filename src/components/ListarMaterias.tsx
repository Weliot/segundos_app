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
import { Button, extendTheme, Modal, TextField } from '@mui/material';
import { Add, AddCircleOutline, DeleteOutlineOutlined, EditOutlined, PlusOne, SummarizeOutlined } from '@mui/icons-material';

const ListarMaterias = () => {

  const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {xs:'80%', md: '40%'},
  bgcolor: 'background.paper',
  border: '2px solid #6c04b4',
  borderRadius: '10px',
  boxShadow: 24,
  display: 'flex',
  flexDirection: 'column',
  p: 4,
  };

const {
    dadosPorMateria,
    deletarMateriaUsuario,
    deletarAssuntoUsuario,
    atualizarMateriaUsuario,
    atualizarAssuntoUsuario
  } = useSegundosContext()

function Row(dados: DadosPorMateria) {
  const [open, setOpen] = React.useState(false);
  const [openModalMateria, setOpenModalMateria] = React.useState(false)
  const [openModalAssunto, setOpenModalAssunto] = React.useState(false)
  const [openModalEditarMateria, setOpenModalEditarMateria] = React.useState(false)
  const [openModalEditarAssunto, setOpenModalEditarAssunto] = React.useState(false)
  const [novoNomeMateria, setNovoNomeMateria] = React.useState('')
  const [novoNomeAssunto, setNovoNomeAssunto] = React.useState('')

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
          {dados.nome} {/* Nome da matéria exibido corretamente */}
        </TableCell>
        <TableCell align="center" component="th" scope="row" sx={{p:1}}>

         <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpenModalEditarMateria(true)}
            color='primary'
          >
            <EditOutlined />
          </IconButton>

          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpenModalMateria(true)}
            color='error'
          >
            <DeleteOutlineOutlined />
          </IconButton>
        </TableCell>
          <Modal
            open={openModalMateria}
            onClose={() => setOpenModalMateria(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Deseja excluir a matéria {dados.nome}?
              </Typography>
              <Button variant='contained' sx={{ mt: 2 }} onClick={() => deletarMateriaUsuario(dados.id)}>Confirmar</Button>
              <Button variant='contained' color='error' onClick={() => setOpenModalMateria(false)} sx={{ mt: 2 }}>Cancelar</Button>
            </Box>
          </Modal>
          <Modal
            open={openModalEditarMateria}
            onClose={() => setOpenModalEditarMateria(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Renomear a matéria {dados.nome}?
              </Typography>
              <TextField id="outlined-basic" label='Digite o novo nome da matéria' type='text' color='secondary' sx={{ mt: 2 }}
                onChange={(e) => setNovoNomeMateria(e.target.value)}></TextField >
              <Button variant='contained' sx={{ mt: 2 }} onClick={() => atualizarMateriaUsuario(dados.id, novoNomeMateria)}>Confirmar</Button>
              <Button variant='contained' color='error' onClick={() => setOpenModalEditarMateria(false)} sx={{ mt: 2 }}>Cancelar</Button>
            </Box>
          </Modal>
      </TableRow>
      
      <TableRow sx={{ paddingBottom: 0, paddingTop: 0, backgroundColor: 'rgba(108, 4, 180, 0.5)'}}>
        <TableCell sx={{ paddingBottom: 0, paddingTop: 0}} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1, paddingBottom: 2}}>
              <Typography padding={1} align="center" variant="h6" gutterBottom component="div">
                ASSUNTOS
              </Typography>
              <Table size="small" aria-label="assuntos">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Assunto</TableCell>
                    <TableCell align="center">Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dados.assuntosComTempos.map((assunto) => (
                    <TableRow key={assunto.id}>
                      <TableCell align="left">{assunto.nome}</TableCell>
                      <TableCell align="center">
                        <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpenModalEditarAssunto(true)}
                        color='primary'
                        >
                        <EditOutlined />
                        </IconButton>

                        <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpenModalAssunto(true)}
                        color='error'
                        >
                        <DeleteOutlineOutlined />
                        </IconButton>
                      </TableCell>
                      <Modal
                        open={openModalAssunto}
                        onClose={() => setOpenModalAssunto(false)}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box sx={style}>
                          <Typography id="modal-modal-title" variant="h6" component="h2">
                            Deseja excluir o assunto {assunto.nome}?
                          </Typography>
                          <Button variant='contained' sx={{ mt: 2 }} onClick={() => deletarAssuntoUsuario(assunto.id)}>Confirmar</Button>
                          <Button variant='contained' color='error' onClick={() => setOpenModalAssunto(false)} sx={{ mt: 2 }}>Cancelar</Button>
                        </Box>
                      </Modal>
                      <Modal
                        open={openModalEditarAssunto}
                        onClose={() => setOpenModalEditarAssunto(false)}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        >
                        <Box sx={style}>
                          <Typography id="modal-modal-title" variant="h6" component="h2">
                            Renomear o assunto {assunto.nome}?
                          </Typography>
                          <TextField id="outlined-basic" label='Digite o novo nome do assunto' type='text' color='secondary' sx={{ mt: 2 }}
                            onChange={(e) => setNovoNomeAssunto(e.target.value)}></TextField >
                          <Button variant='contained' sx={{ mt: 2 }} onClick={() => atualizarAssuntoUsuario(assunto.id, novoNomeAssunto)}>Confirmar</Button>
                          <Button variant='contained' color='error' onClick={() => setOpenModalEditarAssunto(false)} sx={{ mt: 2 }}>Cancelar</Button>
                        </Box>
                      </Modal>
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
    <Box sx={{ backgroundColor: 'white', borderRadius: 2, paddingY: 2, boxShadow: '5px 5px 10px 0px gray', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: 2, marginBottom: 2, width: '100%' }}>
        
    <Typography variant='h4'  sx={{ marginBottom: 4, textAlign: 'center', fontWeight: 'bold' }}>
        LISTA DE MATÉRIAS
    </Typography>
    <TableContainer component={Paper} sx={{width: '96%', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '5px 5px 10px 0px gray' }}>
      <Table aria-label="collapsible table" sx={{width: '100%'}} >
        <TableHead sx={{ backgroundColor:  'rgba(108, 4, 180, 1)', p:1}}>
          <TableRow sx={{ backgroundColor:  'rgba(108, 4, 180, 1)', p:1}}>
            <TableCell sx={{maxWidth: '5px'}}/>
            <TableCell align="center" sx={{color: 'white',  p:1}}>Matéria</TableCell>
            <TableCell align="center" sx={{color: 'white',  p:1}}>Ações</TableCell>
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

export default ListarMaterias