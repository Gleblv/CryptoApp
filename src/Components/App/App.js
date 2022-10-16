import CommonCoins from '../CommonCoins/CommonCoins';
import CoinList from '../CoinsList/CoinsList';

import { Button } from 'react-bootstrap';

import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Button className='profile-button' variant="outline-dark" size='lg'>Profile</Button>
        <CommonCoins/>
        <Button className='difference' variant="outline-dark" size='lg'>Difference</Button>
      </header>
      <main>
        <CoinList/>
      </main>
    </div>
  );
}

export default App;
