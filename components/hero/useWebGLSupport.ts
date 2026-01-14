import { useEffect, useState } from "react";

export default function useWebGLSupport() {
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl") ||
        canvas.getContext("experimental-webgl") ||
        canvas.getContext("webgl2");
      setSupported(Boolean(gl));
    } catch {
      setSupported(false);
    }
  }, []);

  return supported;
}
