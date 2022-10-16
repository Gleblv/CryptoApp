import CoinCard from "../CoinCard/CoinCard";

import './CommonCoins.css';

const CoinList = () => {
    return (
        <div className="coin-list">
            <CoinCard/>
            <CoinCard/>
            <CoinCard/>
        </div>
    )
}

export default CoinList;