type AddButtonProps = {
   type: 'submit' | 'button';
   title: string;
   bgColor: string;
   size: number;
};

const AddButton = ({ type, title, bgColor, size = 20 }: AddButtonProps ) => {
	return (
		<button
         style={{ backgroundColor: bgColor }}
			className="text-sm p-[2px] rounded-lg active:border-[#f84cf0] active:bg-[#f84c63] active:text-white outline-none focus:outline-none"
			type={type}
			title={title}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width={size}
				height={size}
				viewBox="0 0 24 24"
				strokeWidth="2"
				stroke="currentColor"
				fill="none"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
				<path d="M12 5l0 14"></path>
				<path d="M5 12l14 0"></path>
			</svg>
		</button>
	);
};

export default AddButton;
