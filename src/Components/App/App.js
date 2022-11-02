/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import CommonCoins from '../CommonCoins/CommonCoins';
import CoinList from '../CoinsList/CoinsList';
import ProfileModal from '../PortfolioModal/PortfolioModal'
import CoinInfo from '../CoinInfo/CoinInfo';

import { Button } from 'react-bootstrap';

import './App.css';

function App() {
  const [selectedCoinId, setSelectedCoinId] = useState(null);

  const getSelectedCoin = (id) => { // получаем id криптовалюты которую хотим добавить в profile из CoinList
    setSelectedCoinId(id);
  }

  const openModal = () => {
    document.querySelector(".modal").style.display = "block";
  }

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Button className='profile-button' onClick={() => openModal()} variant="outline-dark" size='lg'>Profile</Button>
          <CommonCoins/>
          <Button className='difference' variant="outline-dark" size='lg'>Difference</Button>
        </header>
        <main>
          <Switch>
            <Route exact path="/">
              <CoinList getSelectedCoin={getSelectedCoin}/>
            </Route>
            <Route exact path="/coin">
              <CoinInfo coinId={selectedCoinId}/>
            </Route>
          </Switch>
          <ProfileModal coinId={selectedCoinId}/>
        </main>
      </div>
    </Router>
  );
}

export default App;
