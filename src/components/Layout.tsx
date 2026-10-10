import { Outlet } from "react-router-dom";
import { SiteNav } from "./SiteNav";
import { SiteFooter } from "./SiteFooter";

export function Layout() {
  return (
    <>
      <SiteNav />
      <main id="main">
        <Outlet />
      </main>
      <SiteFooter />
    </>
  );
}