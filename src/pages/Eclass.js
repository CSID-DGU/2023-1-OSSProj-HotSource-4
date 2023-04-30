import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, Container } from '@mui/material';
import React, { useState } from 'react';
import Modal from 'react-modal';
import Home from './Home';
import Header from '../components/Header';
import '../css/Eclass.css';

Modal.setAppElement('#root'); // 모달이 포함된 컴포넌트의 DOM element를 지정

function Eclass() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <div>
    <Box textAlign='center' sx={{ mx: 'auto'/*auto 하면 가운데 정렬, 1하면 좌측 마진*/, mt: 3, maxWidth: '100px' }}>
      <Button onClick={openModal}
      variant='outlined'
      sx={{ borderColor: '#FF9500', color: '#FF6A00'}}    
      >
        개인 채팅</Button>
        </Box>
      <Modal className="Modal"
      isOpen={isModalOpen} onRequestClose={closeModal} >
      <div style={{ minWidth: "800px", /*모달 가로 길이*/
      border: "2px solid #FF9500", /* 테두리 두께와 색상 설정 */}}>
        <Header />
        <Home /> 
        </div>
        <div><Button size='large' variant='outlined'sx={{ mb: 1, borderColor: '#FF9500', color: '#FF6A00'}}
        onClick={closeModal}>닫기</Button>
        </div>
      </Modal>
      
    </div>
  );
}

export default Eclass;

// import { useNavigate } from 'react-router-dom';
// import { Box, TextField, Button, Typography, Container } from '@mui/material';
// import React from 'react';

// const Eclass = () => {
//     const navigate = useNavigate();

//     return (
//         <Box textAlign='center' sx={{ mx: 'auto'/*auto 하면 가운데 정렬, 1하면 좌측 마진*/, mt: 3, maxWidth: '100px' }}>
//             <Button
//             fullWidth
//             onClick={() => {
//                 navigate('/');
//             }}
//             variant='outlined'
//             sx={{ borderColor: '#FF9500', color: '#FF6A00'}}
//             >
//                 개인 채팅
//             </Button>
//         </Box>
//     );
// };

// export default Eclass;