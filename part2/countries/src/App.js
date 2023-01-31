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

const CountriesComponent = ({countries, search, btnHandler, singleOut}) => {
  
  //filter with search term
  const matchingCountries = countries.filter(cntry =>
    cntry.name.common.toLowerCase().includes(search.toLowerCase()))
    
    //function to handle a single country
    const singleCountry = (selectedCountry) => {  
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
        </div>
      )
    }

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
        return singleCountry(solo)         
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

export default App;
