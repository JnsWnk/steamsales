import { useState, useEffect } from "react";

type Props = {
  data: any;
};

const GameTable = ({ data }: Props) => {
  const desiredFields = [
    { field: "imglink", column: "Image" },
    { field: "name", column: "Game" },
    { field: "steampriceog", column: "Steam Price" },
    { field: "steampricedc", column: "Discount Price" },
  ]; // Fields that are always present
  const optionalFields = [
    { field: "keyprice", column: "Key Price" },
    { field: "keyseller", column: "Key Seller" },
    { field: "lastupdated", column: "Updated" },
  ]; // Optional fields

  const isOptionalFieldEnabled = optionalFields.some((field) =>
    data.some(
      (item: any) =>
        item[field.field] !== undefined && item[field.field] !== null
    )
  );

  return (
    <div className="container mx-auto">
      <table className="w-full">
        <thead>
          <tr>
            {desiredFields.map((field) => (
              <th key={field.field} className="p-4 text-left">
                {field.column}
              </th>
            ))}
            {isOptionalFieldEnabled &&
              optionalFields.map((field) => (
                <th key={field.field} className="p-4 text-left">
                  {field.column}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item: any) => (
            <tr key={item.id}>
              {desiredFields.map((field) => (
                <td key={`${item.id}-${field.field}`} className="p-4 text-left">
                  {field.field === "imglink" ? (
                    <img
                      src={item[field.field]}
                      alt={field.column}
                      className="max-w-full max-h-full"
                    />
                  ) : (
                    item[field.field]
                  )}
                </td>
              ))}
              {isOptionalFieldEnabled &&
                optionalFields.map((field) => (
                  <td
                    key={`${item.id}-${field.field}`}
                    className="p-4 text-left"
                  >
                    {item[field.field] || "-"}
                  </td>
                ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GameTable;
