import { redirect } from "next/navigation";

export default function StudyRedirectPage() {
  redirect("/dashboard/decks");
}
