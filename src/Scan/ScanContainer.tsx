// import logo from './logo.svg';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import Result from './Result';
import Scanner, { defaultConstraints, defaultDecoders } from './Scanner';
import Quagga, { QuaggaJSResultObject } from '@ericblade/quagga2';

const ScanContainer = () => {
  const [scanning, setScanning] = useState(false);
  const [results, setResults] = useState<QuaggaJSResultObject[]>([]);
  const [file, setFile] = useState<string>();
  const scannerRef = useRef(null);

  const onDetection = (result: QuaggaJSResultObject) => {
    console.log({ result });
    setResults([...results, result]);
  }

  const onUpload = (event: ChangeEvent<HTMLInputElement>) => {
    console.log({ event })
    if (event?.target?.files) {
      setFile(URL.createObjectURL(event?.target?.files[0]))
    }
  }

  useEffect(() => {
    Quagga.decodeSingle({
      src: file,
      decoder: {
        readers: defaultDecoders,
        multiple: true,
      },
    }, multipleResults => (multipleResults as any).map((result: QuaggaJSResultObject) => onDetection(result)))
  }, [file])

  return (
    <div>
      <div>
        <input type='file' onChange={onUpload} />
      </div>
      <button onClick={() => setScanning(!scanning)}>{scanning ? 'Stop' : 'Start'}</button>
      <ul className="results">
        {results.map((result: any, idx) => (result && <Result key={result?.codeResult?.code ?? `result-${idx}`} result={result} />))}
      </ul>
      {scanning &&
        <div ref={scannerRef} style={{ position: 'relative', border: '3px solid red' }}>
          {/* <video style={{ width: window.innerWidth, height: 480, border: '3px solid orange' }}/> */}
          <canvas className="drawingBuffer" style={{
            position: 'absolute',
            top: '0px',
            // left: '0px',
            // height: '100%',
            // width: '100%',
            border: '3px solid green',
          }} width={defaultConstraints.width} height={defaultConstraints.height} />
          <Scanner scannerRef={scannerRef} onDetected={onDetection} />
        </div>
      }
      {!scanning && file &&
        <img
        src={file}
        alt={file}
          style={{
            width: defaultConstraints.width,
            height: defaultConstraints.height,
          }}
        />
      }
    </div>
  );
};

export default ScanContainer;
