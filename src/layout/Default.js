import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';

import { useEffect, useState } from 'react';

import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';

import ListItemButton from '@mui/material/ListItemButton';
import ModalError from '../components/Modal/ModalError';

import { useNavigate } from 'react-router';
import { RiFileExcel2Line } from '@react-icons/all-files/ri/RiFileExcel2Line';
import { ImCloudUpload } from '@react-icons/all-files/im/ImCloudUpload'
import { GoLogoGithub } from '@react-icons/all-files/go/GoLogoGithub'
import { AiFillGithub } from '@react-icons/all-files/ai/AiFillGithub'
import { BsCodeSlash } from '@react-icons/all-files/bs/BsCodeSlash'

import api from '../utils/api';

import './Default.scss';

const drawerWidth = 210;

function Layout({ children }) {

  const navigate = useNavigate();

  const [storedItems, setStoredItems] = useState([]);

  useEffect(() => {

    const storedContent = JSON.parse(localStorage.getItem('storage')) || [];
    setStoredItems(storedContent);
  }, [localStorage.getItem('storage')])

  const [serverUpstream, setServerUpstream] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchData();
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  async function fetchData() {
    const response = await api.get('/health').catch((e) => {
      setServerUpstream(false);
    });

    if (response) {
      const { status } = response;
      setServerUpstream(true);
    }
  }

  const [messageErrorTitle, setMessageErrorTitle] = useState('');
  const [messageErrorOpen, setMessageErrorOpen] = useState(false);
  const [messageErrorMessage, setMessageErrorMessage] = useState('');

  useEffect(() => {

    if (serverUpstream == false) {
      setMessageErrorOpen(true);
      setMessageErrorTitle('Servidor offline');
      setMessageErrorMessage('O servidor de processamento está inoperante, tente novamente em instantes.')
    }
    console.log("The server is " + (serverUpstream == true ? "up" : "down"));
  }, [serverUpstream])


  const backend = () => {
    let a = document.createElement('a');
    a.target = '_blank';
    a.href = 'https://github.com/kaiofgl/data-analysis-backend';
    a.click();
  }

  const frontend = () => {
    let a = document.createElement('a');
    a.target = '_blank';
    a.href = 'https://github.com/kaiofgl/data-analysis-frontend';
    a.click();
  }

  return (
    <div className='default'>
      <ModalError
        title={messageErrorTitle}
        open={messageErrorOpen}
        message={messageErrorMessage}
        onClose={() => setMessageErrorOpen(false)}
      ></ModalError>
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
              <ListItemText className='mx-2 dashboardText' primary='Backend' onClick={() => backend()} />
            </ListItemButton>
          </div>
          <div className='frontned d-flex align-content-center'>
            <ListItemButton>
              <AiFillGithub />
              <ListItemText className='mx-2 dashboardText' primary='Frontend' onClick={() => frontend()} />
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
