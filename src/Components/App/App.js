/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import CommonCoins from '../CommonCoins/CommonCoins';
import CoinList from '../CoinsList/CoinsList';
import ProfileModal from '../ProfileModal/ProfileModal'
import CoinInfo from '../CoinInfo/CoinInfo';
import AskCount from '../AskCount/AskCount';

import { Button } from 'react-bootstrap';

import './App.css';

function App() {
  const [selectedCoinId, setSelectedCoinId] = useState(null);
  const [askCountActive, setAskCountActive] = useState(false);
  const [profileActive, setProfileActive] = useState(false);
  const [coinCount, setCoinCount] = useState(null);
  const [profileCost, setProfileCost] = useState(0);

  const getSelectedCoin = (id) => { // получаем id криптовалюты которую хотим добавить в profile из CoinList
    setSelectedCoinId(id);
  }

  const getCoinCount = (count) => {
    setCoinCount(count);
  }

  const profileVisible = (status) => {
    setProfileActive(status);
  } 

  const askCountVisible = (status) => {
    setAskCountActive(status);
  }

  const getProfileCost = (cost) => {
    setProfileCost(cost);
  }

  return (
    <Router>
      <div className="App">
        <div className='navigation'>
          <Button className='profile-button' onClick={() => profileVisible(true)} variant="outline-dark" size='lg'>Profile</Button>
          <Button className='difference' variant="outline-dark" size='lg'>{parseFloat(profileCost).toFixed(2)}$</Button>
        </div>
        <CommonCoins/>
        <Routes>
          <Route path="/" element={<CoinList getSelectedCoin={getSelectedCoin} askCountVisible={askCountVisible}/>}/>
          <Route path="/:coinId" element={<CoinInfo coinId={selectedCoinId}/>}/>
        </Routes>
        <AskCount askCountActive={askCountActive} askCountVisible={askCountVisible} getCoinCount={getCoinCount}/>
        <ProfileModal getProfileCost={getProfileCost} profileActive={profileActive} profileVisible={profileVisible} coinId={selectedCoinId} coinCount={coinCount}/>
      </div>
    </Router>
  );
}

export default App;
