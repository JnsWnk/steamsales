import { useState, useEffect } from "react";

type Props = {
  data: any;
};

const GameTable = ({ data }: Props) => {
  const [columns, setColumns] = useState<string[]>([]);
  const [rows, setRows] = useState<any[]>([]);

  useEffect(() => {
    if (data && data.length > 0) {
      const keys = Object.keys(data[0]);
      setColumns(keys);
      setRows(data);
    }
  }, [data]);

  return (
    <table className="w-auto text-white">
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col} className="py-2 px-4 text-left">
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.id} className="">
            {columns.map((col) => (
              <td key={col} className="py-2 px-4">
                {row[col]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default GameTable;
