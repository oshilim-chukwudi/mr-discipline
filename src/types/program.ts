export interface ProgramContentRow {
  id: string;
  program_slug: string;
  day_number: number;
  title: string;
  duration_seconds: number;
  video_embed_url: string | null;
  description: string | null;
  sort_order: number;
}

export interface UserProgressRow {
  id: string;
  user_id: string;
  program_slug: string;
  day_number: number;
  mood_before: number | null;
  mood_after: number | null;
  completed_at: string | null;
}

export function formatDuration(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}
