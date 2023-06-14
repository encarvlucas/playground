// import logo from './logo.svg';
import React, { useRef, useState } from 'react';
import './App.css';
import Result from './Result';
import Scanner from './Scanner';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

const App = () => {
  const [scanning, setScanning] = useState(false);
  const [results, setResults] = useState([] as any[]);
  const scannerRef = useRef(null);

  return (
      <div>
          <button onClick={() => setScanning(!scanning) }>{scanning ? 'Stop' : 'Start'}</button>
          <ul className="results">
              {results.map((result: any) => (result.codeResult && <Result key={result.codeResult.code} result={result} />))}
          </ul>
          <div ref={scannerRef} style={{position: 'relative', border: '3px solid red'}}>
              {/* <video style={{ width: window.innerWidth, height: 480, border: '3px solid orange' }}/> */}
              <canvas className="drawingBuffer" style={{
                  position: 'absolute',
                  top: '0px',
                  // left: '0px',
                  // height: '100%',
                  // width: '100%',
                  border: '3px solid green',
              }} width="640" height="480" />
              {scanning ? <Scanner scannerRef={scannerRef} onDetected={(result: any) => setResults([...results, result])} /> : null}
          </div>
      </div>
  );
};

export default App;
