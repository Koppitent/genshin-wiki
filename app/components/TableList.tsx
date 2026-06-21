type Props<T> = {
  items: T[];
  columns?: TableColumn<T>[];
};

type TableColumn<T> = {
  name: string;
  render: (item: T) => React.ReactNode;
  sizePercent?: number;
  disabled?: boolean;
};

function distributeColumnSizes<T>(columns: TableColumn<T>[]) {
  const activeColumns = columns.filter((c) => !c.disabled);

  const totalDefined = activeColumns.reduce((sum, col) => {
    return sum + (col.sizePercent ?? 0);
  }, 0);

  const remaining = Math.max(0, 100 - totalDefined);

  const withoutSize = activeColumns.filter((c) => c.sizePercent == null);
  const perColumn = withoutSize.length > 0 ? remaining / withoutSize.length : 0;

  return activeColumns.map((col) => ({
    ...col,
    sizePercent: col.sizePercent ?? perColumn,
  }));
}

export default function TableList<T>({ items, columns }: Props<T>) {
  const finalColumns = distributeColumnSizes(columns ?? []);

  return (
    <div>
      <table className="w-full">
        <thead>
          <tr className="text-left bg-[var(--foreground)] text-white">
            {finalColumns.map((column) => (
              <th
                key={column.name}
                className="px-4 py-2 bg-[var(--foreground)]"
                style={{ width: `${column.sizePercent}%` }}
              >
                {column.name}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {items.map((item, i) => (
            <tr
              key={(item as any).id ?? i}
              className="group bg-[#4C5454] hover:bg-[#424C4C] cursor-pointer border-t-2 border-[#5A6363]"
            >
              {finalColumns.map((column) => (
                <td
                  key={column.name}
                  className="px-4 py-2 bg-[#4C5454] group-hover:bg-[#424C4C] transition-colors"
                  style={{ width: `${column.sizePercent}%` }}
                >
                  {column.render(item)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
