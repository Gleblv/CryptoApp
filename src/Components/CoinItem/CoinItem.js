import { useState } from 'react';
import { Link } from 'react-router-dom';

import './coinItem.css';

const CoinItem = ({id, name, symbol, price, supply, maxSupply, changePercent24Hr, getSelectedCoin}) => {
    const [isActive, setIsActive] = useState(false);

    let itemStyle = "coins-list-item"

    if (isActive) {
        itemStyle += " active"
    } else {
        itemStyle = "coins-list-item";
    }

    return (
        <div className={itemStyle}>
            <div className='coin-title'>
                <div className='coin-name'>
                    {name}
                </div>
                <div className='coin-symbol'>
                    {symbol}
                </div>
                <div className="coin-price">
                    {price}
                </div>
                <button className='coin-btn-content' onClick={() => setIsActive(!isActive)}>{isActive ? "Hide" : "More"}</button>
            </div>
            {isActive ? <Content getSelectedCoin={getSelectedCoin} id={id} supply={supply} maxSupply={maxSupply} changePercent24Hr={changePercent24Hr}/> : null}
        </div>
    )
}

const Content = ({getSelectedCoin, id, supply, maxSupply, changePercent24Hr}) => {
    return (
        <div className='coin-content'>
            <div className='info-of-coin'>
                <div className='suply'>Supply: {supply ? supply : "Information absent"}</div>
                <div className='max-suply'>Max supply: {maxSupply ? maxSupply : "Information absent"}</div>
                <div className='change-percent'>Percent change for 24 hours: {changePercent24Hr ? changePercent24Hr : "Information absent"}</div>
            </div>
            <div className='controls'>
                <button className='coin-add-btn' onClick={() => getSelectedCoin(id)}>Add coin</button>
                <button className='to-page-btn' onClick={() => getSelectedCoin(id)}>
                    <Link to="/coin">Go to page</Link>
                </button>
            </div>
        </div>
    )
}

export default CoinItem;