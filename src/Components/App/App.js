/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

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
  const [profileCost, setProfileCost] = useState(null);


  useEffect(() => {
    getProfileCost();
  }, [coinCount])

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

  const getProfileCost = () => {
    let price = 0;

    for (let i = 0, length = localStorage.length; i < length; i++) {
      const key = localStorage.key(i);
      const value = localStorage[key];

      price += parseFloat(JSON.parse(value).priceUsd);
    }

    setProfileCost(price);
  }

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Button className='profile-button' onClick={() => profileVisible(true)} variant="outline-dark" size='lg'>Profile</Button>
          <CommonCoins/>
          <Button className='difference' variant="outline-dark" size='lg'>{profileCost ? `${profileCost.toFixed(2)}$` : "Difference"}</Button>
        </header>
        <main>
          <Switch>
            <Route exact path="/">
              <CoinList getSelectedCoin={getSelectedCoin} askCountVisible={askCountVisible}/>
              <AskCount askCountActive={askCountActive} askCountVisible={askCountVisible} getCoinCount={getCoinCount}/>
            </Route>
            <Route exact path="/coin">
              <CoinInfo coinId={selectedCoinId}/>
            </Route>
          </Switch>
          <ProfileModal profileActive={profileActive} profileVisible={profileVisible} coinId={selectedCoinId} coinCount={coinCount}/>
        </main>
      </div>
    </Router>
  );
}

export default App;
