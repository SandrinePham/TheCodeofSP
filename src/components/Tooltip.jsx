import { createPortal } from "react-dom";
import "./tooltip.scss";
import React from "react";

export default function Tooltip({ visible, x, y, children }) {
  if (!visible) return null;

  const style = {
    position: "fixed",
    left: x,
    top: y,
    transform: "translate(-50%, -120%)",
    pointerEvents: "none", // NE PAS enlever : laisse passer les clics
    zIndex: 9999
  };

  return createPortal(
    <div className="theme-tooltip" style={style}>
      {children}
    </div>,
    document.body
  );
}
