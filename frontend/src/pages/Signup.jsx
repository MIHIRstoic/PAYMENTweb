import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";

export const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
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
        const response = await axios.post("/api/v1/user/signup", {
          username,
          firstName,
          lastName,
          password,
        });
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");
      } catch (requestError) {
        setError(requestError.response?.data?.message || "Unable to create your account.");
      } finally {
        setSubmitting(false);
      }
    };

    return (
      <div className="min-h-screen bg-slate-100 flex justify-center px-4">
        <div className="flex flex-col justify-center py-8">
          <form onSubmit={submit} className="rounded-lg bg-white w-80 text-center p-4 shadow-sm">
            <Heading label="Sign up" />
            <SubHeading label="Enter your information to create an account" />
            <InputBox onChange={(event) => setFirstName(event.target.value)} placeholder="John" label="First Name" />
            <InputBox onChange={(event) => setLastName(event.target.value)} placeholder="Doe" label="Last Name" />
            <InputBox type="email" onChange={(event) => setUsername(event.target.value)} placeholder="you@example.com" label="Email" />
            <InputBox type="password" onChange={(event) => setPassword(event.target.value)} placeholder="At least 6 characters" label="Password" />
            {error && <p role="alert" className="mt-3 text-sm text-red-600">{error}</p>}
            <div className="pt-4">
              <Button type="submit" disabled={submitting} label={submitting ? "Creating account..." : "Sign up"} />
            </div>
            <BottomWarning label="Already have an account?" buttonText="Sign in" to="/signin" />
          </form>
        </div>
      </div>
    );
};