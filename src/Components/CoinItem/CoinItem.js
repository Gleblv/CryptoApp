import { useState } from 'react';
import { Link } from 'react-router-dom';

import './coinItem.css';

const CoinItem = ({id, name, symbol, price, getSelectedCoin}) => {

    return (
        <div className='coins-list-item'>
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
                <div className='control-buttons'>
                    <button className='coin-add-btn' onClick={() => getSelectedCoin(id)}>Add coin</button>
                    <button className='to-page-btn' onClick={() => getSelectedCoin(id)}><Link to="/coin">To page</Link></button>
                </div>
            </div>
        </div>
    )
}

export default CoinItem;