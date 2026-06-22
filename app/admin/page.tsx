import { hasRole } from "@/lib/auth/authHelper";
import ParameterPage from "../components/admin/ParameterPage";
import AccessDenied from "../components/AccessDenied";
import { auth } from "@/auth";

export default async function AdminPage() {
	const session = await auth();

	if(!(hasRole(session, "admin"))) {
		return <AccessDenied />;
	}

	return (
		<div>
			<h1 className="text-6xl font-bold mb-5 mt-5 flex justify-center items-center">Admin Page</h1>
			<ParameterPage />
		</div>
	);
}