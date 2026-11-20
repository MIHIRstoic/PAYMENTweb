import { useSearchParams } from 'react-router-dom';
import axios from "axios";
import { useState } from 'react';

export const SendMoney = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name") || "User";
    const [amount, setAmount] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const submit = async (event) => {
        event.preventDefault();
        setError("");
        setMessage("");
        const numericAmount = Number(amount);

        if (!id || !Number.isFinite(numericAmount) || numericAmount <= 0) {
            setError("Enter a positive amount and choose a recipient.");
            return;
        }

        setSubmitting(true);
        try {
            await axios.post("/api/v1/account/transfer", {
                to: id,
                amount: numericAmount,
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            setMessage("Transfer successful.");
        } catch (requestError) {
            setError(requestError.response?.data?.message || "Unable to complete the transfer.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="flex min-h-screen justify-center bg-gray-100 px-4">
            <div className="flex w-full max-w-md flex-col justify-center py-8">
                <form onSubmit={submit} className="space-y-6 rounded-lg border bg-white p-6 shadow-lg">
                    <h2 className="text-center text-3xl font-bold">Send Money</h2>
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500">
                            <span className="text-2xl text-white">{name[0]?.toUpperCase() || "U"}</span>
                        </div>
                        <h3 className="text-2xl font-semibold">{name}</h3>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium" htmlFor="amount">Amount (in Rs)</label>
                        <input
                            onChange={(event) => setAmount(event.target.value)}
                            value={amount}
                            type="number"
                            min="0.01"
                            step="0.01"
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                            id="amount"
                            placeholder="Enter amount"
                        />
                    </div>
                    {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
                    {message && <p role="status" className="text-sm text-green-700">{message}</p>}
                    <button
                        type="submit"
                        disabled={submitting}
                        className="h-10 w-full rounded-md bg-green-600 px-4 py-2 font-medium text-white hover:bg-green-700 disabled:opacity-60"
                    >
                        {submitting ? "Sending..." : "Initiate Transfer"}
                    </button>
                </form>
            </div>
        </div>
    );
}