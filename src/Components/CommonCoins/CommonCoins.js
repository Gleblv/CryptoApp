/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import useCoinService from '../../services/CoinService'

import './CommonCoins.css';

const CoinList = () => {
    const {getCommonCoins} = useCoinService();

    const [commonCoins, setCommonCoins] = useState([]);

    useEffect(() => {
        getCommonCoins()
            .then(setCommonCoins);
    }, []);

    const getList = () => {
        const commonCoinsList = commonCoins.map((item, i) => {
            return (
                <li key={i} className="coin-card">
                    <div className="logo">{item.symbol}</div>
                    <div className="price">{parseFloat(item.rateUsd).toFixed(2)}</div>
                </li>
            )
        });

        return(commonCoinsList)
    }

    const coinsList = getList();

    return (
        <div className="common-coins">
            <div className="common-coins-title">Commons Coins</div>
            <ul className="coin-list">
                {coinsList}
            </ul>
        </div>
    )
}

export default CoinList;