import { useEffect, useState } from "react"
import { Button } from "./Button"
import axios from "axios";
import { useNavigate } from "react-router-dom";


export const Users = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.get(`/api/v1/user/bulk?filter=${encodeURIComponent(filter)}`, {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
        }).then((response) => {
            setUsers(response.data.user);
            setError("");
        }).catch(() => {
            setError("Unable to load users.");
        });
    }, [filter])

    return <>
        <div className="font-bold mt-6 text-lg">
            Users
        </div>
        <div className="my-2">
            <input
                onChange={(e) => setFilter(e.target.value)}
                type="search"
                placeholder="Search users..."
                className="w-full rounded border border-slate-200 px-2 py-2"
            />
        </div>
        {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
        <div>
            {users.map(user => <User key={user._id} user={user} />)}
        </div>
    </>
}

function User({user}) {
    const navigate = useNavigate();

    return <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstName[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-ful">
                <div>
                    {user.firstName} {user.lastName}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-ful">
            <Button onClick={() => {
                const params = new URLSearchParams({ id: user._id, name: user.firstName });
                navigate(`/send?${params.toString()}`);
            }} label={"Send Money"} />
        </div>
    </div>
}