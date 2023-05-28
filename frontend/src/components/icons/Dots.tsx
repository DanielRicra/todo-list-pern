import { SVGIconProps } from '../../types';

const Dots = ({
	stroke = 'currentColor',
	strokeWidth = '1.5',
	className,
	fill = 'none',
}: SVGIconProps) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
         strokeWidth={strokeWidth}
			stroke={stroke}
			fill={fill}
         className={className}
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<path d="M5 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
			<path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
			<path d="M19 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
		</svg>
	);
};

export default Dots;
