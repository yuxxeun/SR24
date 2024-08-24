import { useState, useEffect } from "react";

const messages: string[] = [
  "Find flow.",
  "Sit with your ambient ambition.",
  "Shine, constantly and steadily.",
  "Pray at the altar of hard work.",
];

export default function Footer() {
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const updateMessage = () => {
      const randomIndex = Math.floor(Math.random() * messages.length);
      setMessage(messages[randomIndex]);
    };

    updateMessage();
  }, []);

  return (
    <footer className="my-12">
      <div className="mx-auto max-w-4xl px-6 text-center lg:px-2">
        <p className="flex items-center justify-center font-newsreader text-xl italic text-zinc-400 dark:text-zinc-400">
          {message}
        </p>
      </div>
    </footer>
  );
}
