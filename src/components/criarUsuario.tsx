import React, { useState, useContext, use, useEffect } from 'react';
import 'bootstrap';
import { Box, Grid, TextField, Button, Typography} from '@mui/material';
import {useSegundosContext} from '../providers/SegundosContext';
import Modal from '@mui/material/Modal';

const criarUsuario = () => {

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

    const [password, setPassword] = useState('');
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('')
    const [passTwo, setPassTwo] = useState('')

    const {
        alertMessage,
        alertSeverity,
        isAuthenticated,
        user,
        setUser,
        login,
        setAlertMessage,
        setAlertSeverity,
        openAlert,
        setOpenAlert,
        passwords,
        setPasswords,
        createUser
        } = useSegundosContext();

    const resetCreatUser = () => {
    setName('');
    setEmail('');
    setPass('');
    setPassTwo('');
    return
    }

    useEffect(() => {
      setAlertMessage('');
      setAlertSeverity('success');
      setOpenAlert(false);
      resetCreatUser();
    }, []);

    const handleCreateUser = () => {
        return createUser(email, name, pass, passTwo)
    }

  return (
    <Box>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Cadastro de usuário
          </Typography>
          <TextField id="outlined-basic" label='Digite seu nome' type='text' color='secondary' sx={{ mt: 2 }}
            onChange={(e) => setName(e.target.value)}></TextField >
          <TextField id="outlined-basic" label='Digite seu E-mail' type='email' color='secondary' sx={{ mt: 2 }}
            onChange={(e) => setEmail(e.target.value)}></TextField >
          <TextField id="outlined-basic" label='Digite sua senha' type='password'color='secondary' sx={{ mt: 2 }}
            onChange={(e) => setPass(e.target.value)}></TextField >
          <TextField id="outlined-basic" label='Confirme sua senha' type='password' color='secondary' sx={{ mt: 2 }}
            onChange={(e) => setPassTwo(e.target.value)}></TextField >
          <Button variant='contained' sx={{ mt: 2 }} onClick={() => (handleCreateUser(), resetCreatUser())}>Salvar usuário</Button>
          <Button variant='contained' color='error' onClick={() => (handleClose(), resetCreatUser())} sx={{ mt: 2 }}>Cancelar Cadastro</Button>
        </Box>
        </Modal>
    </Box>
  )
}

export default criarUsuario