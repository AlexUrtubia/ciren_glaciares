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

function ChartComponent({gla_id, point_id}) {
  
  console.log('id from chart', point_id)

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
  
  console.log('from chart', gla_id)

  var glaById = glaciers.find(glacier => glacier.id == gla_id)
  const selectedGla = Object.entries(glaById)[13][1]  // reemplazar 0 por id de glaciar
  
  var selectedPoint =  selectedGla.find(point => point.id == point_id)
  console.log('selectedGla', selectedPoint)
  console.log('selectedPoint',  Object.values(selectedPoint['fechas']))

  const labelsFechas = Object.keys(selectedPoint['fechas']).map(date => {
    var dateFormat = new Date(date * 1000)
    const mes = dateFormat.toLocaleString('default', { month: 'short' });
    return dateFormat.getDate()+ "/" + mes;
  })
  
  var datasets = {
      fill: true,
      label: selectedPoint.id,
      data: Object.values(selectedPoint['fechas']),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    }

  const labels = labelsFechas

  const data = {
    labels,
    datasets: [datasets]
  };

  return <Line options={options} id='grafico_id' height={200} data={data} />;
}

export default ChartComponent;
