import { FC, useState } from "react";
import { IHandlerFC } from "../types/HandlerFC";
import { ColumnAPI, NuvoImporter } from "nuvo-react";

export const NestResult: FC<IHandlerFC> = ({ setResult }) => {
  // State to hold the nested result
  const [nestedResult, setNestedResult] = useState<any>(null);

  // Columns defined for the input file to be uploaded
  const columns: ColumnAPI[] = [
    {
      key: "parent_id",
      label: "Parent ID",
      columnType: "string",
    },
    {
      key: "child_id",
      label: "Child ID",
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

  // Function to group data by parent ID
  const groupDataByParentId = (data: any[]) => {
    return data.reduce((acc, row) => {
      const parentId = row.parent_id;
      if (!acc[parentId]) {
        acc[parentId] = {
          parent_id: parentId,
          children: [],
        };
      }
      acc[parentId].children.push({
        child_id: row.child_id,
        name: row.name,
        value: row.value,
      });
      return acc;
    }, {});
  };

  // Handler function to be called on data processing
  const handleDataProcessing = async (_modifier: any, data: any) => {
    const nestedData = groupDataByParentId(data);
    setNestedResult(nestedData);
    return data;
  };

  return (
    <div>
      <NuvoImporter
        licenseKey="non-commercial"
        settings={{
          developerMode: true,
          identifier: "nested_data",
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
      />
    </div>
  );
};

export default NestResult;
