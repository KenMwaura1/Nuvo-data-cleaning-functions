
import { FC } from "react";
import { IHandlerFC } from "../types/HandlerFC";
import { ColumnAPI, NuvoImporter } from "nuvo-react";

export const CheckDuplicates: FC<IHandlerFC> = ({ setResult }) => {
  // Columns defined for the input file to be uploaded
  const columns: ColumnAPI[] = [
	{
		label: "Country",
		key: "country",
		columnType: "category",
		dropdownOptions: [
		  {
			label: "Germany",
			value: "Germany",
			type: "string",
		  },
		  {
			label: "Canada",
			value: "Canada",
			type: "string",
		  },
		  {
			label: "Nigeria",
			value: "Nigeria",
			type: "string",
		  },
		  {
			label: "Ecuador",
			value: "Ecuador",
			type: "string",
		  },
		],
	  },
	  {
		key: "code",
		label: "Code",
		columnType: "string",
	  },
	];
  const countryMapping: any = {
    Germany: {
      regex: /^DE[0-9]{9}$/,
    },
    Nigeria: {
      regex: /^[0-9]{8}-[0-9]{4}$/,
    },
    Ecuador: {
      regex: /^[0-9]{13}$/,
    },
    Canada: {
      regex: /^[A-Z]{9}$/,
    },
  };


  return (
    <NuvoImporter
      licenseKey="non-commercial"
      settings={{
        developerMode: true,	
        identifier: "product_data",
        allowManualInput: true,
        columns,
      }}
	  // 
	  onEntryInit={(row, rowIndex) => {
		if (
		  (row.country === "Germany" &&
			!countryMapping["Germany"].regex.test(row.code)) ||
		  (row.country === "Nigeria" &&
			!countryMapping["Nigeria"].regex.test(row.code)) ||
		  (row.country === "Ecuador" &&
			!countryMapping["Ecuador"].regex.test(row.code)) ||
		  (row.country === "Canada" &&
			!countryMapping["Canada"].regex.test(row.code))
		) {
		  return {
			code: {
			  value: row.code,
			  info: [
				{
				  message:
					"This value must correspond to the VAT format of the selected country.",
				  level: "error",
				},
			  ],
			},
		  };
		}
	  }}
	  onEntryChange={(rows) => {
		return rows.map((row) => {
		  if (
			(row.data.country === "Germany" &&
			  !countryMapping["Germany"].regex.test(row.data.code)) ||
			(row.data.country === "Nigeria" &&
			  !countryMapping["Nigeria"].regex.test(row.data.code)) ||
			(row.data.country === "Ecuador" &&
			  !countryMapping["Ecuador"].regex.test(row.data.code)) ||
			(row.data.country === "Canada" &&
			  !countryMapping["Canada"].regex.test(row.data.code))
		  ) {
			return {
			  rowIndex: row.rowIndex,
			  data: {
				code: {
				  value: row.data.code,
				  info: [
					{
					  message:
						"This value must correspond to the VAT format of the selected country.",
					  level: "error",
					},
				  ],
				},
			  },
			};
		  }
		  return row;
		});
	  }}
      onResults={(result: any, errors: any, complete: () => void) => {
        console.log("Errors: ", errors);
        setResult(result);
        complete();
      }}
	/>
);
}
