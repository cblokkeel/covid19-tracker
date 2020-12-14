import React from 'react'
import './scroll.css'

const Scroll = props => {
    return (
        <div style={{ overflowY: 'scroll', height: '40vh', marginTop: '30px'}} className='scroll'>
            {props.children}
        </div>
    );
};

export default Scroll;