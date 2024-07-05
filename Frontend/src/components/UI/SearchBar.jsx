import { SearchIcon } from "lucide-react";
import React from "react";

export default function SearchBar() {
	const [search, setSearch] = React.useState("");

	const handleSearch = async (e) => {
		e.preventDefault();
		console.log(search);
	};

	return (
		<form
			className="lg:w-screen-md min-w-80 p-1 border rounded-2xl flex items-center overflow-hidden mx-auto"
			onSubmit={handleSearch}
		>
			<input
				type="text"
				placeholder="Search Books..."
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				className="px-3 py-1 border-none flex-1 bg-none outline-none placeholder:text-gray-500"
			/>
			<button type="submit" className="px-2">
				<SearchIcon className="text-gray-500" />
			</button>
		</form>
	);
}
