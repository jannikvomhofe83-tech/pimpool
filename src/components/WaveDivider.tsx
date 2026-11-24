/**
 * Animierter Wellen-Übergang zwischen zwei Sektionen.
 * Wird absolut an den unteren (oder mit `position="top"` an den oberen) Rand
 * einer `relative overflow-hidden` Sektion gesetzt. `color` = Farbe der
 * angrenzenden Sektion, in die die Welle übergeht.
 */
export function WaveDivider({
  color = "#ffffff",
  position = "bottom",
  className = "h-20 md:h-28",
  layers = 3,
}: {
  color?: string;
  position?: "bottom" | "top";
  className?: string;
  layers?: 1 | 2 | 3;
}) {
  const all = [
    { o: 0.25, d: "18s", y: 0 },
    { o: 0.45, d: "13s", y: 10 },
    { o: 1, d: "9s", y: 22 },
  ];
  const waves = all.slice(3 - layers);

  return (
    <div
      className={`pointer-events-none absolute inset-x-0 z-[1] overflow-hidden ${position === "bottom" ? "bottom-0" : "top-0 rotate-180"} ${className}`}
      aria-hidden="true"
    >
      {waves.map((w, k) => (
        <svg
          key={k}
          className="hero-wave absolute bottom-0 left-0 h-full w-[200%]"
          style={{ opacity: w.o, animationDuration: w.d, transform: `translateY(${w.y}px)` }}
          viewBox="0 0 2880 112"
          preserveAspectRatio="none"
        >
          <path
            fill={color}
            d="M0 56 C 240 16, 480 96, 720 56 C 960 16, 1200 96, 1440 56 C 1680 16, 1920 96, 2160 56 C 2400 16, 2640 96, 2880 56 L 2880 112 L 0 112 Z"
          />
        </svg>
      ))}
    </div>
  );
}
