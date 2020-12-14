import React from 'react'
import './CountriesLeaderboard.css'

const CountriesLeaderboard = ({ countries, compareValues }) => {
    const countriesSorted = [...countries].sort(compareValues('countryTotalCases', 'desc'))
    let even = -1
    
    return (
        <div className='leaderboard-container'>
            {
                countriesSorted.map(country => {
                    even++
                    return <div className={`${even % 2 === 0 ? 'even' : 'odd'} leaderboard-row`}>
                        <p className='country-info country-name'>{country.countryName} :</p>  <p className='country-info country-cases'>{country.countryTotalCases} Cases</p> 
                    </div>                
                })
            }
        </div>
    );
};

export default CountriesLeaderboard;