import { MenuItem, Select } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import JsBarcode from "jsbarcode";
import { useState } from "react";

// Reference: https://github.com/lindell/JsBarcode
const BarcodeContainer = () => {
  const [barcodeText, setbarcodeText] = useState("");
  const [barcodeFormat, setbarcodeFormat] = useState("code128");

  const generateBarcode = () => {
    if (barcodeText)
      JsBarcode("#barcode", barcodeText, { format: barcodeFormat });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div>
        <TextField
          sx={{ m: 1 }}
          variant="filled"
          placeholder="Barcode value"
          value={barcodeText}
          onChange={(event) => setbarcodeText(event.target.value)}
        ></TextField>
        <Select
          label="Format"
          value={barcodeFormat}
          onChange={(event) => setbarcodeFormat(event.target.value)}
        >
          {["code128", "ean13"].map((format) => (
            <MenuItem value={format}>{format}</MenuItem>
          ))}
        </Select>
        <Button
          sx={{ m: 2, background: "red" }}
          variant="contained"
          onClick={generateBarcode}
        >
          Generate Barcode
        </Button>
      </div>

      <img id="barcode" alt="barcode" style={{ maxWidth: "20vw" }} />
    </div>
  );
};

export default BarcodeContainer;
