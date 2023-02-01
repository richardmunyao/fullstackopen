import {useEffect, useState} from 'react'
import axios from "axios"

const App = () => {
  const baseUrl = 'https://restcountries.com/v3.1/all'
  const [countries, setCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  //not sure if it is a good idea to fetch all countries to state
  //what if db is too large?
  const hook = () => {
    axios
      .get(baseUrl)
      .then(response => {       
        setCountries(response.data)
      })
  }
  useEffect(hook, [])
  

  const handleSearchTerm = (event) => {    
    setSearchTerm(event.target.value)
  }

  //just pass the id(which is name of country) to the search box
  const buttonHandler = (event) => {
    setSearchTerm(event.target.id)
  }

  return (
    <div>
      <SearchComponent text={searchTerm} handler={handleSearchTerm} />
      <CountriesComponent countries={countries} search={searchTerm} btnHandler={buttonHandler}/>      
    </div>
  )

}

const SearchComponent = ({text, handler})=> {
return (
  <div>
    find countries <input 
      value={text}
      onChange={handler} />
  </div>
)
}

const SingleCountryComponent = ({selectedCountry}) => {
  const [weather, setWeather] = useState(null)
  const capital = selectedCountry.capital[0]
  const apiKey = process.env.REACT_APP_API_KEY //added .env file to gitignore
  const baseUrl = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${apiKey}`
  const weatherHook = () => {
    axios
     .get(baseUrl)
     .then(response => {
      setWeather(response.data)
     })
  }
  useEffect(weatherHook, [])
  
  return (
    <div>
      <h1>{selectedCountry.name.common}</h1>
      <p>Capital: {selectedCountry.capital[0]}</p>
      <p>Area: {selectedCountry.area}</p>
      <br/>
      <h3>Languages:</h3>
      <ul>
        {
          Object.keys(selectedCountry.languages).map(lang =>
            <li key={lang}>{selectedCountry.languages[lang]}</li>)          
        }
      </ul>
      <img src={selectedCountry.flags.png} alt={selectedCountry.flags.alt}></img>  
      <WeatherComponent weather={weather} />
    </div>
  )

}

const CountriesComponent = ({countries, search, btnHandler}) => {
  
  //filter with search term
  const matchingCountries = countries.filter(cntry =>
    cntry.name.common.toLowerCase().includes(search.toLowerCase()))

    if (matchingCountries.length > 10) {
      return (
        <p>Too many matches, specify another filter
          <br/>
          Matches found: {matchingCountries.length}
        </p>        
      )
    }
    else if(matchingCountries.length === 1) {
        const solo = matchingCountries[0] 
        return <SingleCountryComponent selectedCountry={solo} />        
    }
    else {
      return (
        matchingCountries.map(country =>
          <p key={country.name.common}>{country.name.common} 
          <button id={country.name.common} onClick={btnHandler}>show</button>
          </p>)
      )

    }    

}

const WeatherComponent = ({weather}) => {
 if (weather === null) {
  return null
 }
 const weatherIcon =  `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
  return (
    <>
    <h3>Weather in {weather.name}</h3>
      <p>Temperature: {weather.main.temp} degrees celcius</p>
      <p>{weather.weather[0].description}</p>
      <img src={weatherIcon} alt={weather.weather[0].description}></img>
      <p>Wind: {weather.wind.speed} m/s </p>
    </>
  )

}


export default App;
