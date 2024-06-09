import "./styles.css";
import { useState } from "react";
import { ConvertFloats } from "./components/ConvertFloats";
import { CheckDuplicates } from "./components/CheckDuplicates";
import { AddCountryCode } from "./components/AddCountryCode";
import { CrossColumnRegex } from "./components/CrossColumnRegex";
import { BackendValidation } from "./components/BackendValidation"; 
import { AddressValidation } from "./components/AddressValidation";
import {SplitResult} from "./components/SplitResult";
import {NestResult} from "./components/NestResult";

export default function App() {
  const [result, setResult] = useState<any>(
    "After the file import, your cleaned data will be displayed here.",
  );

  return (
    <div className="App">
      <div className="container-wrapper">
        <div>
          <img src={"./Logo.png"} className="App-logo" alt="logo" />
          <h1> Cleaning Functions </h1>
          <p className="description">
            This sandbox showcases multiple usecases of Cleaning Functions
          </p>
          <h2>Nested Data with Similar Parent ID  </h2>
          <div className="download-btn-holder">
            {/* <ConvertFloats setResult={setResult} /> */}
            {/* <CheckDuplicates setResult={setResult} /> */}
            {/* <AddCountryCode setResult={setResult} /> */}
            {/* <CrossColumnRegex setResult={setResult} /> */}

            {/* <BackendValidation setResult={setResult} /> */}
            {/* <AddressValidation setResult={setResult} /> */}
            {/* <SplitResult setResult={setResult} /> */}
            <NestResult setResult={setResult} />
            
          </div>
          <div className="white-box">
            {Object.keys(result).length !== 0 && (
              <pre>
                {typeof result === "string"
                  ? result
                  : JSON.stringify(result, null, 2)}
              </pre>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
