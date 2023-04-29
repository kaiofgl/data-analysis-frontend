import { Pie } from 'react-chartjs-2';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieGraph = (props) => {
    const { processed } = props

    const labelMap = [];
    let labels = [];
    if (Object.keys(processed).length > 0) {
        Object.entries(processed).map(([key, value]) => {
            labels.push(key);
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
                ].slice(0, 10),
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
                ].slice(0, 10),
            }]
    };

    const legendItems = labels.map((label, index) => {
        return {
            label: label,
            color: data.datasets[0].backgroundColor[index]
        };
    });

    const options = {
        responsive: true,
        animation: false,
        plugins: {
            legend: {
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
        <div style={{
            maxHeight: "360px",
            display: "flex",
            justifyContent: "center"
        }}>
            <Pie options={options} data={data} />
        </div>
    </>
}

export default PieGraph;