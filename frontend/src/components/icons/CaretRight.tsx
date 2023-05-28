import { SVGIconProps } from '../../types';

const CaretRight = ({
	stroke = 'currentColor',
	strokeWidth = '1.5',
	className,
	fill = 'none',
}: SVGIconProps) => {
	return (
		<svg
			className={className}
			stroke={stroke}
			fill={fill}
			strokeWidth={strokeWidth}
			width="20"
			height="20"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
		>
			<g id="SVGRepo_iconCarrier">
				<g id="Arrow / Chevron_Right_MD">
					<path
						id="Vector"
						d="M10 8L14 12L10 16"
						stroke="currentColor"
						strokeWidth="currentStrokeWidth"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</g>
			</g>
		</svg>
	);
};

export default CaretRight;
