import React from "react";
import { Register, Login, Header, Footer } from "./components";

function App() {
	return (
		<>
			<Header />
			<main className="flex-1">
				<Login />
			</main>
			<Footer />
		</>
	);
}

export default App;
