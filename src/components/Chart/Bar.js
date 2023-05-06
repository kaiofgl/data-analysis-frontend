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
    const { processed } = props

    const labelMap = [];
    let labels = [];
    if (Object.keys(processed).length > 0) {
        Object.entries(processed).map(([key, value]) => {
            labels.push(key);
            // console.log();
            labelMap.push(value);
        })
    }

    const data = {
        labels: labels,
        datasets: [
            {
                data: labelMap,
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#dc3dad',
                    '#f90c83',
                    '#88f8fe',
                    '#2c01ba',
                    '#71c422',
                    '#b1adc1',
                    '#d86b3b',
                    '#daf8e5',
                    '#4c0b5f',
                    '#e8d73a',
                    '#a1d7c9',
                    '#f26c6c',
                    '#608597',
                    '#fc8d62',
                    '#95d5b2',
                    '#f7797d',
                    '#3eb1c8',
                    '#8c564b',
                    '#5d3f6a',
                    '#d8e8d4',
                    '#5a6344',
                    '#fdcdbc',
                    '#f1b6da',
                    '#b6d7a8',
                    '#3eb1c8',
                    '#8c564b',
                    '#5d3f6a',
                    '#d8e8d4',
                    '#5a6344',
                    '#fdcdbc',
                    '#f1b6da',
                    '#b6d7a8',
                    '#FF6384',
                    '#36A2EB',
                    '#dc3dad',
                    '#f90c83',
                    '#88f8fe',
                ].slice(0, 39),
                borderColor: 'rgba(0,0,0,0)',
                borderWidth: 2,
                hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#dc3dad',
                    '#f90c83',
                    '#88f8fe',
                    '#2c01ba',
                    '#71c422',
                    '#b1adc1',
                    '#d86b3b',
                    '#daf8e5',
                    '#4c0b5f',
                    '#e8d73a',
                    '#a1d7c9',
                    '#f26c6c',
                    '#608597',
                    '#fc8d62',
                    '#95d5b2',
                    '#f7797d',
                    '#3eb1c8',
                    '#8c564b',
                    '#5d3f6a',
                    '#d8e8d4',
                    '#5a6344',
                    '#fdcdbc',
                    '#f1b6da',
                    '#b6d7a8',
                    '#3eb1c8',
                    '#8c564b',
                    '#5d3f6a',
                    '#d8e8d4',
                    '#5a6344',
                    '#fdcdbc',
                    '#f1b6da',
                    '#b6d7a8',
                    '#FF6384',
                    '#36A2EB',
                    '#dc3dad',
                    '#f90c83',
                    '#88f8fe',
                ].slice(0, 39),
            }]
    };

    const legendItems = labels.map((label, index) => {
        return {
            label: label,
            color: data.datasets[0].backgroundColor[index]
        };
    });

    const options = {
        // scale: {
        //     xAxes: [{
        //         type: 'time',
        //         ticks: {
        //             autoSkip: true,
        //             maxTicksLimit: 20
        //         }
        //     }]
        // },
        // indexAxis: 'y',
        responsive: true,
        animation: false,
        plugins: {
            legend: {
                // position: 'right',
                labels: {
                    usePointStyle: true,
                    generateLabels: function (chart) {
                        const labels = chart.data.labels;

                        const meta = chart.getDatasetMeta(0);
                        return labels.map(function (label, index) {
                            const hidden = meta.data[index].hidden;
                            return {
                                text: label,
                                fillStyle: legendItems[index].color,
                                hidden: hidden,
                                index: index
                            };
                        });
                    },
                    onClick: function (event, legendItem) {
                        const index = legendItem.index;
                        const ci = this.chart;
                        const meta = ci.getDatasetMeta(0);
                        const alreadyHidden = meta.data[index].hidden;

                        meta.data[index].hidden = !alreadyHidden;
                        ci.update();
                    }
                }
            }
        }
    };

    return <>
        <Bar options={options} data={data} />
    </>
}

export default BarGraph;