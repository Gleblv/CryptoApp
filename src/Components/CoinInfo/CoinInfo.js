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
            return (coin.priceUsd);
        })
    }

    const getLabelsForY = (arr) => {
        return !arr ? null : arr.map(coin => {
            let date = new Date(coin.date);
            let months = date.getMonth();
            let days = date.getDate();
            return (`${days}.${months < 10 ? "0" + months : months}`);
        })
    }

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
        <div className='info-graph'>
            <Line data={data} options={options}/>
        </div>
    )
}

export default CoinInfo;