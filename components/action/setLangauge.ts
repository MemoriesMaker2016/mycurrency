"use server";

import { cookies } from "next/headers";

export async function handleLanguageChange(langCode: string) {
  const cookiesStore = await cookies();

 cookiesStore.set("locale", langCode, { maxAge: 60*60*24*365 });

}
