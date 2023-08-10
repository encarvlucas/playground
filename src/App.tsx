// import logo from './logo.svg';
import './App.css';
import BarcodeContainer from './Barcode/BarcodeContainer';
import ScanContainer from './Scan/ScanContainer';

const App = () => {

  return (
    <div>
      <ScanContainer />
      <BarcodeContainer />
    </div>
  );
};

export default App;
