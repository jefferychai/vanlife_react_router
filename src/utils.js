import { redirect } from "react-router-dom";

export async function requireAuth(request) {
  const isLoggedIn = localStorage.getItem("loggedIn");
  const pathname =
    new URL(request.url).pathname || "/vanlife_react_router/host";

  if (!isLoggedIn) {
    throw redirect(
      `/vanlife_react_router/login?message=You must log in first.&redirectTo=${pathname}`
    );
  }
}
