import { FC, useState } from "react";
import { IHandlerFC } from "../types/HandlerFC";
import { ColumnAPI, NuvoImporter, EntryChangeResult } from "nuvo-react";

export const CleanOutput: FC<IHandlerFC> = ({ setResult }) => {
  const [rowCount, setRowCount] = useState<number>(0);

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

  // Function to remove empty fields from the data
  const removeEmptyValues = (data: any) => {
    return data.map((row: { [key: string]: any }) => {
      const cleanedRow: { [key: string]: any } = {};
      for (const [key, value] of Object.entries(row)) {
        if (value !== "") {
          cleanedRow[key] = value;
        }
      }
      return cleanedRow;
    });
  };

  // Handler function to be called on data processing
  const handleDataProcessing = async (_modifier: any, data: any) => {
    const cleanedData = removeEmptyValues(data);
    return cleanedData;
  };


  // Callback function for entry changes
  const onEntryChangeCallback = (rows: EntryChangeResult[]) => {
    const updatedRows = rows.map((row) => {
      const updatedData: { [key: string]: any } = {};
      Object.entries(row.data).forEach(([key, value]) => {
        if (value === "") {
          updatedData[key] = null;
        } else {
          updatedData[key] = value;
        }
      });
      return { ...row, data: updatedData };
    });
    return updatedRows;
  };

  return (
    <NuvoImporter
      licenseKey="i6vah+ovAY/pnVeVTxyV1keJFMx8s+jGUbSgpf01OTY="
      settings={{
        developerMode: true,
        identifier: "cleaned_data",
        allowManualInput: true,
        columns,
      }}
      dataHandler={{
        headerStep: handleDataProcessing,
      }}
      onResults={(result: any, errors: any, complete: () => void) => {
        console.log("Errors: ", errors);
        setResult(result);
        complete();
      }}
      onEntryChange={onEntryChangeCallback}
    />
  );
};

export default CleanOutput;
