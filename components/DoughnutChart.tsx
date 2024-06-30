"use client";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({accounts}: DoughnutChartProps) => {
    const data = {
        datasets: [
            {
                label: "Banks",
                data: [1232, 10000, 3504],
                backgroundColor: ['#93c5fd', '#3b82f6', '#082f49']
            }
        ],
        lables: ['Bank 1', 'Bank 2', 'Bank 3']
    }

  return <Doughnut data={data} />
}

export default DoughnutChart