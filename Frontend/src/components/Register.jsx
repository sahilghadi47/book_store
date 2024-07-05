// { username, fullName, email, password }

import { useState } from "react";
import { Input, PasswordField } from "../components";
import axios from "axios";

export default function Register() {
	const [username, setUsername] = useState("");
	const [fullName, setFullName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const submitHandler = (e) => {
		e.preventDefault();
		setError("");
		if (!username || !fullName || !email || !password) {
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
	};

	return (
		<div className="w-full h-full flex justify-center items-center">
			<div className="w-[300px] md:w-[400px] border p-5 rounded-xl">
				<form onSubmit={submitHandler} className="w-full">
					<Input
						label="Enter your Username: "
						type="text"
						placeholder="Username"
						value={username}
						onChange={setUsername}
					/>
					<Input
						label="Enter your full name : "
						type="text"
						placeholder="Full name"
						value={fullName}
						onChange={setFullName}
					/>
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
						Register
					</button>
					{error && <p className="text-red-500">{error}</p>}
				</form>
			</div>
		</div>
	);
}
