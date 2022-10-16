import CoinInf from '../CoinInf/CoinInf';

import './coinsList.css';

const CoinsList = () => {
    return (
        <ul className='inf-list-coin'>
            <CoinInf/>
            <CoinInf/>
            <CoinInf/>
            <CoinInf/>
            <CoinInf/>
        </ul>
    )
}

export default CoinsList;