import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';

import * as React from 'react';

import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';

import ListItemButton from '@mui/material/ListItemButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';

import './Default.scss';
import { useNavigate } from 'react-router';

const drawerWidth = 210;

function Layout({ children }) {

  const navigate = useNavigate();

  return (
    <div className="default">
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar>Processamento de dados </Toolbar>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Início" onClick={() => navigate("/")} />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        {/* TODO: Dashboards personalizadas */}
        {/* <Toolbar>Minhas dashboards</Toolbar>
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List> */}
      </Drawer>
      <main
        color='primary'
        className="content px-3 py-3"
      >
        <div />
        {children}
      </main>
    </div>
  );
}

export default Layout;
