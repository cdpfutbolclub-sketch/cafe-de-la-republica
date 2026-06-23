"use client";
import { useState } from "react";
import { motion } from "motion/react";

interface FlipButtonProps {
  onAdd: () => void;
}

export default function FlipButton({ onAdd }: FlipButtonProps) {
  const [flipped, setFlipped] = useState(false);

  function handleClick() {
    if (flipped) return;
    setFlipped(true);
    onAdd();
  }

  const variants = {
    idle:  { rotateX: 0,   backgroundColor: "#c0392b", color: "#ffffff" },
    added: { rotateX: 180, backgroundColor: "#faf6f0", color: "#5c3317" },
  };

  return (
    <motion.button
      className="w-full cursor-pointer font-sans text-[12px] tracking-widest uppercase font-medium"
      style={{ borderRadius: "12px", perspective: 600, paddingTop: "20px", paddingBottom: "20px", paddingLeft: "24px", paddingRight: "24px" }}
      onClick={handleClick}
      animate={flipped ? "added" : "idle"}
      variants={variants}
      transition={{ duration: 0.55, type: "spring", stiffness: 200, damping: 20 }}
      whileHover={{ scale: flipped ? 1 : 1.04 }}
      whileTap={{ scale: 0.96 }}
    >
      <motion.div
        animate={{ rotateX: flipped ? 180 : 0 }}
        transition={{ duration: 0.55, type: "spring", stiffness: 200, damping: 20 }}
        style={{ display: "inline-block" }}
      >
        {flipped ? "Added ✓" : "Add to Cart"}
      </motion.div>
    </motion.button>
  );
}
