import React, { FC } from "react";
import { IHandlerFC } from "../types/HandlerFC"; // Ensure you have this type defined properly in your project
import { ColumnAPI, NuvoImporter } from "nuvo-react";

export const BackendValidation: FC<IHandlerFC> = ({ setResult }) => {
  // Columns defined for the input file to be uploaded
  const columns: ColumnAPI[] = [

    {
      key: "full_name",
      label: "Full Name",
      columnType: "string",
    },
    {
      key: "email",
      label: "Email",
      columnType: "email",
    },
    {
      key: "phone",
      label: "Phone",
      columnType: "string",
    },
  ];

  return (
    <NuvoImporter
      licenseKey="i6vah+ovAY/pnVeVTxyV1keJFMx8s+jGUbSgpf01OTY="
      settings={{
        developerMode: true,
        identifier: "user_data",
        allowManualInput: true,
        columns,
      }}
      dataHandler={{
        reviewStep: async (_modifier: any, data: any) => {
          const dataLength = data.length;
          const newData: any = [...data];
          for (let i = 0; i < dataLength; i++) {
            const element = data[i];
            const { full_name, email, phone } = element;
            const response = await fetch("http://localhost:5000/validate", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ full_name, email, phone }),
            });
            const result = await response.json();
            newData[i] = result;
          }
          return newData;
        },
      }}
      onResults={(result: any, errors: any, complete: () => void) => {
        console.log("Errors: ", errors);
        setResult(result);
        complete();
      }}
    />
  );
};

export default BackendValidation;
