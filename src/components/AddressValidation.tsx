import React, { FC, useEffect } from "react";
import { IHandlerFC } from "../types/HandlerFC";
import { ColumnAPI, NuvoImporter } from "nuvo-react";

declare global {
  interface Window {
    google: typeof google;
  }
}

export const AddressValidation: FC<IHandlerFC> = ({ setResult }) => {
  // Ensure Google Maps API is loaded
  useEffect(() => {
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY`;
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  // Columns defined for the input file to be uploaded
  const columns: ColumnAPI[] = [
    {
      key: "address",
      label: "Address",
      columnType: "string",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
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
      // Address validation (Google Maps API) → Validate data through 3rd party service providers (for example Google Maps API)
      columnHooks={{
        address: async (values) => {
          const transformedValues = await Promise.all(
            values.map(async ([value, index]) => {
              const currentAddress = `${value}`.replace(/\n/g, "");
              const geocoder = new window.google.maps.Geocoder();
              const isValidAddress = await new Promise<boolean>((resolve) => {
                geocoder.geocode({ address: currentAddress }, (_results, status) => {
                  if (status === window.google.maps.GeocoderStatus.OK) {
                    resolve(true);
                  } else {
                    resolve(false);
                  }
                });
              });

              return [
                {
                  value: value,
                  info: isValidAddress
                    ? []
                    : [
                        {
                          level: "error",
                          message: "Invalid address",
                        },
                      ],
                },
                index,
              ];
            })
          );

          return Object.fromEntries(transformedValues);
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

export default AddressValidation;
