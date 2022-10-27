import { useState } from 'react';

import './coinItem.css';

const CoinItem = ({id, name, symbol, price, getSelectedCoin}) => {
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
            {isActive ? <Content getSelectedCoin={getSelectedCoin} id={id}/> : null}
        </div>
    )
}

const Content = ({getSelectedCoin, id}) => {
    return (
        <div className='coin-content'>
            <div className='info-of-coin'>Some Text</div>
            <button className='coin-add' onClick={() => getSelectedCoin(id)}>Add coin</button>
        </div>
    )
}

export default CoinItem;