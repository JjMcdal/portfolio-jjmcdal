"use client";

import { useState } from "react";

export default function SdoBadge() {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <div className="entry-icon org-badge w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 overflow-hidden" aria-label="Schools Division Office of Caloocan City logo">
      {imageFailed ? (
        <span aria-hidden="true">SDO</span>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/images/sdo-logo.jpg"
          alt="SDO Caloocan Logo"
          className="w-full h-full object-contain p-1"
          onError={() => setImageFailed(true)}
        />
      )}
    </div>
  );
}
