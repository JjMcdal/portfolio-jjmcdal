"use client";

import { useState } from "react";

export default function PandayoBadge() {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <div className="entry-icon org-badge" aria-label="Pandayo Coffee logo">
      {imageFailed ? (
        <span aria-hidden="true">PC</span>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/images/pandayo-logo.jpg"
          alt="Pandayo Coffee logo"
          className="pandayo-logo"
          onError={() => setImageFailed(true)}
        />
      )}
    </div>
  );
}