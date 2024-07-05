import { useState } from "react";
import { Input, PasswordField } from "../components";
import axios from "axios";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const submitHandler = async (e) => {
		e.preventDefault();
		setError("");
		if (!email || !password) {
			setError("All fields are required");
			return;
		}
		if (
			!email.match(
				/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
			)
		) {
			setError("Invalid email address");
			return;
		}
		if (password.length < 8) {
			setError("Password must be at least 8 characters long");
			return;
		}
		if (password.match(/^[a-zA-Z0-9]+$/)) {
			setError("Password must contain at least one special character");
			return;
		}

		// axios api logic here
		setLoading(true);
		try {
			const res = await axios.post("/api/login", { email, password });
			console.log(res.data);
			setLoading(false);
		} catch (err) {
			setError(err.response.data.message);
			setLoading(false);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="w-full h-full flex justify-center items-center">
			<div className="w-[300px] md:w-[400px] border p-5 rounded-xl">
				<form onSubmit={submitHandler} className="w-full">
					<Input
						label="Enter your Email : "
						type="email"
						placeholder="Email"
						value={email}
						onChange={setEmail}
					/>

					<PasswordField
						label="Enter your password : "
						onChange={setPassword}
						value={password}
					/>
					<button
						type="submit"
						className="w-full bg-blue-500 text-white p-2 my-2 rounded-md"
					>
						{loading ? "Logging in..." : "Login"}
					</button>
					{error && <p className="text-red-500">{error}</p>}
				</form>
			</div>
		</div>
	);
}
