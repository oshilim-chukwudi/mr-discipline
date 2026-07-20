import { createAdminClient } from "./supabase/admin";

const GRAPH_URL = "https://graph.instagram.com/v21.0";

async function getStoredAccessToken(): Promise<string | null> {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("instagram_token")
      .select("access_token")
      .eq("id", 1)
      .single();

    if (error || !data) return null;
    return data.access_token;
  } catch {
    return null;
  }
}

export async function getLatestInstagramPermalinks(limit = 3): Promise<string[]> {
  const userId = process.env.INSTAGRAM_USER_ID;
  if (!userId) return [];

  const token = await getStoredAccessToken();
  if (!token) return [];

  const url = `${GRAPH_URL}/${userId}/media?fields=permalink&limit=${limit}&access_token=${token}`;

  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const data = (await res.json()) as { data?: { permalink: string }[] };
    return (data.data ?? []).map((post) => post.permalink);
  } catch {
    return [];
  }
}
