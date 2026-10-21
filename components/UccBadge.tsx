"use client";

import { useState } from "react";

export default function UccBadge() {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <div className="entry-icon ucc-badge w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 overflow-hidden" aria-label="University of Caloocan City seal">
      {imageFailed ? (
        <span aria-hidden="true">UCC</span>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/images/ucc-logo.png"
          alt="UCC Logo"
          className="w-full h-full object-contain p-1"
          onError={() => setImageFailed(true)}
        />
      )}
    </div>
  );
}
