import React from 'react'
import './SelectCountry.css'

const SelectCountry = ({ countries, handleSelect }) => {
    return (
        <div className='select-container'>
            <select onChange={handleSelect} name="countries" id="countries" className='select'>
                <option   value='Worldwilde' key='ww'>Worldwilde</option>
                {   
                    countries.map(country => {
                        return <option value={country.countryName} key={country.countryName}>{country.countryName}</option>
                    })
                }
            </select>
        </div>
        
    );
};

export default SelectCountry;