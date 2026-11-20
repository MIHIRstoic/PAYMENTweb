import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"

export const Signin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();

    const submit = async (event) => {
      event.preventDefault();
      setError("");
      setSubmitting(true);

      try {
        const response = await axios.post("/api/v1/user/signin", { username, password });
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");
      } catch (requestError) {
        setError(requestError.response?.data?.message || "Unable to sign in.");
      } finally {
        setSubmitting(false);
      }
    };

    return (
      <div className="min-h-screen bg-slate-100 flex justify-center px-4">
        <div className="flex flex-col justify-center py-8">
          <form onSubmit={submit} className="rounded-lg bg-white w-80 text-center p-4 shadow-sm">
            <Heading label="Sign in" />
            <SubHeading label="Enter your credentials to access your account" />
            <InputBox type="email" onChange={(event) => setUsername(event.target.value)} placeholder="you@example.com" label="Email" />
            <InputBox type="password" onChange={(event) => setPassword(event.target.value)} placeholder="Password" label="Password" />
            {error && <p role="alert" className="mt-3 text-sm text-red-600">{error}</p>}
            <div className="pt-4">
              <Button type="submit" disabled={submitting} label={submitting ? "Signing in..." : "Sign in"} />
            </div>
            <BottomWarning label="Don't have an account?" buttonText="Sign up" to="/signup" />
          </form>
        </div>
      </div>
    );
};