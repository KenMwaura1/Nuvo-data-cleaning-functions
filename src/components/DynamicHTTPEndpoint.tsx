import 	{ FC } from "react";
import { IHandlerFC } from "../types/HandlerFC";
import { ColumnAPI, NuvoImporter } from "nuvo-react";

export const DynamicHTTPEndpoint: FC<IHandlerFC> = ({ setResult }) => {
  // Columns defined for the input file to be uploaded
  const columns: ColumnAPI[] = [
    {
      key: "id",
      label: "ID",
      columnType: "string",
    },
    {
      key: "name",
      label: "Name",
      columnType: "string",
    },
    {
      key: "value",
      label: "Value",
      columnType: "string",
    },
  ];

  // Function to determine the endpoint based on data
  const getEndpoint = (value: number) => {
    if (value > 1000) {
      return "http://localhost:5000/endpointA";
    }
    return "http://localhost:5000/endpointB";
  };

  // Function to send data to the appropriate endpoint
  const sendToEndpoint = async (row: any) => {
    const endpoint = getEndpoint(Number(row.value));
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(row),
      });
      const result = await response.json();
      console.log(`Data sent to ${endpoint}`, result);
    } catch (error) {
      console.error(`Error sending data to ${endpoint}`, error);
    }
  };

  return (
    <NuvoImporter
      licenseKey="none-commercial"
      settings={{
        developerMode: true,
        identifier: "dynamic_endpoint_data",
        allowManualInput: true,
        columns,
      }}
      onEntryInit={async (row, rowIndex) => {
        await sendToEndpoint(row);
        return {};  // No validation issues
      }}
      onResults={(result: any, errors: any, complete: () => void) => {
        console.log("Errors: ", errors);
        setResult(result);
        complete();
      }}
    />
  );
};

export default DynamicHTTPEndpoint;
