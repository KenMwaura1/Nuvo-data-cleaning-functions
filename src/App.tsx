import "./styles.css";
import { useState } from "react";
import { ConvertFloats } from "./components/ConvertFloats";
import { CheckDuplicates } from "./components/CheckDuplicates";
import { AddCountryCode } from "./components/AddCountryCode";


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
          <div className="download-btn-holder">
            {/* <ConvertFloats setResult={setResult} /> */}
            {/* <CheckDuplicates setResult={setResult} /> */}
            {/* <AddCountryCode setResult={setResult} /> */}

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
