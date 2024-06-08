
import { FC } from "react";
import { IHandlerFC } from "../types/HandlerFC";
import { ColumnAPI, NuvoImporter } from "nuvo-react";

export const ConvertFloats: FC<IHandlerFC> = ({ setResult }) => {
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
      key: "item",
      label: "Item",
      columnType: "string",
    },
    {
      key: "price",
      label: "Price",
      columnType: "float",
    },
  ];

  return (
    <NuvoImporter
      licenseKey="i6vah+ovAY/pnVeVTxyV1keJFMx8s+jGUbSgpf01OTY="
      settings={{
        developerMode: true,	
        identifier: "product_data",
        allowManualInput: true,
        columns,
      }}
	  // Convert floats into the decimal dot system → Adjust number formatting
	  dataHandler={{
		reviewStep: async (modifier, data) => {
		  const dataLength = data.length;
		  const newData: any = data;
		  for (let i = 0; i < dataLength; i++) {
			const element = data[i];

			if (element.price) {
			  const price = element.price;
			  if (typeof price === "string") {
				const newPrice = parseFloat(price.replace(",", "."));
				newData[i].price = newPrice;
			  }
			  // if the price is already a float convert to a 2 decimal number
			  else if (typeof price === "number") {
				const newPrice = parseFloat(price.toFixed(2));
				newData[i].price = newPrice;
			  }
			}
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
}