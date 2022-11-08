import React from "react";


function fetchAPI(){

    const apiGet = ()=> {
        fetch('https://internet-trendz.cloudflareintern.workers.dev/traffic-change')
        .then((response) => response.json())
        .then((data) => console.log(JSON.parse(data["data"]["total"])));
    }

    return (
        <div>
            My API <br/>
            <button onClick={apiGet}>Fetch API</button>
            <br />
        </div>
    )
}

export default fetchAPI