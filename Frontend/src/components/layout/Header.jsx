import { ShoppingCartIcon, User2 } from "lucide-react";
import { SearchBar } from "../";

export default function Header() {
	const navlinks = [
		{
			link: "/",
			title: "Home",
		},
		{
			link: "/about",
			title: "About Us",
		},
		{
			link: "/categories",
			title: "Categories",
		},
		{
			link: "/contact",
			title: "Contact Us",
		},
	];

	return (
		<>
			<header className="flex flex-col md:flex-row justify-between items-center w-full p-5 space-x-5">
				<div className="flex items-center flex-1">
					<h1 className="font-semibold text-2xl px-3 py-1 border-2 inline-block">
						BkStore
					</h1>
				</div>
				<SearchBar />
				<nav className="flex flex-col md:flex-row items-center">
					<ul className="flex space-x-3">
						{navlinks.map((item, index) => (
							<li
								key={index}
								className="border-b-2 border-gray-800 mx-3 p-1"
							>
								<a
									href={item.link}
									className="hover:text-blue-500"
								>
									{item.title}
								</a>
							</li>
						))}
					</ul>
				</nav>

				<div className="flex items-center space-x-2 pr-5">
					<button
						aria-label="User Profile"
						className="border rounded-full p-2"
					>
						<User2 />
					</button>
					<button
						aria-label="Shopping Cart"
						className="border rounded-full p-2"
					>
						<ShoppingCartIcon />
					</button>
				</div>
			</header>
		</>
	);
}
