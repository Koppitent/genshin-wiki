import ParameterPage from "../components/ParameterPage";

export default async function AdminPage() {
	return (
		<div>
			<h1 className="text-6xl font-bold mb-5 mt-5 flex justify-center items-center">Admin Page</h1>
			<ParameterPage />
		</div>
	);
}