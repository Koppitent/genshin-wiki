import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();

  if (!session?.user)
    return (
      <div className="flex flex-col items-center justify-center gap-4 h-[80vh]">
        <h1 className="text-6xl font-bold">Genshin Impact Wiki</h1>
        <h2 className="text-2xl">
          Eine Kollektion von Informationen über Genshin Impact
        </h2>
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-center gap-4 h-[80vh]">
      <h1 className="text-6xl font-bold">Genshin Impact Wiki</h1>
      <h2 className="text-2xl">
        Eine Kollektion von Informationen über Genshin Impact
      </h2>
      <p className="text-lg">Willkommen, {session.user.name}!</p>
      <div className="flex items-center gap-2">
        <p>Deine Rollen sind</p>(
        {session.user.roles.map((role: string) => (
          <p key={role}>{role}</p>
        ))}
        )
      </div>
    </div>
  );
}
