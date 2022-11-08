import {React, useState, useEffect} from 'react'
import { Chart as ChartJS, registerables } from'chart.js';
import { Line } from 'react-chartjs-2'
ChartJS.register(...registerables); 

const AttackChart = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [total, setTotal] = useState({});

    useEffect(() => {
        fetch("https://internet-trendz.cloudflareintern.workers.dev/attack-layer3")
          .then(res => res.json())
          .then(
            (result) => {
              console.log(JSON.parse(result["data"]["data"]))
              setIsLoaded(true);
              setTotal(JSON.parse(result["data"]["data"]));

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
            text: 'Layer 3 DDoS Attack over the last 30 Days',
          },
        },
      };

      const labels = Object.keys(total);
      const total_values = Object.values(total).map(x => x * 100);
      

      const data = {
        labels,
        datasets: [
          {
            label: 'Attack Percentage',
            data: total_values,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          }
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

export default AttackChart