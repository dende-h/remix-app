// app/services/auth.server.ts
import { isAxiosError } from "axios";
import { apiClient } from "libs/apiClient";
import { Authenticator } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import { sessionStorage } from "~/services/session.server";

type AccessToken = {
  access: "string";
  refresh: "string";
};
// The User type is replaced with `null` since we store the token only
export const authenticator = new Authenticator<AccessToken>(sessionStorage);

authenticator.use(
  new FormStrategy(async ({ form }) => {
    const email = form.get("email") as string | null;
    const password = form.get("password") as string | null;

    if (!email || !password) {
      throw new Error("Email and password are required.");
    }
    try {
      const response = await apiClient.post("/auth/token/", {
        email,
        password,
      });
      console.log(response);

      if (!response || !response.data.access || !response.data.refresh) {
        throw new Error("Invalid email or password.");
      }

      const { access, refresh } = response.data;
      return { access, refresh };
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === 401) {
          throw new Error("Invalid email or password.");
        } else if (error.response?.status === 400) {
          throw new Error("Bad request. Please check your input.");
        } else if (error.response?.status === 500) {
          throw new Error("Server error. Please try again later.");
        }
      }

      throw new Error("An unexpected error occurred. Please try again.");
    }
  }),
  "user-pass"
);
