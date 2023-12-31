"use client"
import { useSearchParams, useRouter } from "next/navigation";
import { FERNET_SALT, CLIENT_URL, API_URL } from "../libs/constants"
import fernet from "fernet";
import { useState } from "react";
import axios from "axios";

const Home = () => {
    const SP = useSearchParams();
    const router = useRouter();
    const [DISCORD_TOKEN, SET_DISCORD_TOKEN] = useState("");
    const [error, setError] = useState<String | null>(null);
    var secret = new fernet.Secret(FERNET_SALT || "");;
    const handleVerify = async () => {
        try {
            var token = new fernet.Token({
                secret,
                token: DISCORD_TOKEN,
                ttl: 0
            })
            console.log(SP.get("token_id"));
            console.log(token.decode());
            try {
                await axios.put(`${API_URL}/user`, {
                    id: SP.get("token_id"),
                    is_joined_discord: true,
                    discord_id: token.decode(),
                }, { withCredentials: true })
                router.push(`${CLIENT_URL}/u/me`);
            } catch (e) {
                setError("USER UNAVAILABLE!");
            }
        } catch (e) {
            setError("INVALID TOKEN!");
        }
    }
    return (
        <div className="flex flex-col h-screen justify-center items-center text-black font-bold">
            <div>Please enter code !!!!!</div>
            {error && <div className="bg-red-200 text-black">{error}</div>}
            <input
                onChange={(e) => SET_DISCORD_TOKEN(e.target.value)}
                className="border-black border-2 bg-[#7c87d9] w-80 h-10 my-7 px-2 text-black placeholder:text-black "
                type="text"
                placeholder="xxxxx"
            />
            <div className="flex justify-end">
                <button onClick={() => handleVerify()} className="p-2 px-4 bg-green-500 ">Verify</button>
            </div>
        </div>
    );
}

export default Home;
