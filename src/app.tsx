import { MetaProvider, Title, Link } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import { ToastContainer } from "~/components/ui/Toast";
import "./styles/global.css";
import "./styles/components.css";

export default function Root() {
  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <Link rel="stylesheet" href="/fonts/harmonyos/regular.min.css" />
          <Title>{import.meta.env.VITE_SITE_NAME || "主页"}</Title>
          <Suspense>{props.children}</Suspense>
          <ToastContainer />
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}