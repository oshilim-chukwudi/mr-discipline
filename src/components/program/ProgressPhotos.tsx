'use client'
import { useEffect, useRef, useState, ChangeEvent } from "react";

import { createClient } from "../../lib/supabase/client";

interface Photo {
  id: string;
  storage_path: string;
  taken_at: string;
  url: string;
}

const BUCKET = "progress-photos";

export default function ProgressPhotos({ programSlug }: { programSlug: string }) {
  const supabase = createClient();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [sliderPos, setSliderPos] = useState(50);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadPhotos = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      setLoading(false);
      return;
    }

    const { data: rows } = await supabase
      .from("progress_photos")
      .select("id, storage_path, taken_at")
      .eq("user_id", user.id)
      .eq("program_slug", programSlug)
      .order("taken_at", { ascending: true });

    const withUrls: Photo[] = [];
    for (const row of rows ?? []) {
      const { data } = await supabase.storage
        .from(BUCKET)
        .createSignedUrl(row.storage_path, 3600);
      if (data?.signedUrl) {
        withUrls.push({ ...row, url: data.signedUrl });
      }
    }
    setPhotos(withUrls);
    setLoading(false);
  };

  useEffect(() => {
    loadPhotos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const ext = file.name.split(".").pop();
      const path = `${user.id}/${Date.now()}.${ext}`;

      const { error: uploadError } = await supabase.storage.from(BUCKET).upload(path, file);
      if (!uploadError) {
        await supabase.from("progress_photos").insert({
          user_id: user.id,
          program_slug: programSlug,
          storage_path: path,
        });
        await loadPhotos();
      }
    }

    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  if (loading) return null;

  const first = photos[0];
  const latest = photos[photos.length - 1];
  const hasComparison = first && latest && first.id !== latest.id;

  return (
    <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-white font-bold text-[18px]">Progress photos</h2>
        <label className="cursor-pointer text-red-500 hover:text-red-400 text-[13px] font-semibold">
          {uploading ? "Uploading..." : "+ Add photo"}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleUpload}
            disabled={uploading}
            className="hidden"
          />
        </label>
      </div>

      {photos.length === 0 ? (
        <p className="mt-4 text-white/50 text-[14px]">
          Add your first photo to start tracking real progress over the program.
        </p>
      ) : (
        <>
          {hasComparison && (
            <div className="mt-6">
              <p className="text-white/50 text-[12px] uppercase tracking-wide font-semibold mb-3">
                First → Now
              </p>
              <div className="relative w-full max-w-md mx-auto aspect-[3/4] rounded-xl overflow-hidden border border-white/10 select-none">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={latest.url}
                  alt="Latest progress"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={first.url}
                  alt="First progress"
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
                />
                <div
                  className="absolute inset-y-0 w-0.5 bg-red-500 pointer-events-none"
                  style={{ left: `${sliderPos}%` }}
                />
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={sliderPos}
                  onChange={(e) => setSliderPos(Number(e.target.value))}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
                  aria-label="Compare first and latest progress photo"
                />
              </div>
              <div className="mt-2 flex justify-between text-white/40 text-[11px] max-w-md mx-auto">
                <span>{new Date(first.taken_at).toLocaleDateString()}</span>
                <span>{new Date(latest.taken_at).toLocaleDateString()}</span>
              </div>
            </div>
          )}

          <div className="mt-8 grid grid-cols-3 sm:grid-cols-4 gap-3">
            {photos.map((p) => (
              <div
                key={p.id}
                className="relative aspect-square rounded-lg overflow-hidden border border-white/10"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.url} alt="" className="absolute inset-0 w-full h-full object-cover" />
                <span className="absolute bottom-1 left-1 right-1 text-white/70 text-[10px] bg-black/50 rounded px-1 text-center">
                  {new Date(p.taken_at).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
