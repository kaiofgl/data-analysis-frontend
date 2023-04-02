import { Bar } from 'react-chartjs-2';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const BarGraph = (props) => {
    const { processed, sheetName } = props

    const labelMap = [];
    let labels = [];
    if (Object.keys(processed).length > 0) {
        Object.entries(processed).map(([key, value]) => {
            labels.push(key);
            labelMap.push(value);
        })

    }
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: '* Isso é apenas um preview e não contempla o processamento final.',
            },
        },
    };

    const data = {
        labels,
        datasets: [
            {
                label: sheetName,
                data: labelMap,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

    return <>
        <Bar options={options} data={data} />
    </>
}

export default BarGraph;