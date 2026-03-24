import * as React from 'react';
import { styled, useTheme, Theme, CSSObject, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import { AccountCircle, Assessment, AssessmentOutlined, Assignment, AssignmentOutlined, Height, MenuBookOutlined, PlayArrowOutlined, Timer, TimerOutlined } from '@mui/icons-material';
import { InputBase, Menu, MenuItem, Badge, Collapse, Alert, Grid } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';
import Informacoes from './Informacoes';
import Materias from './Materias';
import logomarcasegundosbranca from '../assets/LogoMarcaSegundosBranca.png';
import { useSegundosContext } from '../providers/SegundosContext';
import Cronometro from '../components/Cronometro';
import Questoes from './Questoes';
import { useMemo } from 'react';


const drawerWidth = 200;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  border: 'none',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  border: 'none',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    border: 0,
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    variants: [
      {
        props: ({ open }) => open,
        style: {
          ...openedMixin(theme),
          '& .MuiDrawer-paper': openedMixin(theme),
          border: 0,
        },
      },
      {
        props: ({ open }) => !open,
        style: {
          ...closedMixin(theme),
          '& .MuiDrawer-paper': closedMixin(theme),
          border: 0,
        },
      },
    ],
  }),
);

const Principal = () => {


  const { logout, openAlert, alertMessage, alertSeverity, setOpenAlert, formatNumber, timer, user } = useSegundosContext();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);


  const formattedTime = useMemo(() => {
      return `${formatNumber(timer.hour, 2)}:${formatNumber(timer.minute, 2)}:${formatNumber(timer.second, 2)}:${formatNumber(timer.millisecond, 3)}`;
    }, [timer]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >  
      <MenuItem onClick={() => {logout(); }}>Sair da Conta</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Usuario</p>
      </MenuItem>
    </Menu>
  );
  const [menuExibido, setMenuExibido] = React.useState('Timer');

  const drawerMenuSet = (menu: String) => {

    if (menu === 'Informacoes') {
     return <Informacoes />;
    } else if (menu === 'Materias') {
      return <Materias />;
    } else if (menu === 'Timer') {
      return <Cronometro />;
    } else if (menu === 'Questoes') {
      return <Questoes />;
    }
  }

  return ( 
    <Box sx={{ width: '100%', height: '100%', display: 'flex', backgroundColor:'rgba(44, 84, 132, 0.5)'}}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Box sx={{ flexGrow: 1, backgroundColor: '#2c5484' }}>
      <AppBar position="fixed">
        <Toolbar sx={{ backgroundColor: '#2c5484'}}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={ open ? handleDrawerClose : handleDrawerOpen}
          >
            {open ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton> 
          <Box sx={{ flexGrow: 1 }} />         
          <TimerOutlined /> &nbsp;
          <Grid container fontSize={20} textAlign="center" fontWeight="bold" justifyContent="center" alignItems="center" color={'white'}>
          {formattedTime} &nbsp;
          </Grid>
          <Box sx={{ flexGrow: 1 }} />
          <Typography fontSize={20}>{(user.name).split(' ')[0]}</Typography>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
      </AppBar>
      <Drawer variant="permanent" open={open} sx={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}>
        <List sx={{ backgroundColor: '#2c5484', color: 'white', height:'100%', paddingTop: '80px'}}>
          <ListItemButton
          selected={menuExibido === 'Timer'}
          onClick={() => {setMenuExibido('Timer'); handleDrawerClose()}}
          >
          <ListItemIcon>
            <TimerOutlined sx={{ color: 'white' }}/>
          </ListItemIcon>
          <ListItemText primary="Cronômetro" />
        </ListItemButton>
          
          <ListItemButton
          selected={menuExibido === 'Informacoes'}
          onClick={() => {setMenuExibido('Informacoes'); handleDrawerClose()}}
          >
          <ListItemIcon>
            <AssessmentOutlined sx={{ color: 'white' }}/>
          </ListItemIcon>
          <ListItemText primary="Resumos" />
        </ListItemButton>

        <ListItemButton
          onClick={() => {setMenuExibido('Materias'); handleDrawerClose()}}
          selected={menuExibido === 'Materias'}
        >
          <ListItemIcon>
            <MenuBookOutlined sx={{ color: 'white' }}/>
          </ListItemIcon>
          <ListItemText primary="Matérias" />
        </ListItemButton>

        <ListItemButton
          onClick={() => {setMenuExibido('Questoes'); handleDrawerClose()}}
          selected={menuExibido === 'Questoes'}
        >
          <ListItemIcon>
            <AssignmentOutlined sx={{ color: 'white' }}/>
          </ListItemIcon>
          <ListItemText primary="Questões" />
        </ListItemButton>
        </List>
      </Drawer>
      <Box component="main" sx={{width: '100%', flexGrow: 1, p: 2, paddingLeft: 9, display: 'flex', flexDirection:'column', alignItems:'center', justifyItems: 'center'}}>
        <DrawerHeader />
        <Collapse in={openAlert} sx={{display: "flex", width: '100%'}}>
                  <Alert 
                   severity={alertSeverity as 'success' | 'error'}
                   onClose={() => setOpenAlert(false)} 
                   sx={{position: 'fixed', top: '10%', left: '80%', zIndex: 1000, transform:'translate(-100%, 10%)', width: '50%'}}>
                   {alertMessage}
                  </Alert>
                </Collapse>
        {drawerMenuSet(menuExibido)}
      </Box>
    </Box>

  );
}

export default Principal