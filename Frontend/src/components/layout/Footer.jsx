import React from "react";

export default function Footer() {
	return (
		<footer className="bg-white rounded-lg  dark:bg-gray-900 m-4">
			<div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
				<div className="sm:flex sm:items-center sm:justify-between">
					<h1>
						© 2023 <span className="font-bold">Book Store</span>.
						All Rights Reserved.
					</h1>
					<ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
						<li>
							<a
								href="#"
								className="hover:underline me-4 md:me-6"
							>
								About
							</a>
						</li>
						<li>
							<a
								href="#"
								className="hover:underline me-4 md:me-6"
							>
								Privacy Policy
							</a>
						</li>
						<li>
							<a
								href="#"
								className="hover:underline me-4 md:me-6"
							>
								Licensing
							</a>
						</li>
						<li>
							<a href="#" className="hover:underline">
								Contact
							</a>
						</li>
					</ul>
				</div>
			</div>
		</footer>
	);
}
