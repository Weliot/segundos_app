import React, { useState, useContext, use, useEffect } from 'react';
import 'bootstrap';
import { Box, Grid, TextField, Button, Typography} from '@mui/material';
import {useSegundosContext} from '../providers/SegundosContext';
import logostooda from '../assets/LogoStoodaFinal.png';
import letreirosegundos from '../assets/LetreiroSegundos.png';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import Modal from '@mui/material/Modal';
import AcessoRequestDTO from '../api/types/request/acessoRequestDTO';

const Login = () => {

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
  
  const handleLogin = (email: string, senha: string) => {
    const acessoRequest: AcessoRequestDTO = {
      emailUsuario: email,
      passwordUsuario: senha
    }

    return login(acessoRequest)
    }

  const handleCreateUser = () => {

    return createUser(email, name, pass, passTwo)
    }

  return (
    <Box sx={{padding: 2, backgroundColor: '#2c5484'}}>
      <Grid container sx={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%'}}>
        <Collapse in={openAlert}>
        <Alert 
        severity={alertSeverity as 'success' | 'error'}
        onClose={() => setOpenAlert(false)} 
        sx={{position: 'absolute', top: '10%', left: '50%', transform:'translate(-50%, -50%)'}}>
          {alertMessage}
        </Alert>
        </Collapse>
      </Grid>
      <Grid spacing={2} sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height:'100vh', width: '100%'}}>
        <Grid sx={{ display: 'flex', width: '50%', justifyContent: 'center', alignItems: 'center', marginBottom: 2, minWidth: '300px', flexDirection: 'column'}}>
          <Box  sx={{flexDirection: 'row', flexWrap: 'wrap', display: 'flex', width: '100%', padding: 2, border: '1px solid #ccc', borderRadius: 2, backgroundColor: 'white', color: '#2c5484', justifyContent: 'center', alignItems: 'center', minWidth: '300px' }}>
            <Box gridRow={6} sx={{ display: 'flex', flexDirection: 'column',  alignItems: 'center', justifyContent: 'center', minWidth: '200px', width: '40%'}}>
              <img
              src={logostooda}
              alt='Horas Logo'
              style={{ width: '50%', marginRight: '10px' }}
              ></img>
              <img
              src={letreirosegundos}
              alt='Horas Logo'
              style={{ width: '100%', height: '100%', marginRight: '10px' }}
              ></img>
            </Box>
            <Box gridRow={6} sx={{ display: 'flex', flexDirection: 'column', minWidth: '250px', width: '60%'  }}>
            <Typography sx={{textAlign: 'left'}} variant='h6'>
              Digite seu email:
            </Typography>
            <TextField
              sx={{ color: 'white' }}
              fullWidth
              required
              value={user.email}
              size='small'
              label="Email"
              variant="outlined"
              margin="normal"
              onChange={(e) => {if (user !== null) {
                setUser({...user, email: e.target.value})
              }}
              } // Update user email
            />
            <Typography sx={{textAlign: 'left'}} variant='h6'>
              Digite sua senha:
            </Typography>
            <TextField
              required
              fullWidth
              value={password}
              size='small'
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleLogin(user?.email || '', password);
                }
              }}
            />
            </Box>
          </Box>
        </Grid>
        <Grid display={'flex'} gap={2} spacing={2} flexDirection={'column'} justifyContent='center' alignItems='center' sx={{ width: '100%' }}>
            <Button
            variant='contained' 
            onClick = {() => handleLogin(user?.email || '', password) }
            sx={{backgroundColor: 'white', color: '#2c5484', width: '25%',  minWidth: '150px'}}>
              <b>Entrar</b>
            </Button>
            <Grid container spacing={2} sx={{ width: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row',  minWidth: '200px' }}>
            <Button variant='contained' onClick={handleOpen} sx={{backgroundColor: 'white', color: '#2c5484', width: '24%',  minWidth: '150px'}}>
              <b>Cadastrar</b>
            </Button>
            <Button variant='contained' sx={{backgroundColor: 'white', color: '#2c5484',  width: '24%',  minWidth: '150px'}}>
              <b>Recuperar Senha</b>
            </Button>
            </Grid>
        </Grid>
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
          <Button variant='contained' sx={{ mt: 2 }} disabled={(pass !== passTwo) || (pass === '')} onClick={() => (handleCreateUser(), resetCreatUser(), handleClose())}>Salvar usuário</Button>
          <Button variant='contained' color='error' onClick={() => (handleClose(), resetCreatUser())} sx={{ mt: 2 }}>Cancelar Cadastro</Button>
        </Box>
      </Modal>
      </Grid>
    </Box>
)}

export default Login