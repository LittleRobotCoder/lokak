import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const MotionImage = motion(Image);
import SplashLogo from "./SplashLogo.png";
const text = "lokaksema 2026";

export default function SplashScreen({
  onComplete,
}: {
  onComplete?: () => void;
}) {
  const [textVisible, setTextVisible] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const [logoZoomOut, setLogoZoomOut] = useState(false);
  const [containerFade, setContainerFade] = useState(false);
  const [unmount, setUnmount] = useState(false);

  useEffect(() => {
    const showTextTimer = setTimeout(() => setTextVisible(true), 100);
    const hideTextTimer = setTimeout(() => setTextVisible(false), 2000);
    const showLogoTimer = setTimeout(() => setShowLogo(true), 2300);
    const startLogoExitTimer = setTimeout(() => setLogoZoomOut(true), 4000);
    const containerFadeTimer = setTimeout(() => setContainerFade(true), 4800);
    const triggerCallbackTimer = setTimeout(() => onComplete?.(), 5200);
    const unmountTimer = setTimeout(() => setUnmount(true), 5300);

    return () => {
      clearTimeout(showTextTimer);
      clearTimeout(hideTextTimer);
      clearTimeout(showLogoTimer);
      clearTimeout(startLogoExitTimer);
      clearTimeout(containerFadeTimer);
      clearTimeout(triggerCallbackTimer);
      clearTimeout(unmountTimer);
    };
  }, [onComplete]);

  if (unmount) return null;

  return (
    <motion.div
      style={{
        position: "fixed",
        inset: 0,
        background: "#000",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      animate={{ opacity: containerFade ? 0 : 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {!showLogo && (
        <div
          style={{
            display: "flex",
            fontSize: "2.5rem",
            fontWeight: 700,
            color: "#fff",
            letterSpacing: "0.03em",
            gap: "0.04em",
            fontFamily: "'Poppins', Arial, Helvetica, sans-serif",
          }}
        >
          {text.split("").map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: textVisible ? 1 : 0,
                y: textVisible ? 0 : -20,
              }}
              transition={{
                delay: textVisible ? i * 0.02 : 0,
                duration: 0.4,
                ease: "easeOut",
              }}
              style={{ display: "inline-block" }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </div>
      )}

      {showLogo && (
        <MotionImage
          src={SplashLogo}
          alt="Splash Logo"
          width={220}
          height={80}
          priority
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{
            opacity: logoZoomOut ? 0 : 1,
            scale: logoZoomOut ? 2.4 : 1.05,
          }}
          transition={{
            duration: logoZoomOut ? 0.8 : 1.5,
            ease: "easeInOut",
          }}
        />
      )}
    </motion.div>
  );
}
