import React from "react";
import {
  useLoaderData,
  Form,
  redirect,
  useActionData,
  useNavigation,
  Link,
} from "react-router-dom";
import { loginUser } from "../api";

export function loader({ request }) {
  return new URL(request.url).searchParams.get("message");
}

export async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const pathname =
    new URL(request.url).searchParams.get("redirectTo") ||
    "/vanlife_react_router/host";
  try {
    const data = await loginUser({ email, password });
    localStorage.setItem("loggedIn", true);
    return redirect(pathname);
  } catch (err) {
    return err.message;
  }
}

export default function Login() {
  const message = useLoaderData();
  const errorMessage = useActionData();
  const navigation = useNavigation();

  return (
    <div className="login-container">
      <h1>Sign in to your account</h1>
      {message && <h3 className="red">{message}</h3>}
      {errorMessage && <h3 className="red">{errorMessage}</h3>}

      <Form method="post" replace className="login-form">
        <input name="email" type="text" placeholder="Email address" />
        <input name="password" type="password" placeholder="Password" />
        <button disabled={navigation.state === "submitting"}>
          {navigation.state === "submitting" ? "Logging in..." : "Log in"}
        </button>
      </Form>

      <p className="signup">
        Dont have an account?{" "}
        <Link to="/vanlife_react_router/signup">Create one now</Link>
      </p>
    </div>
  );
}
