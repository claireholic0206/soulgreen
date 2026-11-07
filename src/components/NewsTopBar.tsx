import Link from "next/link";

export default function NewsTopBar() {
  return (
    <div style={{ padding: "22px 6vw", borderBottom: "1px solid rgba(40,51,31,.08)" }}>
      <Link href="/" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", letterSpacing: "2px", color: "#4a5940" }}>
        Soulgreen <span style={{ fontSize: "13px", color: "#8a7a5c" }}>芳疗</span>
      </Link>
    </div>
  );
}
