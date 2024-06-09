import React, { FC } from "react";
import { IHandlerFC } from "../types/HandlerFC";
import { ColumnAPI, NuvoImporter } from "nuvo-react";

const userBatchSize = 10; // Define the size of each user batch
const orderBatchSize = 5; // Define the size of each order batch

export const SplitResult: FC<IHandlerFC> = ({ setResult }) => {
  // Columns defined for the input file to be uploaded
  const columns: ColumnAPI[] = [
    {
      key: "id",
      label: "ID",
      columnType: "string",
    },
    {
      key: "full_name",
      label: "Full Name",
      columnType: "string",
    },
    {
      key: "email",
      label: "Email",
      columnType: "string",
    },
    {
      key: "order_id",
      label: "Order ID",
      columnType: "string",
    },
    {
      key: "product",
      label: "Product",
      columnType: "string",
    },
  ];

  const processUserBatches = async (userData: any[]) => {
    for (let i = 0; i < userData.length; i += userBatchSize) {
      const batch = userData.slice(i, i + userBatchSize);
      await fetch("http://localhost:5000/processUserBatch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(batch),
      });
    }
  };

  const processOrderBatches = async (orderData: any[]) => {
    for (let i = 0; i < orderData.length; i += orderBatchSize) {
      const batch = orderData.slice(i, i + orderBatchSize);
      await fetch("http://localhost:5000/processOrderBatch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(batch),
      });
    }
  };

  const splitDataAndSendRequests = async (data: any[]) => {
    const userData = data.filter(item => item.id && item.full_name && item.email);
    const orderData = data.filter(item => item.order_id && item.product);

    await processUserBatches(userData);
    await processOrderBatches(orderData);
  };

  return (
    <NuvoImporter
      licenseKey="none-commercial"
      settings={{
        developerMode: true,
        identifier: "split_data",
        allowManualInput: true,
        columns,
      }}
      onResults={async (result: any, errors: any, complete: () => void) => {
        console.log("Errors: ", errors);
        await splitDataAndSendRequests(result);
        setResult(result);
        complete();
      }}
    />
  );
};

export default SplitResult;
