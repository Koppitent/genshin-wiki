## Wichtige Befehle:

> Vor jedem Kommando **muss** zuerst `npx` geschrieben werden (lokales npm angesprochen).

> ### Inhaltsverzeichnis
> [Prisma](#prisma) <br>
> [Next.js](#nextjs) <br>

---

<br>

# Prisma

| Kommando | Info | Beispiel |
| -------- | ---- | -------- |
| prisma migrate dev --name `<bezeichnung>` (z.B `add_weapon`) | neue Migration erstellen | - | prisma generate | aktuellen Stand als Dateien ausgeben lassen | ähnlich zu Jooq
| prisma db push | wendet die migration auf die Datenbank an | - |
| prisma migrate reset | LÖSCHT alle daten aus db | nur in dev anwenden |
| prisma db seed | füllt db anhand von `seed.ts` | [seed.ts](prisma/seed.ts) |
| prisma studio | öffnet server der dbcontent anzeigt | - |


### Next.js

| Kommando | Info | Beispiel |
| -------- | ---- | -------- |
| npm run dev | startet den devserver | back & frontend gleichzeitig, run local nicht installiert (kein npx) |
