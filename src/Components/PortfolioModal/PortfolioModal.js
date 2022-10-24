/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';

import useCoinService from '../../services/CoinService';

import './PortfolioModal.css'

const ProfileModal = (props) => {
    const [coinList, setCoinList] = useState([]);

    const {getCoinById} = useCoinService();

    useEffect(() => {
        getCoinById(props.coinId)
        .then(coin => setCoinList(coinList => [...coinList, coin]))
        .then(addToLocalStorage);
    }, [props.coinId]);

    const closeModal = () => { // функция для закрытия модального окна
        document.querySelector(".modal").style.display = "none";
    }

    const addToLocalStorage = () => {
        coinList.forEach((item, i) => {
            if (item !== undefined && item !== null) {
                localStorage.setItem(JSON.stringify(i), JSON.stringify(item));
            }
        })
    }

    const deleteCoin = (deleteCoinId) => {
        coinList.forEach((coin, i) => {
            if (coin !== null && coin !== undefined && coin.id === deleteCoinId) {
                setCoinList(coinList => coinList.splice(i, 1));
            }
        });
    }

    const getList = () => { // формируем список из элементов массива
        for(let key in localStorage) {  // берём данные из localStorage
            if (!localStorage.hasOwnProperty(key)) {
              continue; // пропустит такие ключи, как "setItem", "getItem" и так далее
            }

            coinList.forEach((item) => {
                if (item !== null && item !== undefined && item.id !== localStorage.getItem(key).id) {
                    coinList.push(localStorage.getItem(key));
                }
            })
        }

        // eslint-disable-next-line array-callback-return
        const list = coinList.map((item) => {
            if (item !== null && item !== undefined) {
                return (
                    <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.symbol}</td>
                        <td>{item.priceUsd}</td>
                        <td><button onClick={() => {deleteCoin(item.id)}} className='delete-crypto'>-</button></td>
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
                            <td>Delete</td>
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