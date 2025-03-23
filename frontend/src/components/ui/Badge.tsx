interface BadgeProps {
    text: string;
  }
  
  export default function Badge({ text }: BadgeProps) {
    return (
      <span className="inline-block px-2.5 py-1 text-xs font-medium rounded-md bg-primary-100 text-primary-800 dark:bg-primary-800/30 dark:text-primary-100">
        {text}
      </span>
    );
  }