"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

// Generate atau ambil anonymous identifier dari localStorage
function getIdentifier(): string {
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem("novel_user_id");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("novel_user_id", id);
  }
  return id;
}

interface LikeButtonProps {
  novelId: string;
  initialLikes: number;
}

export default function LikeButton({ novelId, initialLikes }: LikeButtonProps) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(initialLikes);
  const [loading, setLoading] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = getIdentifier();
    setIdentifier(id);
    setMounted(true);

    // Cek apakah user sudah like novel ini
    const likedKey = `liked_novel_${novelId}`;
    const hasLiked = localStorage.getItem(likedKey) === "true";
    setLiked(hasLiked);
  }, [novelId]);

  const handleToggleLike = async () => {
    if (loading || !identifier) return;

    setLoading(true);
    const likedKey = `liked_novel_${novelId}`;

    try {
      if (liked) {
        // Unlike
        const res = await fetch(`${API_BASE}/novel/${novelId}/likes/${identifier}`, {
          method: "DELETE",
        });
        if (res.ok) {
          setLiked(false);
          setLikes((prev) => Math.max(0, prev - 1));
          localStorage.removeItem(likedKey);
        }
      } else {
        // Like
        const res = await fetch(`${API_BASE}/novel/${novelId}/likes`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ identifier }),
        });
        if (res.ok) {
          setLiked(true);
          setLikes((prev) => prev + 1);
          localStorage.setItem(likedKey, "true");
        }
      }
    } catch (err) {
      console.error("Gagal toggle like:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) {
    return (
      <button
        disabled
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-500 text-sm font-medium"
      >
        <Heart className="w-4 h-4" />
        <span>{likes} Suka</span>
      </button>
    );
  }

  return (
    <button
      onClick={handleToggleLike}
      disabled={loading}
      aria-label={liked ? "Batalkan suka" : "Suka novel ini"}
      className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border text-sm font-medium transition-all duration-200 active:scale-95 select-none
        ${
          liked
            ? "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30"
            : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-red-300 dark:hover:border-red-700 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50/50 dark:hover:bg-red-900/10"
        }
        ${loading ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
    >
      <Heart
        className={`w-4 h-4 transition-all duration-200 ${
          liked ? "fill-red-500 stroke-red-500 scale-110" : ""
        }`}
      />
      <span>{likes} Suka</span>
    </button>
  );
}
