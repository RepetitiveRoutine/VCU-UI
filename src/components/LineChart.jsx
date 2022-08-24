import React from 'react';
import { useEffect, useState, useRef } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend,} from 'chart.js';
import { Line } from 'react-chartjs-2';
import faker from 'faker';

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
  responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
  animations: 
  {
    animation:false
  },
  scales: {
    y: {
      type: 'linear',
      display: true,
      position: 'left',
    },
    y1: {
      type: 'linear',
      display: true,
      position: 'right',
      // grid line settings
      grid: {
        drawOnChartArea: false, // only want the grid lines for one axis to show up
      },
    },
}
}

const labels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

const datawow = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      //map the numbers 1 - 10 to the labels, but make sure to add a random number to the end of the array
      data: [
        faker.random.number({ min: 1, max: 10 }),
        faker.random.number({ min: 1, max: 10 }),
        faker.random.number({ min: 1, max: 10 }),
        faker.random.number({ min: 1, max: 10 }),
        faker.random.number({ min: 1, max: 10 }),
      ],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
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

function float2int(value) {
  return value | 0;
}

const LineChart = (props) => 
{
  const [port, setPort] = React.useState(" ");
  const [serialData, setDataArray] = React.useState({});
  console.log(props.colour + " THIS IS PROPS")  
  const [apps1Data, setApps1Data] = useState(datawow);
  const [apps2Data, setApps2Data] = useState(datawow);

  useInterval(async () => 
  {
    
    console.log("Interval proc");
    const message = await window.electronAPI.openCom()
    setPort(message)
    var parsedMsg = message.split(" ")
    console.log(parsedMsg)
    console.log(port)
    let dataStrFormat = {
      "BP": float2int(parsedMsg[1]),
      "APPS1": float2int(parsedMsg[3]),
      "APPS2": float2int(parsedMsg[5]),
      "TPS": float2int(parsedMsg[7])
    }
    setDataArray(dataStrFormat)

    var apps1 = apps1Data.datasets[0].data
    console.log(apps1)
    var apps2 = apps2Data.datasets[0].data
    console.log(apps2)
    // if the length of datasetty is less than 12, add a new number to the end of the array
    if (apps1.length < 11) 
    {
      apps1.push(dataStrFormat.APPS1)
      apps2.push(dataStrFormat.APPS2)
    }
    else 
    {
      apps1.shift()
      apps1.push(dataStrFormat.APPS1)
      apps2.push(dataStrFormat.APPS2)
    }

    
    const datalist1 = {
      labels,
      datasets: [
        {
          label: 'Dataset 1',
          data: apps1,
          borderColor: props.colour,
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          yAxisID: 'y',
        }
      ],
    };

    const datalist2 = {
      labels,
      datasets: [
        {
          label: 'Dataset 2',
          data: apps2,
          borderColor: "red",
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          yAxisID: 'y1',
        }
      ],
    };
    setApps1Data(datalist1);
    setApps2Data(datalist2);
  }, 100)

  return <Line options={options} data={apps1Data} />;
}

export default LineChart