import { NextResponse } from "next/server";
import { createAdminClient } from "../../../lib/supabase/admin";

export const runtime = "nodejs";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const { email, productSlug, productName } = await request.json();

  if (typeof email !== "string" || !EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
  }
  if (typeof productSlug !== "string" || productSlug.length === 0) {
    return NextResponse.json({ error: "productSlug is required." }, { status: 400 });
  }

  try {
    const supabase = createAdminClient();
    const { error } = await supabase.from("leads").insert({
      email,
      product_slug: productSlug,
      product_name: typeof productName === "string" ? productName : null,
    });

    if (error) throw error;

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to save lead." }, { status: 500 });
  }
}
