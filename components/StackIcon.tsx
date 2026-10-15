const FOLLOW_THEME = new Set(["nextdotjs", "vercel", "github", "ethereum"]);

export default function StackIcon({ slug, size = 26 }: { slug: string; size?: number }) {
  const follow = FOLLOW_THEME.has(slug);
  const src = `https://cdn.simpleicons.org/${slug}${follow ? "/0a0a0a" : ""}`;
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