import React, { useEffect, useState } from "react";

type Props = {
  options: Array<{ value: string; label: string }>;
  typingSpeed?: number;
  holdTime?: number;
  fadeTime?: number;
};

function TextAnimation({
  options,
  typingSpeed = 40,
  holdTime = 1500,
  fadeTime = 500,
}: Props) {
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    let typingTimer: ReturnType<typeof setInterval> | null = null;
    let holdTimer: ReturnType<typeof setTimeout> | null = null;
    let fadeTimer: ReturnType<typeof setTimeout> | null = null;

    const fullText = options[index].label;

    setDisplayText("");
    setIsFading(false);

    let i = 0;
    typingTimer = setInterval(() => {
      i++;
      setDisplayText(fullText.slice(0, i));

      if (i === fullText.length) {
        if (typingTimer !== null) clearInterval(typingTimer);

        holdTimer = setTimeout(() => {
          setIsFading(true);

          fadeTimer = setTimeout(() => {
            setIndex((prev) => (prev + 1) % options.length);
          }, fadeTime);
        }, holdTime);
      }
    }, typingSpeed);

    return () => {
      if (typingTimer !== null) clearInterval(typingTimer);
      if (holdTimer !== null) clearTimeout(holdTimer);
      if (fadeTimer !== null) clearTimeout(fadeTimer);
    };
  }, [index, options, typingSpeed, holdTime, fadeTime]);

  return (
    <div
      className={`relative inline-block font-semibold text-primary dark:text-neutral-100 transition-all ${
        isFading ? "opacity-0 scale-110 blur-sm" : "opacity-100 scale-100"
      }`}
      style={{ transitionDuration: `${fadeTime}ms` }}
    >
      {displayText}
    </div>
  );
}

export default TextAnimation;
