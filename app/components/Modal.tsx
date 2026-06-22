import { X } from "lucide-react";

type Props = {
	open: boolean;
	title?: string;
	onClose: () => void;
	children: React.ReactNode;
};

export default function Modal({
	open,
	onClose,
	title,
	children
}: Props) {
	if (!open) return null;

	return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
      <div className="bg-[#3d4747] rounded-lg shadow-lg p-6 max-w-md w-full">
        {title && (
          <div className="border-b border-gray-600 mb-4 w-full flex justify-between items-center pb-4">
            <h2 className="text-xl font-bold">{title}</h2>
            <X className="cursor-pointer" onClick={onClose} />
          </div>
        )}
        {children}
        <button onClick={onClose} className="mt-3 text-red-500 cursor-pointer">
          Schließen
        </button>
      </div>
    </div>
  );
}
