export default function EmptyState({
  text,
  title,
  subtitle,
  icon,
}: {
  text?: string;
  title?: string;
  subtitle?: string;
  icon?: string;
}) {
  const message = text ?? (title ? `${title}${subtitle ? ` — ${subtitle}` : ""}` : "");
  return <div className="py-20 text-center text-sm text-neutral-500">{icon ? `${icon} ` : ""}{message}</div>;
}
