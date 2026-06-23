function makeTile(stroke: string) {
  return encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="260" height="220">
  <g transform="translate(38,48) rotate(22)">
    <ellipse cx="0" cy="0" rx="10" ry="18" fill="none" stroke="${stroke}" stroke-opacity="0.28" stroke-width="1.4"/>
    <path d="M0,-18 Q6,-5 6,0 Q6,5 0,18" fill="none" stroke="${stroke}" stroke-opacity="0.2" stroke-width="1.1"/>
  </g>
  <g transform="translate(135,75) rotate(-42)">
    <ellipse cx="0" cy="0" rx="8" ry="14" fill="none" stroke="${stroke}" stroke-opacity="0.24" stroke-width="1.3"/>
    <path d="M0,-14 Q5,-4 5,0 Q5,4 0,14" fill="none" stroke="${stroke}" stroke-opacity="0.18" stroke-width="1"/>
  </g>
  <g transform="translate(210,155) rotate(65)">
    <ellipse cx="0" cy="0" rx="11" ry="19" fill="none" stroke="${stroke}" stroke-opacity="0.26" stroke-width="1.4"/>
    <path d="M0,-19 Q7,-6 7,0 Q7,6 0,19" fill="none" stroke="${stroke}" stroke-opacity="0.19" stroke-width="1.1"/>
  </g>
  <g transform="translate(75,168) rotate(-18)">
    <ellipse cx="0" cy="0" rx="9" ry="15" fill="none" stroke="${stroke}" stroke-opacity="0.22" stroke-width="1.3"/>
    <path d="M0,-15 Q5,-4 5,0 Q5,4 0,15" fill="none" stroke="${stroke}" stroke-opacity="0.17" stroke-width="1"/>
  </g>
  <g transform="translate(178,28) rotate(78)">
    <ellipse cx="0" cy="0" rx="7" ry="12" fill="none" stroke="${stroke}" stroke-opacity="0.2" stroke-width="1.1"/>
    <path d="M0,-12 Q4,-3 4,0 Q4,3 0,12" fill="none" stroke="${stroke}" stroke-opacity="0.15" stroke-width="0.9"/>
  </g>
  <g transform="translate(240,90) rotate(-30)">
    <ellipse cx="0" cy="0" rx="8" ry="13" fill="none" stroke="${stroke}" stroke-opacity="0.22" stroke-width="1.2"/>
    <path d="M0,-13 Q5,-4 5,0 Q5,4 0,13" fill="none" stroke="${stroke}" stroke-opacity="0.16" stroke-width="0.9"/>
  </g>
  <g transform="translate(20,130) rotate(50)">
    <ellipse cx="0" cy="0" rx="6" ry="11" fill="none" stroke="${stroke}" stroke-opacity="0.18" stroke-width="1"/>
    <path d="M0,-11 Q3.5,-3 3.5,0 Q3.5,3 0,11" fill="none" stroke="${stroke}" stroke-opacity="0.13" stroke-width="0.8"/>
  </g>
</svg>`);
}

const lightBg = `url("data:image/svg+xml,${makeTile("#5c3317")}")`;
const darkBg  = `url("data:image/svg+xml,${makeTile("#c8a98a")}")`;

export default function CoffeeBeansBg({ variant = "light" }: { variant?: "light" | "dark" }) {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: variant === "dark" ? darkBg : lightBg,
        backgroundRepeat: "repeat",
        backgroundSize: "260px 220px",
        opacity: 0.9,
      }}
    />
  );
}
