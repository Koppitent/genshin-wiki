type Props = {
  text: string;
  imageUrl?: string;
	brightness?: number;
};

export default function Badge({ text, imageUrl, brightness }: Props) {
  return (
    <div className="inline-block bg-gray-500 text-gray-800 text-xs font-semibold px-4 py-1 rounded border border-gray-400">
      {imageUrl ? (
        <div className="flex items-center gap-1 justify-center iems-center">
          <img
            src={imageUrl}
            alt={text}
            className={`w-[1.5rem] h-[1.5rem] object-cover brightness-${brightness || 100}`}
          />
          <p className="text-white text-lg font-normal">
            {text[0].toUpperCase() + text.slice(1)}
          </p>
        </div>
      ) : (
        <p className="text-white text-lg font-normal">
          {text[0].toUpperCase() + text.slice(1)}
        </p>
      )}
    </div>
  );
}
