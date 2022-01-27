import Link from "next/link";
import React from "react";
import Image from "next/image";

const Header = (): JSX.Element => {
	return (
		<header className="flex items-center justify-between py-3 border-b border-gray-300 shadow-sm px-2 sm:px-10 md:px-20">
			<div className="flex items-center space-x-4 ">
				<Link href="/" passHref>
					<div className="w-32 ">
						{/*eslint-disable-next-line @next/next/no-img-element */}
						<img
							src="https://miro.medium.com/max/8978/1*s986xIGqhfsN8U--09_AdA.png"
							alt="logo"
						/>
					</div>
				</Link>
				<ul className="hidden md:inline-flex space-x-5 text-base font-semibold ">
					<li>About</li>
					<li>Contact</li>
					<li className="bg-green-600 px-2 text-gray-50 rounded-full ">
						Follow
					</li>
				</ul>
			</div>
			<div className="flex items-center space-x-5 text-green-600 ">
				<button className="font-medium  text-base">Sign in</button>
				<button className="border border-green-600 px-2 rounded-full font-medium  text-base">
					Get Started
				</button>
			</div>
		</header>
	);
};

export default Header;
