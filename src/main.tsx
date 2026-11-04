import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router";
// A single global stylesheet styles the whole app: the base layout plus the
// home page (hero / deck) and the build plan (plan-section / spec) class names.
// The extra module-1 stylesheets are intentionally NOT imported here — they
// re-styled the home page on top of the base rules.
import "./styles.css";
import "./lib/krossRuntimeBeacon";

const rootEl = document.getElementById("root");
if (rootEl) {
  createRoot(rootEl).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  );
}
