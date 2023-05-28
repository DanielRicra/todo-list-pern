import { SVGIconProps } from '../../types';

const CaretDown = ({
	stroke = 'currentColor',
	strokeWidth = '1.5',
	className,
	fill = 'none',
}: SVGIconProps) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className={className}
			width="24"
			height="24"
			viewBox="0 0 24 24"
			strokeWidth={strokeWidth}
			stroke={stroke}
			fill={fill}
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<path d="M6 10l6 6l6 -6h-12" />
		</svg>
	);
};

export default CaretDown;
