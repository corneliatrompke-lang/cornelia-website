import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ScrollReveal = ({
  children,
  delay = 0,
  direction = "up",
  duration = 0.75,
  className = "",
  once = true,
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: "-8%" });

  const yMap = { up: 28, down: -28, none: 0 };
  const xMap = { left: 28, right: -28, none: 0 };

  const variants = {
    hidden: {
      opacity: 0,
      y: yMap[direction] ?? 0,
      x: xMap[direction] ?? 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
