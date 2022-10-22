/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';

import useCoinService from '../../services/CoinService';

import './PortfolioModal.css'

const ProfileModal = (props) => {
    const [coinList, setCoinList] = useState([]);

    const {getCoinById} = useCoinService();

    useEffect(() => {
        getCoinById(props.coinId)
        .then(coin => setCoinList(coinList => [...coinList, coin]));
    }, [props.coinId]);

    const closeModal = () => { // функция для закрытия модального окна
        document.querySelector(".modal").style.display = "none";
    }

    const getList = () => { // формируем список из элементов массива
        // eslint-disable-next-line array-callback-return
        const list = coinList.map((item) => {
            if (item !== null && item !== undefined) {
                return (
                    <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.symbol}</td>
                        <td>{item.priceUsd}</td>
                    </tr>
                )
            }
        })
        
        return list;
    }
    
    const myCoinsList = getList();

    return (
        <div id="myModal" className="modal">
            <div className="modal-content">
                <table className='pofile-coin-list'>
                    <caption>Your's coins</caption>
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td>Symbol</td>
                            <td>Price (USD)</td>
                        </tr>
                    </thead>
                    <tbody>
                        {myCoinsList}
                    </tbody>
                </table>
                <span className="close" onClick={() => closeModal()}>&times;</span>
            </div>
        </div>
    )
}

export default ProfileModal;