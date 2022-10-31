/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';

import useCoinService from '../../services/CoinService';

import './PortfolioModal.css'

const ProfileModal = (props) => {
    const [coinList, setCoinList] = useState([]);

    const {getCoinById} = useCoinService();

    useEffect(() => {
        updateInfo();
    }, [props.coinId]);

    const updateInfo = () => {
        const {coinId} = props;

        if (coinId === null || coinId === undefined) {
            return;
        }

        getCoinById(props.coinId)
        .then(coin => setCoinList(coinList => [...coinList, coin]))
        .then(addToLocalStorage);
    }

    // useEffect(() => {
    //     for(let key in localStorage) {
    //         if (!localStorage.hasOwnProperty(key)) {
    //             continue; // пропустит такие ключи, как "setItem", "getItem" и так далее
    //         }


    //         setCoinList(coinList => [...coinList, JSON.parse(localStorage.getItem(key))]);
    //     }
    // }, []);

    const closeModal = () => { // функция для закрытия модального окна
        document.querySelector(".modal").style.display = "none";
    }

    const addToLocalStorage = () => { // добавление элементов в localStorage
        coinList.forEach((coin) => {
            if (coin !== null && coin !== undefined) {
                localStorage.setItem(JSON.stringify(coin.id), JSON.stringify(coin));
            }
        })
    }

    const deleteCoin = (deleteCoinId) => { // удаление элементов из списка
        // eslint-disable-next-line array-callback-return
        setCoinList(coinList => coinList.filter(coin => {
            if (coin !== null & coin !== undefined) {
                return(coin.id !== deleteCoinId)
            }
        }));

        if (localStorage.getItem(deleteCoin)) {
            localStorage.removeItem(JSON.stringify(deleteCoinId));
        }
    }

    const getList = () => { // формируем список из элементов массива
        console.log(coinList);
        // eslint-disable-next-line array-callback-return
        const list = coinList.map((item) => {
            if (item !== null && item !== undefined) {
                return (
                    <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.symbol}</td>
                        <td>{item.priceUsd}</td>
                        <td><button onClick={() => {deleteCoin(item.id)}} className='delete-crypto'>—</button></td>
                    </tr>
                )
            } else {
                return;
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