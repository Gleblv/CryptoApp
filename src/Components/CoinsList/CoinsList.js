/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import CoinItem from '../CoinItem/CoinItem';
import useCoinService from "../../services/CoinService";

import './coinsList.css';

const CoinsList = ({getSelectedCoin}) => {

    const {getCoinsList} = useCoinService();

    const [coins, setCoins] = useState([]);

    useEffect(() => {
        getCoinsList()
            .then(setCoins);
    }, []);

    const getList = () => {
        const list = coins.map((item) => {
            return (
                <CoinItem 
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    symbol={item.symbol}
                    price={item.priceUsd}
                    getSelectedCoin={getSelectedCoin}
                    supply={item.supply}
                    maxSupply={item.maxSupply}
                    changePercent24Hr={item.changePercent24Hr}/>
            )
        })

        return list;
    }

    const coinsList = getList();

    return (
        <div className="coins-list">
            {coinsList}
        </div>
    )
}

export default CoinsList;