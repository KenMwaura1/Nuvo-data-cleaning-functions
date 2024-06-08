
import { FC } from "react";
import { IHandlerFC } from "../types/HandlerFC";
import { ColumnAPI, NuvoImporter } from "nuvo-react";

export const AddCountryCode: FC<IHandlerFC> = ({ setResult }) => {
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
		key: "country_code",
		label: "Country Code",
		columnType: "string",
	  },
	];
	const countryMapping: any = {
		Germany: {
		  code: "DE",
		},
		Nigeria: {
		  code: "NG",
		},
		Ecuador: {
		  code: "EC",
		},
		Canada: {
		  code: "CA",
		},
	  };

  return (
    <NuvoImporter
      licenseKey="i6vah+ovAY/pnVeVTxyV1keJFMx8s+jGUbSgpf01OTY="
      settings={{
        developerMode: true,	
        identifier: "product_data",
        allowManualInput: true,
        columns,
      }}
		// Add country code according to country → Ensure the quality of country-specific data
		onEntryInit={(row, rowIndex) => {
			if (countryMapping.hasOwnProperty(row.country)) {
			  return {
				country_code: {
				  value: countryMapping[row.country?.toString() || ""].code,
				  info: [
					{
					  message: "This value was automatically generated.",
					  level: "info",
					},
				  ],
				},
			  };
			}
		  }}
		  onEntryChange={(rows) => {
			if (countryMapping.hasOwnProperty(rows[0].data.country)) {
			  return rows.map((row) => {
				return {
				  rowIndex: row.rowIndex,
				  data: {
					country_code: {
					  value:
						countryMapping[row.data.country?.toString() || ""]
						  .code,
					  info: [
						{
						  message:
							"This value was automatically generated.",
						  level: "info",
						},
					  ],
					},
				  },
				};
			  });
			}
			return [];
		  }}

      onResults={(result: any, errors: any, complete: () => void) => {
        console.log("Errors: ", errors);
        setResult(result);
        complete();
      }}
	/>
);
}
