import { renderToString } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
export { pageMeta, publicRoutes } from "./lib/seo";
export function render(route: string) {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "") || "/";
  const entry = (base === "/" ? "" : base) + route;
  return renderToString(
    <MemoryRouter basename={base} initialEntries={[entry]}>
      <App />
    </MemoryRouter>,
  );
}
