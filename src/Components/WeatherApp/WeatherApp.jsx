import React, { useEffect, useState } from 'react'
import './WeatherApp.css'
import search_icon from '../Assets/search.png'
import clear_icon from '../Assets/clear.png'
import cloud_icon from '../Assets/cloud.png'
import drizzle_icon from '../Assets/drizzle.png'
import rain_icon from '../Assets/rain.png'
import snow_icon from '../Assets/snow.png'
import wind_icon from '../Assets/wind.png'
import humidity_icon from '../Assets/humidity.png'

const WeatherApp = () => {
  const [wdata, setWdata] = useState({})

  let api_key = '12cb110be33046de0e46603db618b33f'
  const [wicon, setWicon] = useState(cloud_icon)
  const [city, setCity] = useState('Hyderabad')

  async function fetchData() {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=${api_key}`
    let response = await fetch(url)
    let data = await response.json()
    setWdata(data)
  }

  useEffect(() => {
    fetchData()
    console.log(city)
  }, [])

  const search = async () => {
    fetchData()

    if (wdata.weather[0].icon === '01d' || wdata.weather[0].icon === '01n') {
      setWicon(clear_icon)
    } else if (
      wdata.weather[0].icon === '02d' ||
      wdata.weather[0].icon === '02n'
    ) {
      setWicon(cloud_icon)
    } else if (
      wdata.weather[0].icon === '03d' ||
      wdata.weather[0].icon === '03n'
    ) {
      setWicon(drizzle_icon)
    } else if (
      wdata.weather[0].icon === '04d' ||
      wdata.weather[0].icon === '04n'
    ) {
      setWicon(drizzle_icon)
    } else if (
      wdata.weather[0].icon === '09d' ||
      wdata.weather[0].icon === '09n'
    ) {
      setWicon(rain_icon)
    } else if (
      wdata.weather[0].icon === '10d' ||
      wdata.weather[0].icon === '10n'
    ) {
      setWicon(rain_icon)
    } else if (
      wdata.weather[0].icon === '13d' ||
      wdata.weather[0].icon === '13n'
    ) {
      setWicon(snow_icon)
    } else {
      setWicon(clear_icon)
    }
  }
  return (
    <div className='container'>
      <div className='top-bar'>
        <input
          type='text'
          className='cityInput'
          placeholder='search for a city'
          onChange={(e) => {
            setCity(e.target.value)
          }}
        />
        <div
          className='search-icon'
          onClick={() => {
            search()
          }}
        >
          <img src={search_icon} alt='' />
        </div>
      </div>
      {wdata.main ? (
        <>
          <div className='weather-image'>
            <img src={wicon} alt='' />
          </div>

          <div className='weather-temp'>{Math.floor(wdata.main.temp)}°C</div>
          <div className='weather-location'>{wdata.name}</div>
          <div className='data-container'>
            <div className='element'>
              <img src={humidity_icon} alt='' className='icon' />
              <div className='data'>
                <div className='humidity-percent'>
                  {Math.floor(wdata.main.humidity)}%
                </div>
                <div className='text'>Humidity</div>
              </div>
              <div className='element'>
                <img src={wind_icon} alt='' className='icon' />
                <div className='data'>
                  <div className='wind-speed'>{wdata.wind.speed}kmph</div>
                  <div className='text'>Wind Speed</div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  )
}

export default WeatherApp
