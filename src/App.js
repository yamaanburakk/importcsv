import './App.css';
import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Papa from 'papaparse';
import {Bar} from 'react-chartjs-2';

function App() {
  const [parsedCsvData, setParsedCsvData] = useState([]);

  const parseFile = file => {
    Papa.parse(file, {
      header: true,
      complete: results => {
        setParsedCsvData(results.data);
      },
    });
  };

  console.log(parsedCsvData);

  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles.length) {
      parseFile(acceptedFiles[0]);
    }
  }, []);

  const {
    isDragActive,
    getRootProps,
    getInputProps,
    
  } = useDropzone({
    onDrop,
    accept: 'text/csv',
  });
  
  return (
    <div className="App">
      <div
        {...getRootProps({
        })}
      >
        <input {...getInputProps()} />
        <button>
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
        </button>
      </div>
      <table>
        <div className="wrapper">
          {parsedCsvData &&
            parsedCsvData.map((parsedData, index) => (
              <tr key={index}>
                <td>{parsedData.x}</td>
                <td>{parsedData.y}</td>   
              </tr>
            ))}
      </div>
      </table>
      <div style={{maxWidth:"1000px"}}>   
      <Bar 
      data={{
        labels:parsedCsvData.x, 
        datasets:[
          {
            label:"total expension/month",
            data:parsedCsvData,
            backgroundColor:["aqua", "green", "red", "yellow"],
            borderColor:["aqua", "green", "red", "yellow"],
            borderWidth: 0.5,
          },
        ],
      }}
      height={400}
      options={{
        maintainAspectRatio:false,
        legend:{
          labels:{
            fontSize:15,
          },
        },
      }}
      />
      </div>
    </div>

  );
}

export default App;