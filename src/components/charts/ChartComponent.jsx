import React from 'react';
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import {faker} from "@faker-js/faker";
import puntos from '../Map/features/points.json'
import glaciers from '../Map/features/glaciers.json'
import randomColor from 'randomcolor';

const Color = require('color');

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function LineChart({id}) {

  const options = {
    responsive: true,
    maintainAspectRatio: false,  
    // scales: {
    //   xAxes: [{
    //     ticks :{
    //       display:false,
    //       padding:0
    //     },
    //   }]
    //   /* xAxes: [{
    //     ticks: {
    //       min: '',
    //       max: ''
    //     }
    //   }] */
    // },
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
  var glaById = glaciers.find(glacier => glacier.id == id)
  const selectedGla = Object.entries(glaById)[13][1]  // reemplazar 0 por id de glaciar
  // console.log('selectedGla', selectedGla)


  const labelsFechas = Object.keys(selectedGla[0]['fechas']).map(date => {
    var dateFormat = new Date(date * 1000)
    const mes = dateFormat.toLocaleString('default', { month: 'short' });
    return dateFormat.getDate()+ "/" + mes;
  })

  var datasets = selectedGla.map(asd => {
    var color = randomColor()
    var brighter = Color(color).alpha(0.5).hex()

    return {
      label: asd.id,
      data: Object.values(asd.fechas),
      borderColor: color,
      backgroundColor: brighter,
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
