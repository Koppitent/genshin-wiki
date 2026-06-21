type Props = {
	inputString: string;
	title?: string;
	placeholder?: string;
	onChange: (newValue: string) => void;
}

export default function TextAreaInput({ inputString, title, placeholder, onChange }: Props){
	return (
		<div className="flex flex-col gap-2">
			{title && <label className="font-medium">{title}</label>}
			<textarea
				placeholder={placeholder}
				value={inputString}
				onChange={(e) => onChange(e.target.value)}
				className="w-full h-32 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
			/>
		</div>
	);
}