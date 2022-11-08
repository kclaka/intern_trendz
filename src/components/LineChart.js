import {React, useState, useEffect} from 'react'
import { Chart as ChartJS, registerables } from'chart.js';
import { Line } from 'react-chartjs-2'
ChartJS.register(...registerables); 


const LineChart = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [total, setTotal] = useState({});
    // eslint-disable-next-line
    const [http, setHTTP] = useState({});
    // eslint-disable-next-line
    const [meta, setMeta] = useState({});

    useEffect(() => {
        fetch("https://internet-trendz.cloudflareintern.workers.dev/traffic-change")
          .then(res => res.json())
          .then(
            (result) => {
              setIsLoaded(true);
              setTotal(JSON.parse(result["data"]["total"]));
              setHTTP(JSON.parse(result["data"]["http"]));
              setMeta(JSON.parse(result["meta"]));

            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
              setIsLoaded(true);
              setError(error);
            }
          )
      }, [])

      const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Total traffic vs Http Traffic',
          },
        },
      };

      const labels = Object.keys(total);
      const total_values = Object.values(total);
      const http_values = Object.values(http);

      const data = {
        labels,
        datasets: [
          {
            label: 'Total Traffic Change',
            data: total_values,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: 'HTTP Traffic Change',
            data: http_values,
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      };
      

      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
        return(
            <div>
                <Line options={options} data={data} />;
            </div>
        ) 
            
    
      }


    
}

export default LineChart