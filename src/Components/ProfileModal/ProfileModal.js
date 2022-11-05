/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';

import ProfileItem from '../ProfileItem/ProfileItem';
import useCoinService from '../../services/CoinService';

import './ProfileModal.css'

const ProfileModal = ({coinId, coinCount, profileActive, profileVisible}) => {
    let styles = '';
    profileActive ? styles = 'modal visible' : styles = 'modal';

    const [coinsData, setCoinsData] = useState([]);

    const {getCoinById} = useCoinService();

    useEffect(() => {
        updateData();
    }, [coinCount])

    useEffect(() => {
        setCoinsData([...coinsData, ...getDataFromLocalStorage()]);
    }, [])

    const updateData = () => {
        if (!coinId || !coinCount) {
            return
        }

        getCoinById(coinId, coinCount)
            .then(data => addCoinData(data));
    }

    const addCoinData = (data) => {
        setCoinsData([...coinsData, data]);
    }

    const deleteCoin = (id) => {
        setCoinsData(coinsData => coinsData.filter(item => item.id !== id));
        localStorage.removeItem(id);
    }

    const getDataFromLocalStorage = () => {
        const dataFromLocalStorage = [];

        for (let i = 0, length = localStorage.length; i < length; i++) {
            const key = localStorage.key(i);
            const value = localStorage[key];

            dataFromLocalStorage.push({...JSON.parse(value), key});
        }

        return dataFromLocalStorage;
    }

    const getList = (arr) => {
        return !arr ? null :
            arr.map(item => {
                const price = parseFloat(item.priceUsd) * parseFloat(item.count);

                localStorage.setItem(item.id, JSON.stringify(item));

                return (
                    <ProfileItem
                        key={item.id}
                        id={item.id}
                        count={item.count}
                        name={item.name}
                        symbol={item.symbol}
                        price={parseFloat(price).toFixed(2)}
                        deleteCoin={deleteCoin}/>
                )
            })
    }

    const list = getList(coinsData);

    return (
        <div className={styles}>
            <div className="profile-modal-content">
                <div className="close-profile" onClick={() => profileVisible(false)}>&times;</div>
                <div className='profile-title'>Your's coins</div>
                <div className='profile-item-list'>
                    <div className='profile-list-item'>
                        <div className='profile-item-count'>
                            Count
                        </div>
                        <div className='profile-item-name'>
                            Name
                        </div>
                        <div className='profile-item-symbol'>
                            Symbol
                        </div>
                        <div className="profile-item-price">
                            Price
                        </div>
                        <div className='profile-control-buttons'>
                            Delete coin
                        </div>
                    </div>
                    {list}
                </div>
            </div>
        </div>
    )
}

export default ProfileModal;