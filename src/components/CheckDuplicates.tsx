
import { FC } from "react";
import { IHandlerFC } from "../types/HandlerFC";
import { ColumnAPI, NuvoImporter } from "nuvo-react";

export const CheckDuplicates: FC<IHandlerFC> = ({ setResult }) => {
  // Columns defined for the input file to be uploaded
  const columns: ColumnAPI[] = [
  {
	key: "name",
	label: "name",
	columnType: "string",
  },
  {
	key: "email",
	label: "Email",
	columnType: "email",
  },
  ];

  return (
    <NuvoImporter
      licenseKey="non-commercial"
      settings={{
        developerMode: true,	
        identifier: "product_data",
        allowManualInput: true,
        columns,
      }}
	  // Check for duplicates (server call) → Prevent uploading duplicated data
	  columnHooks={{
		email: async (values) => {
		  let registeredEmails: string[];
		  await fetch(
			"https://my-json-server.typicode.com/comdocks/nuvo/customers",
		  )
			.then((response) => response.json())
			.then((json) => {
			  registeredEmails = json.map((row: any) => row.email);
			});

		  const duplicateErrors: any[] = [];

		  values.forEach((entry) => {
			if (registeredEmails.includes(entry[0]?.toString() || "")) {
			  duplicateErrors.push([
				{
				  info: [
					{
					  message:
						"Duplicate entry. The email address already exists.",
					  level: "error",
					},
				  ],
				},
				entry[1],
			  ]);
			}
		  });

		  return duplicateErrors;
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
