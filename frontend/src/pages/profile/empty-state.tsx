export default function EmptyState({ text }: { text: string }) {
  return (
    <div className="py-20 text-center text-sm text-neutral-500">
      {text}
    </div>
  );
}
