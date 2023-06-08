import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { signupUser } from "../api";

export async function action({ request }) {
  const formData = await request.formData();
  const credentials = Object.fromEntries(formData.entries());

  try {
    await signupUser(credentials);
    return redirect(
      "/vanlife_react_router/login?message=Successful created an account."
    );
  } catch (err) {
    return err.message;
  }
}

export default function Signup() {
  const errorMessage = useActionData();
  const navigation = useNavigation();
  console.log(navigation.state);

  return (
    <section className="signup-container">
      <h1>Signup to create your account</h1>
      {errorMessage && <h3 className="red">{errorMessage}</h3>}

      <Form className="signup-form" method="post" replace>
        <input type="text" name="name" placeholder="Name" />
        <input type="email" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Create password" />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
        />
        <button type="submit" disabled={navigation.state === "submitting"}>
          {navigation.state === "submitting" ? "Signing up..." : "Signup"}
        </button>
      </Form>
    </section>
  );
}
