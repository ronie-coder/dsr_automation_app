import React, { useState } from 'react';
import Papa from 'papaparse';

const FileUploader = () => {
    const [baseFile, setBaseFile] = useState(null);
    const [inputFiles, setInputFiles] = useState([]);
    const [outputData, setOutputData] = useState(null);

    const handleBaseFileChange = (event) => {
        setBaseFile(event.target.files[0]);
    };

    const handleInputFilesChange = (event) => {
        setInputFiles(Array.from(event.target.files));
    };

    const processFiles = async () => {
        if (!baseFile || inputFiles.length === 0) {
            alert("Please upload a base file and at least one input file.");
            return;
        }

        const baseData = await readCSV(baseFile);
        let existingData = null;

        for (const file of inputFiles) {
            const salesData = await readCSV(file);
            existingData = addGrossUnitsColumn(existingData, baseData, salesData);
        }

        setOutputData(existingData);
    };

    const readCSV = (file) => {
        return new Promise((resolve) => {
            Papa.parse(file, {
                complete: (results) => {
                    resolve(results.data);
                },
                header: false,
                skipEmptyLines: true
            });
        });
    };

    const addGrossUnitsColumn = (existingData, baseData, salesData) => {
        const dateRow = salesData.find(row => row[0] === "Date");
        if (!dateRow) {
            console.error("Date row not found in sales data");
            return existingData || baseData;
        }
        const date = dateRow[1];

        const topAsinsIndex = salesData.findIndex(row => 
            row[0] === "Top ASINs" && 
            row[1] === "GROSS_UNITS"
        );
        if (topAsinsIndex === -1) {
            console.error("Top ASINs GROSS_UNITS section not found");
            return existingData || baseData;
        }

        const asinToUnitsMap = new Map();
        for (let i = topAsinsIndex + 1; i < salesData.length; i++) {
            const row = salesData[i];
            if (!row[0]) break;
            asinToUnitsMap.set(row[0], parseInt(row[1]) || 0);
        }

        let updatedData;
        if (existingData) {
            const dateExists = existingData.some(row => row[0] === date);
            if (dateExists) {
                console.log(`Data for date ${date} already exists. Skipping...`);
                return existingData;
            }

            updatedData = existingData.map((row, index) => {
                if (index === 0) {
                    return [...row, date];
                }
                const asin = row[0];
                const units = asinToUnitsMap.get(asin) || 0;
                return [...row, units];
            });
        } else {
            updatedData = baseData.map((row, index) => {
                if (index === 0) {
                    return [...row, date];
                }
                const asin = row[0];
                const units = asinToUnitsMap.get(asin) || 0;
                return [...row, units];
            });
        }

        return updatedData;
    };

    const downloadCSV = () => {
        if (!outputData) return;

        const csv = Papa.unparse(outputData);
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'updated_output.csv';
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div>
            <h1>CSV Uploader</h1>
            <input type="file" accept=".csv" onChange={handleBaseFileChange} />
            <input type="file" accept=".csv" multiple onChange={handleInputFilesChange} />
            <button onClick={processFiles}>Process Files</button>
            {outputData && <button onClick={downloadCSV }>Download Output CSV</button>}
        </div>
    );
};

export default FileUploader;