// components/HowToUse.js

import React from 'react';
// import baseSample from '../sample_files/base_sample.csv';


const HowToUse = () => {
    return (
        <div className="how-to-use">
            <h2 className="how-to-use-title">How to Use</h2>
            <p className="how-to-use-description">To get started, download the sample CSV base file below and paste your ASIN's Master List and title according to the sample:</p>
            <ul className="how-to-use-list">
                <li>
                    <a href='/sample_files/base_sample.csv' download className="how-to-use-link">Download Base CSV Sample</a>
                </li>
                
            </ul>
            <p className="how-to-use-instructions">Upload the base CSV file and one or more input CSV files directly from the daily orders to process the data.</p>
        </div>
    );
};

export default HowToUse;