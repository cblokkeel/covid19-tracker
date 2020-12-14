import React from 'react'
import './InfoCard.css'

const InfoCard = ({ type, todayStats, stats }) => {
    return (
        <div className={`${type} info-card`}>
            <p className={`${type} card-title`}>Covid-19 <strong>{type}</strong></p>
            <p className={`${type} today-infos`}>+{todayStats}</p>
            <p className={`${type} all-time-infos`}>{stats} Total</p>
        </div>
    );
};

export default InfoCard;