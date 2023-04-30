import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, Container } from '@mui/material';
import React, { useState } from 'react';
import Modal from 'react-modal';
import Home from './Home';
import Header from '../components/Header';
import '../css/Eclass.css';
import TeamChat from './TeamChat';

Modal.setAppElement('#root'); // 모달이 포함된 컴포넌트의 DOM element를 지정

function Eclass() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTeamChat, setIsTeamChat] = useState(false);
  const navigate = useNavigate();

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setIsTeamChat(false);
  }

  function toggleView() {
    setIsTeamChat(prevState => !prevState);
  }

  return (
    <div>
      <Box textAlign='center' sx={{ mx: 'auto', mt: 3, maxWidth: '300px' }}>
        <Button onClick={openModal} variant='outlined' sx={{ borderColor: '#FF9500', color: '#FF6A00'}}>
          개인 채팅 / 조원 단체 채팅
        </Button>
      </Box>
      <Modal className='Modal' isOpen={isModalOpen} onRequestClose={closeModal}>
        <div style={{ minWidth: '800px', border: '2px solid #FF9500' }}>
          <Header />
          {isTeamChat ? <TeamChat /> : <Home />}
        </div>
        <div>
          <Button
            fullWidth
            onClick={toggleView}
            variant='outlined'
            sx={{ borderColor: '#FF9500', color: '#FF6A00', margin: '10px 0', marginLeft: 1 ,minWidth:"200px", maxWidth: "200px", display: 'block' }}
          >
            {isTeamChat ? '개인 채팅으로' : '조원 단체 채팅으로'}
          </Button>
          <Button
            fullWidth
            onClick={closeModal}
            variant='outlined'
            sx={{ borderColor: '#FF9500', color: '#FF6A00', marginLeft: 1 ,minWidth:"200px", maxWidth: "200px" }}
          >
            닫기
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default Eclass;
