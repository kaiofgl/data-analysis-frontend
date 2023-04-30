import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';

import { useEffect, useState } from 'react';

import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';

import ListItemButton from '@mui/material/ListItemButton';

import { useNavigate } from 'react-router';
import { RiFileExcel2Line } from '@react-icons/all-files/ri/RiFileExcel2Line';
import { ImCloudUpload } from '@react-icons/all-files/im/ImCloudUpload'
import { GoLogoGithub } from '@react-icons/all-files/go/GoLogoGithub'
import { AiFillGithub } from '@react-icons/all-files/ai/AiFillGithub'
import { BsCodeSlash } from '@react-icons/all-files/bs/BsCodeSlash'


import './Default.scss';

const drawerWidth = 210;

function Layout({ children }) {

  const navigate = useNavigate();

  const [storedItems, setStoredItems] = useState([]);

  useEffect(() => {
    const storedContent = JSON.parse(localStorage.getItem('storage')) || [];
    setStoredItems(storedContent);
  }, [localStorage.getItem('storage')])

  return (
    <div className='default'>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant='permanent'
        anchor='left'
      >
        <Toolbar>Processamento de dados </Toolbar>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ImCloudUpload />
              <ListItemText className='mx-2 dashboardText' primary='Enviar Arquivo' onClick={() => navigate('/')} />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        {/* TODO: Dashboards personalizadas */}
        {
          storedItems.length > 0 &&
          <div>
            <Toolbar>Meus envios</Toolbar>
            <List>
              {storedItems.map((content, index) => (
                <ListItem key={content.filename} disablePadding>
                  <ListItemButton onClick={() => navigate('/dashboard/' + content.filename)} className='px-3'>
                    <RiFileExcel2Line />
                    <ListItemText className='mx-2 dashboardText' primary={
                      content.filename_friendly.length > 20 ? content.filename_friendly.substring(0, 20) + '...'
                        :
                        content.filename_friendly + '.' + content.extension
                    } />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </div>
        }
        <div className='github pb-3'>
          <div className='logo'>
            <GoLogoGithub />
          </div>
          <div className='backend d-flex align-content-center'>
            <ListItemButton>
              <AiFillGithub />
              <ListItemText className='mx-2 dashboardText' primary='Backend' onClick={() => navigate('/')} />
            </ListItemButton>
          </div>
          <div className='frontned d-flex align-content-center'>
            <ListItemButton>
              <AiFillGithub />
              <ListItemText className='mx-2 dashboardText' primary='Frontend' onClick={() => navigate('/')} />
            </ListItemButton>
          </div>
          <div className='dashboardText'>
            <div className='px-3'>
              <BsCodeSlash />
              <span className='px-2 pb-2'>
                Colaboradores:
              </span>
            </div>
            <div className='px-3 d-flex flex-column'>
              <span>
                Kaio Felipe
              </span>
              <span>
                Pedro Mota
              </span>
              <span>
                Isadora H.
              </span>
              <span>
                Helyf Avila
              </span>
              <span>
                Leandro Prado
              </span>
            </div>

          </div>
        </div>
      </Drawer>
      <main
        color='primary'
        className='content px-3 py-3'
      >
        <div />
        {children}
      </main>
    </div>
  );
}

export default Layout;
