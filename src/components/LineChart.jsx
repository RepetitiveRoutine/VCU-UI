import React from 'react';
import { useEffect, useState, useRef } from 'react';
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: false,
  scales:
  {
    y:{
      min: -15,
      max: 700,
      stepSize:5,
    },
  
  },
  elements: {
    point:{
        radius: 0
    }
},
  plugins: 
  {
    legend: 
    {
      position: 'top',
    },
    
  },
  animations: 
  {
    animation:false
  }
}

const labels = Array.from(Array(10).keys())


const datawow = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      //map the numbers 1 - 10 to the labels, but make sure to add a random number to the end of the array
      data: [
        
      ],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: [
        
      ],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)'
    },
  ],
};



export function useInterval(callback, delay) 
{
  const savedCallback = useRef()
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Use effect will poll SerialPort every delay in ms 
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay != null) {
      const id = setInterval(tick, delay)
      return () => {
        clearInterval(id);
      };
    }
  }, [callback, delay])
}
// Convert the incoming sensor data
function float2int(value) {
  return value | 0;
}

const LineChart = (props) => 
{
  console.log(props.colour + " THIS IS PROPS")  
  const [thedata, setData] = useState(datawow);

  

  useInterval(async () => 
  {

    const message = await window.electronAPI.openCom()
    var parsedMsg = message.split(" ")
    let dataStrFormat = {
      "BP": float2int(parsedMsg[1]),
      "APPS1": float2int(parsedMsg[3]),
      "APPS2": float2int(parsedMsg[5]),
      "TPS": float2int(parsedMsg[7])
    }


    var datasetty = thedata.datasets[0].data
    var datasetty2 = thedata.datasets[1].data
    // if the length of datasetty is less than 12, add a new number to the end of the array
    if (datasetty.length < 11) 
    {
      console.log("condition met")
      datasetty.push(dataStrFormat.APPS1)
      datasetty2.push(dataStrFormat.APPS2)
      console.log(datasetty)
    }
    else 
    {
      datasetty.shift()
      datasetty.push(dataStrFormat.APPS1)
      datasetty2.shift()
      datasetty2.push(dataStrFormat.APPS2)
    }

    const datalist = {
      labels,
      datasets: [
        {
          label: 'APPS1',
          data: datasetty,
          borderColor: '#00e676',
          backgroundColor: '#33eb91',
        },
        {
          label: 'APPS2',
          data: datasetty2,
          borderColor: '#d500f9',
          backgroundColor:'#dd33fa' ,
        },
      ],
    };
    setData(datalist);
  }, 25);

  return <Line options={options} data={thedata} width={600} height={400} />;
}

export default LineChart