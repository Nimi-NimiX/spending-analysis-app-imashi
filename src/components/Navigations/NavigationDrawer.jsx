import * as React from 'react';
import { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Statistics from '@mui/icons-material/ShowChart';
import Transactions from '@mui/icons-material/ReceiptLong'
import Budget from '@mui/icons-material/AttachMoney'
import { Avatar, Container, Tooltip } from '@mui/material';
import AllTransactions from '../../views/AllTransactions';
import { BudgetingPage } from '../../views/Budget';

const drawerWidth = 230;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
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
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function NavigationDrawer() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [selectedNavItem, setSelectedNavItem] = useState('budget'); // Initial selected item

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleNavigation = (text) => {
    setSelectedNavItem(text);
  };

  const customizedAppBar = () => {
    return (
      <AppBar position="fixed" open={open}>
        <Toolbar className='flexRow' sx={{backgroundColor:"secondary", justifyContent: 'space-between'}}>
            {/* menu icon */}
            <Box>
              <IconButton
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                  marginRight: 5,
                  ...(open && { display: 'none' }),
                  color: 'other.white',
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                    variant="h6"
                    noWrap
                    component="span"
                    color="other.white"
                    fontWeight='900'
                    fontSize='1.2rem'
                    >
                    Spendee
                  </Typography>
            </Box>
            <Tooltip title="Open settings">
            <IconButton onClick={() => { console.log('profile icon clicked') }} sx={{ p: 0 }}>
                    <Avatar alt="profile name" src="/static/images/profile-pic.jpg" />
                </IconButton>
            </Tooltip>
        </Toolbar>
      </AppBar>
    );
  }
  return (
    <Box className={'flexRow'}>
      <CssBaseline />
      {customizedAppBar()}
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem key={'budget'} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              // Add an onClick handler to handle navigation
              onClick={() => handleNavigation('budget')}
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <Budget />
                </ListItemIcon>
              <ListItemText primary={'Budget'} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          <ListItem key={'transactions'} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              onClick={() => handleNavigation('transactions')}
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <Transactions />
                </ListItemIcon>
              <ListItemText primary={'Transactions'} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          <ListItem key={'report'} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              onClick={() => handleNavigation('report')}
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <Statistics />
                </ListItemIcon>
              <ListItemText primary={'Overview'} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {/* Render dynamic content based on the selected navigation item */}
        {selectedNavItem === 'budget' && (
          <Typography paragraph>
            <BudgetingPage />
          </Typography>
        )}
        {selectedNavItem === 'transactions' && (
          <Container>
            <AllTransactions/>
          </Container>
        )}
        {selectedNavItem === 'report' && (
          <Typography>monthly overview</Typography>
        )}
      </Box>
    </Box>
  );
}
