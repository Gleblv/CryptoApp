/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Line } from 'react-chartjs-2';

import useCoinService from '../../services/CoinService';

import './CoinInfo.css';

const CoinInfo = ({coinId}) => {
    const {getCoinHistory, getCoinById} = useCoinService();

    const [coinHistory, setCoinHistory] = useState();
    const [coinData, setCoinData] = useState();

    useEffect(() => {
        updateData();
    }, []);

    const updateData = () => {
        if (coinId === null || coinId === undefined) {
            return;
        }

        getCoinHistory(coinId)
            .then(onCoinHistory);

        getCoinById(coinId)
            .then(onCoinData);
    }

    const onCoinHistory = (data) => {
        setCoinHistory(data);
    }

    const onCoinData = (data) => {
        setCoinData(data);
    }

    const getLabelsForX = (arr) => {
        return !arr ? null : arr.map(coin => {
            return (parseFloat(coin.priceUsd).toFixed(2));
        })
    }

    const getLabelsForY = (arr) => {
        return !arr ? null : arr.map(coin => {
            let date = new Date(coin.date);
            let months = date.getMonth();
            let days = date.getDate();
            return (`${days}.${parseFloat(months) < 10 ? `0${months}` : months}`);
        })
    }

    const getNameOfCoin = (obj) => {
        return !obj ? null : coinData.name;
    }

    const getDataOfCoin = (obj) => {
        return !obj ? null : (
            <div className='info-on-coin-page'>
                <div className='price-info-page сharacteristic'>
                    <label className='price-label labels' htmlFor="price-value">Price</label> 
                    <div className='price-value values' id="price-value">{parseFloat(obj.priceUsd).toFixed(2)}$</div>
                </div>
                <div className='change-info-page сharacteristic'>
                    <label className='change-label labels' htmlFor="price-value">Change for 24h</label> 
                    <div className='change-value values' id="price-value">{parseFloat(obj.changePercent24Hr).toFixed(2)}$</div>
                </div>
                <div className='supply-info-page сharacteristic'>
                    <label className='supply-label labels' htmlFor="price-value">Supply</label> 
                    <div className='supply-value values' id="price-value">{parseFloat(obj.supply).toFixed(2)}$</div>
                </div>
            </div>
        )
    }

    const infoOfCoin = getDataOfCoin(coinData);

    // const getDataOfCoin = (obj) => {
    //     return !obj ? null : (

    //     )
    // }

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );
      
    const options = {};

    const data = {
        labels: getLabelsForY(coinHistory),
        datasets: [
            {
            label: 'Price',
            data: getLabelsForX(coinHistory),
            borderColor: '#0D1821',
            backgroundColor: '#0D1821',
            color: '#F1FFE7',
            fill: true
            }
        ],
    };

    return (
        <div className='info-on-page'>
            <div className='name-price-page'>{getNameOfCoin(coinData)}Price</div>
            <Line className='schedule' data={data} options={options}/>
            {infoOfCoin}
        </div>
    )
}

export default CoinInfo;