// In Badge.tsx
export default function Badge({ text }) {
    return (
      <span className="inline-block bg-primary-100 text-primary-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
        {text}
      </span>
    );
  }