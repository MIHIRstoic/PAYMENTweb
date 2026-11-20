import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"

export const Dashboard = () => {
    const [balance, setBalance] = useState(null);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/signin", { replace: true });
            return;
        }

        axios.get("/api/v1/account/balance", {
            headers: { Authorization: `Bearer ${token}` },
        }).then((response) => {
            setBalance(response.data.balance);
        }).catch(() => {
            setError("Unable to load your balance.");
        });
    }, [navigate]);

    return (
        <div className="min-h-screen bg-slate-50">
            <Appbar />
            <main className="mx-auto max-w-4xl p-4 sm:p-8">
                {error && <p role="alert" className="mb-4 text-sm text-red-600">{error}</p>}
                <Balance value={balance === null ? "Loading..." : balance.toFixed(2)} />
                <Users />
            </main>
        </div>
    );
}