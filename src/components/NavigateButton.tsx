'use client'
import { useTransition } from "react";
import { useRouter } from "next/navigation";

interface NavigateButtonProps {
  href: string;
  className?: string;
  children: React.ReactNode;
}

const NavigateButton = ({ href, className, children }: NavigateButtonProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => startTransition(() => router.push(href))}
      className={`${className ?? ""} inline-flex items-center justify-center gap-2 disabled:opacity-60`}
    >
      {isPending && (
        <span className="w-3.5 h-3.5 rounded-full border-2 border-white/40 border-t-white animate-spin" />
      )}
      {isPending ? "Loading..." : children}
    </button>
  );
};

export default NavigateButton;
