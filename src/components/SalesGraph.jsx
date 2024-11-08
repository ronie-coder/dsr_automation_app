import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend, Label } from 'recharts';
import Papa from 'papaparse';

const SalesGraph = ({ salesData }) => {
    const [formattedData, setFormattedData] = useState([]);

    useEffect(() => {
        // Assuming salesData is an array of objects with date and totalUnits
        setFormattedData(salesData);
    }, [salesData]);

    return (
        <div className="graph-container"> {/* Add a container for scrolling */}
            <LineChart width={1200} height={300} data={formattedData}>
                <XAxis dataKey="date" interval={0}>
                    <Label value="Dates" offset={0} position="bottom" /> {/* X-axis label */}
                </XAxis>
                <YAxis>
                    <Label value="Total Units" angle={-90} position="left" /> {/* Y-axis label */}
                </YAxis>
                <Tooltip />
                <CartesianGrid strokeDasharray="3 3" />
                <Legend />
                <Line type="monotone" dataKey="totalUnits" stroke="#8884d8" />
            </LineChart>
        </div>
    );
};

export default SalesGraph;