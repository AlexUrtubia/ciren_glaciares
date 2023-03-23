import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import glaciers from '../Map/features/glaciers.json'
// import randomColor from 'randomcolor';

const Color = require('color');

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

function LineChart({id}) {
  
  console.log('id from chart', id)

  const options = {
    responsive: true,
    maintainAspectRatio: false,  
    scales: {
      y: {
        min: -1,
        max: 1,
      },
    },
    plugins: {
      legend: {
        position: 'top',
        display: true,
      },
      title: {
        display: false,
        text: 'Chart.js Line Chart',
      },
    },
  };
  console.log('from chart', id)
  var glaById = glaciers.find(glacier => glacier.id == id)
  const selectedGla = Object.entries(glaById)[13][1]  // reemplazar 0 por id de glaciar
  // console.log('selectedGla', selectedGla)

  const labelsFechas = Object.keys(selectedGla[0]['fechas']).map(date => {
    var dateFormat = new Date(date * 1000)
    const mes = dateFormat.toLocaleString('default', { month: 'short' });
    return dateFormat.getDate()+ "/" + mes;
  })

  var datasets = selectedGla.map(asd => {
    //var color = randomColor()
    //var brighter = Color(color).lighten(0.4).hex()
    return {
      fill: true,
      label: asd.id,
      data: Object.values(asd.fechas),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    }
  })
  
  const labels = labelsFechas

  const data = {
    labels,
    datasets: datasets
  };

  return <Line options={options} height={200} data={data} />;
}

export default LineChart;
