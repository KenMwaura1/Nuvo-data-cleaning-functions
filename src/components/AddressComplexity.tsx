import { FC } from "react";
import { IHandlerFC } from "../types/HandlerFC";
import { ColumnAPI, NuvoImporter } from "nuvo-react";

export const AddressComplexity: FC<IHandlerFC> = ({ setResult }) => {
  // Columns defined for the input file to be uploaded
  const columns: ColumnAPI[] = [
    {
      key: "id",
      label: "ID",
      columnType: "string",
    },
    {
      key: "full_name",
      label: "Full name",
      columnType: "string",
    },
    {
      key: "street",
      label: "Street",
      columnType: "string",
    },
    {
      key: "city",
      label: "City",
      columnType: "string",
    },
    {
      key: "country",
      label: "Country",
      columnType: "string",
    },
    {
      key: "address",
      label: "Address",
      columnType: "string",
    },
  ];

  return (
    <NuvoImporter
      licenseKey={"non-commercial"}
      settings={{
        developerMode: true,
        identifier: "product_data",
        columns,
      }}
      dataHandler={{
        reviewStep: async (modifier, data) => {
          const dataLength = data.length;
          const newData: any = data;
          for (let i = 0; i < dataLength; i++) {
            const element = data[i];

            if (
              !element.address &&
              element.street &&
              element.city &&
              element.country
            ) {
              newData[i].address = {
                value: `${element.street}, ${element.city}, ${element.country}`,
                info: [
                  {
                    message: "This cell was automatically added.",
                    level: "info",
                  },
                ],
              };
            }
          }

          modifier.removeColumn("street");
          modifier.removeColumn("city");
          modifier.removeColumn("country");
          return newData;
        },
      }}
      onResults={(res, errors, complete) => {
        setResult(res);
        complete();
      }}
    />
  );
};
