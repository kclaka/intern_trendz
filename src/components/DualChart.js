import {React, useState, useEffect} from 'react'
import {
    Chart as ChartJS,
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    LineController,
    BarController,
  } from 'chart.js';
  import { Chart } from 'react-chartjs-2';
  ChartJS.register(
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    LineController,
    BarController
  );
 
  function fieldValues(main, field) {
    var res = {};
    for(let item of main) {
      res[item[field]] = 0;
    }
    return Object.keys(res);
  }


const DualChart = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const [api, setApi] = useState([]);


    useEffect(() => {
        fetch("https://internet-trendz.cloudflareintern.workers.dev/popular-domains")
          .then(res => res.json())
          .then(
            (result) => {
                setIsLoaded(true);
                setApi(JSON.parse(result["rankingEntries"][0]["domain"]))
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

      //const labels = ['Technology', 'Entertainment', 'Society & Lifestyle', 'Business & Economy', '	Shopping & Auctions', 'Internet Communication'];
      const rank = fieldValues(api, "rank")
      const labels = fieldValues(api, "domain")
      const rankChange = [0,0,0,0,0,0,0,0,0,1,-1,0,0,0,0,0]

     
      const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Popular domains by rank',
          },
        },
      };


      
      const data = {
        labels,
        datasets: [
          {
            type: 'line',
            label: 'Rank Chnage',
            borderColor: 'rgb(255, 99, 132)',
            borderWidth: 2,
            fill: false,
            data: rankChange,
          },
          {
            type: 'bar',
            label: 'Rank',
            backgroundColor: 'rgb(75, 192, 192)',
            data: rank,
            borderColor: 'white',
            borderWidth: 2,
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
               return <Chart type='bar' data={data} options={options}/>;
            </div>
        ) 
            
    
      }

}

export default DualChart