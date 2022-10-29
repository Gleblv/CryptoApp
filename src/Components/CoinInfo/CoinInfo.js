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
import { useEffect, useState } from 'react';

import useCoinService from '../../services/CoinService';

import './CoinInfo.css';

const CoinInfo = ({coinId}) => {

    const {getCoinHistory, getCoinById} = useCoinService();

    const [selectedCoin, setSelectedCoin] = useState();
    const [coinHistory, setCoinHistory] = useState();

    useEffect(() => {
        getCoinById(coinId)
            .then(setSelectedCoin);
        getCoinHistory(coinId)
            .then(setCoinHistory);
    }, [coinId]);
      
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );
      
    const options = {
        responsive: true,
        plugins: {
            legend: {
            position: 'top',
            },
            title: {
            display: false,
            },
        },
    };
      
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
      
    const data = {
        labels,
        datasets: [
            {
            label: 'Dataset 1',
            data: ['10', '20', '30'],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
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