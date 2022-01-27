const Banner = () => {
	return (
		<div className="w-full flex  justify-between items-center border-y border-slate-500 py-10 lg:py-0  bg-yellow-400 px-2  md:px-3  ">
			<div>
				<h1 className="text-5xl font-serif max-w-xl">
					<span className="underline decoration-black decoration-2">
						Medium
					</span>{" "}
					is a place to write,read and connect
				</h1>
				<h2>
					{/* eslint-disable-next-line react/no-unescaped-entities */}
					It's ease and free to post your thinking on any topic and
					connect with million of reader.
				</h2>
			</div>
			<div>
				{/*eslint-disable-next-line @next/next/no-img-element */}
				<img
					className="hidden md:inline-flex h-48 lg:h-[400px]"
					src="https://accountabilitylab.org/wp-content/uploads/2020/03/Medium-logo.png"
					alt="medium-logo"
				/>
			</div>
		</div>
	);
};

export default Banner;
