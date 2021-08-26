// api.openweathermap.org/data/2.5/weather?q=pune&appid=c9e9dbb340c61b70e5922aa0093b9312

import React, {useState,useEffect} from 'react';
import Weather from './weather';
import './style.css';

const Temp = () => {

    const [searchValue, setSearchValue] = useState("Pune");
    const [tempInfo, setTempInfo] = useState({});

    const getWeatherInfo = async () =>{
        try {
            let url =`https://api.openweathermap.org/data/2.5/weather?q=${searchValue}
            &units=metric&appid=c9e9dbb340c61b70e5922aa0093b9312`;

            let res = await fetch(url);
            let data = await res.json();

            const { temp, humidity, pressure } = data.main;
            const { main: weathermood } = data.weather[0];
            const { name } = data;
            const { speed } = data.wind;
            const { country, sunset } = data.sys;
            
            const myNewWeatherInfo = {
                temp,
                humidity,
                pressure,
                weathermood,
                name,
                speed,
                country,
                sunset,
            };
            setTempInfo(myNewWeatherInfo);

            // console.log(data);

        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        getWeatherInfo();
    }, []); 

    return (
        <>
            <div className="wrap">
                <div className="search">
                    <input type="search"
                        placeholder="search..."
                        autoFocus
                        id="search"
                        className="searchTerm"
                        value={searchValue}
                        onChange={(e)=>setSearchValue(e.target.value)}    
                    />
                    <button className="searchButton" onClick={getWeatherInfo}>Search</button>
                </div>
            </div>
            {/* the term card */}
            <Weather {...tempInfo}/>
        </>
    )
}

export default Temp;
