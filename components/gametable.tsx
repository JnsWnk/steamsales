import { Game } from "@/types/types";

type Props = {
  data: Game[];
};

const GameTable = ({ data }: Props) => {
  const desiredFields = [
    { field: "imglink", column: "Game" },
    { field: "name", column: "Name" },
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

  const getDaysAgo = (date: string) => {
    const today = new Date();
    const lastUpdated = new Date(date);
    const daysAgo = Math.floor(
      (today.getTime() - lastUpdated.getTime()) / (1000 * 60 * 60 * 24)
    );
    if (daysAgo >= 0) {
      return `${daysAgo} days ago`;
    }
    return "-";
  };

  return (
    <div className="container mx-auto">
      {data.length > 0 && (
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
                  <td
                    key={`${item.id}-${field.field}`}
                    className="p-2 text-left"
                  >
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
                      {field.field === "lastupdated"
                        ? getDaysAgo(item[field.field])
                        : item[field.field] || "-"}
                    </td>
                  ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default GameTable;
