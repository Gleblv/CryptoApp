import { useState } from 'react';

import CommonCoins from '../CommonCoins/CommonCoins';
import CoinList from '../CoinsList/CoinsList';
import ProfileModal from '../PortfolioModal/PortfolioModal'
import CoinInfo from '../CoinInfo/CoinInfo';

import { Button } from 'react-bootstrap';

import './App.css';

function App() {
  const [selectedCoin, setSelectedCoin] = useState(null);

  const getSelectedCoin = (id) => { // получаем id криптовалюты которую хотим добавить в profile из CoinList
    setSelectedCoin(id);
  }

  const openModal = () => {
    document.querySelector(".modal").style.display = "block";
  }

  return (
    <div className="App">
      <header className="App-header">
        <Button className='profile-button' onClick={() => openModal()} variant="outline-dark" size='lg'>Profile</Button>
        <CommonCoins/>
        <Button className='difference' variant="outline-dark" size='lg'>Difference</Button>
      </header>
      <main>
        {/* <CoinList getSelectedCoin={getSelectedCoin}/>
        <ProfileModal coinId={selectedCoin}/> */}
        <CoinInfo coinId={selectedCoin}/>
      </main>
    </div>
  );
}

export default App;
