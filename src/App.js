import { Component } from 'react'
import './App.css'
import CountriesLeaderboard from './components/CountriesLeaderboard/CountriesLeaderboard'
import InfoCard from './components/InfoCard/InfoCard'
import Scroll from './components/Scroll/Scroll'
import SelectCountry from './components/SelectCountry/SelectCountry'

class App extends Component {
  constructor() {
    super()
    this.state = {
      'todayCases': '',
      'todayDeaths': '',
      'todayRecovered': '',
      'cases': '',
      'deaths': '',
      'recovered': '',
      'countries': [],
      'selectedCountry': ''
    }
  }

  getCountry = async () => {
    const countryList = []
    const res = await fetch('https://disease.sh/v3/covid-19/countries/')
    const data = await res.json()
    data.forEach(country => {
      countryList.push({
        'countryName': country.country,
        'countryTotalCases': country.cases
      })
    })
    this.setState({ countries: countryList })
  }

  fetchData = async () => {
    const res = await fetch('https://disease.sh/v3/covid-19/all')
    const data = await res.json()
    const { todayCases, todayDeaths, todayRecovered, cases, deaths, recovered } = data
    this.setState({ todayCases, todayDeaths, todayRecovered, cases, deaths, recovered })
  }
  
  fetchDataByCountry = async country => {
    if (country === 'Worldwilde') {
      this.fetchData()
    } else {
      const res = await fetch(`https://disease.sh/v3/covid-19/countries/${country}`)
      const data = await res.json()
      // console.log(data)
      const { todayCases, todayDeaths, todayRecovered, cases, deaths, recovered } = data
      this.setState({ todayCases, todayDeaths, todayRecovered, cases, deaths, recovered })
    }
  }

  componentDidMount() {
    this.getCountry()
    this.fetchData()
  }

  handleSelect = e => {
    this.setState({ selectedCountry: e.target.value })
    this.fetchDataByCountry(e.target.value)
  }

  compareValues = (key, order = 'asc') => {
    return function innerSort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        return 0
      }
  
      const varA = (typeof a[key] === 'string')
        ? a[key].toUpperCase() : a[key]
      const varB = (typeof b[key] === 'string')
        ? b[key].toUpperCase() : b[key]
  
      let comparison = 0
      if (varA > varB) {
        comparison = 1
      } else if (varA < varB) {
        comparison = -1
      }
      return (
        (order === 'desc') ? (comparison * -1) : comparison
      )
    }
  }
  
  render () {
    const { todayCases, todayDeaths, todayRecovered, cases, deaths, recovered } = this.state
    return (
      <div className="App">
        <h1 onClick={() => console.log(this.state)}  className='app-title'>Covid-19 tracker</h1>
        <SelectCountry countries={this.state.countries} handleSelect={this.handleSelect}/>
        <div className="card-container">
          <InfoCard type='Cases' todayStats={todayCases} stats={cases}/>
          <InfoCard type='Recovered' todayStats={todayRecovered} stats={recovered}/>
          <InfoCard type='Deaths' todayStats={todayDeaths} stats={deaths} />
        </div>
        <Scroll >
          <CountriesLeaderboard  countries={this.state.countries} compareValues={this.compareValues}/>
        </Scroll>
      </div>
    )
  }
}

export default App
