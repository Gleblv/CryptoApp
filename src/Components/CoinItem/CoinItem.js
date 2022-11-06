import { NavLink } from 'react-router-dom';

import './coinItem.css';

const CoinItem = ({id, name, symbol, price, getSelectedCoin, askCountVisible}) => {
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
                    {price}$
                </div>
                <div className='control-buttons'>
                    <button className='coin-add-btn' onClick={() => {getSelectedCoin(id); askCountVisible(true)}}>Add coin</button>
                    <button className='to-page-btn' onClick={() => getSelectedCoin(id)}><NavLink className="link-to-page" activeStyle={{"color": "#F1FFE7"}} to="/coin">To page</NavLink></button>
                </div>
            </div>
        </div>
    )
}

export default CoinItem;