import { FC } from "react";
import { IHandlerFC } from "../types/HandlerFC";
import { ColumnAPI, NuvoImporter } from "nuvo-react";

export const TransposeHeader: FC<IHandlerFC> = ({ setResult }) => {
  // Columns defined for the input file to be uploaded
  const columns: ColumnAPI[] = [
    {
      key: "id",
      label: "id",
      columnType: "string",
    },
    {
      key: "full_name",
      label: "Full Name",
      columnType: "string",
    },
    {
      key: "street",
      label: "Street",
      columnType: "string",
    },
  ];

  return (
    <NuvoImporter
      licenseKey={"non-commercial"}
      settings={{
        developerMode: true,
        identifier: "product_data",
        allowManualInput: true,
        columns,
      }}
      dataHandler={{
        headerStep: async (_modifier: any, data: any) => {
          // Get the number of rows and columns
          const rows = data[0].data.length;
          const cols = data[0].data[0].length;

          // Initialize a new array with the transposed dimensions
          const transposedArray = new Array<Array<any>>(cols);

          // Loop over each column
          for (let i = 0; i < cols; i++) {
            // Initialize a new row for each column
            transposedArray[i] = new Array<any>(rows);

            // Loop over each row and copy the value from the original array
            for (let j = 0; j < rows; j++) {
              transposedArray[i][j] = data[0].data[j][i];
            }
          }

          return transposedArray;
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
