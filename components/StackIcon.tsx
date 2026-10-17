const FOLLOW_THEME = new Set(["nextdotjs", "vercel", "github", "ethereum"]);

// Slug want to render in a specific color (not the default brand color). This is used for icons that are not visible in light mode (e.g. openjdk).
const FORCE_COLOR: Record<string, string> = {
  openjdk: "ED8B00",
};

export default function StackIcon({ slug, size = 26 }: { slug: string; size?: number }) {
  const follow = FOLLOW_THEME.has(slug);
  const forced = FORCE_COLOR[slug];
  const src = `https://cdn.simpleicons.org/${slug}${follow ? "/0a0a0a" : forced ? "/" + forced : ""}`;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      width={size}
      height={size}
      loading="lazy"
      className={follow ? "icon-follow" : undefined}
    />
  );
}