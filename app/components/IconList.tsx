type Props<T> = {
  items: T[];
  render: (item: T) => React.ReactNode;
	onItemClick?: (item: T) => void;
};

export default function IconList<T>({ items, render, onItemClick }: Props<T>) {
  return (
    <div className="grid grid-cols-10 gap-4 p-4 bg-[#4C5454]">
      {items.map((item, index) => (
        <div key={index} onClick={() => onItemClick?.(item)}>
          {render(item)}
        </div>
      ))}
    </div>
  );
}
