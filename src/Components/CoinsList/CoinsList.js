/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import useCoinService from "../../services/CoinService";

import './coinsList.css';

const CoinsList = (props) => {

    const {getCoinsList} = useCoinService();

    const [coins, setCoins] = useState([]);

    useEffect(() => {
        getCoinsList()
            .then(setCoins);
    }, []);

    const getList = () => {
        const list = coins.map((item, i) => {
            return (
                <tr className='coin-info' key={i}>
                    <td>{item.name}</td>
                    <td>{item.symbol}</td>
                    <td>{item.priceUsd}</td>
                    <td><button className='addBtn' onClick={() => {props.getSelectedCoin(item.id)}}>+</button></td>
                </tr>
            )
        })

        return list;
    }

    const coinsList = getList();

    return (
        <table className='all-coin-list'>
            <caption className="coin-list-title">Information of coins</caption>
            <thead>
                <tr>
                    <td>Name</td>
                    <td>Symbol</td>
                    <td>Price (USD)</td>
                    <td>Add</td>
                </tr>
            </thead>
            <tbody>
                {coinsList}
            </tbody>
        </table>
    )
}

export default CoinsList;