import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "../../../../lib/supabase/admin";

// Called weekly by Vercel Cron (see vercel.json). Instagram long-lived tokens
// are valid for 60 days; refreshing weekly keeps a wide safety margin without
// ever requiring a manual token swap.
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createAdminClient();

  const { data: current, error: readError } = await supabase
    .from("instagram_token")
    .select("access_token")
    .eq("id", 1)
    .single();

  if (readError || !current) {
    return NextResponse.json({ error: "No stored token to refresh" }, { status: 500 });
  }

  const refreshUrl = `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${current.access_token}`;

  const res = await fetch(refreshUrl);
  if (!res.ok) {
    const body = await res.text();
    return NextResponse.json({ error: "Refresh failed", details: body }, { status: 502 });
  }

  const { access_token, expires_in } = (await res.json()) as {
    access_token: string;
    expires_in: number;
  };

  const expiresAt = new Date(Date.now() + expires_in * 1000).toISOString();

  const { error: writeError } = await supabase
    .from("instagram_token")
    .update({ access_token, expires_at: expiresAt, updated_at: new Date().toISOString() })
    .eq("id", 1);

  if (writeError) {
    return NextResponse.json({ error: "Failed to store refreshed token" }, { status: 500 });
  }

  return NextResponse.json({ ok: true, expires_at: expiresAt });
}
