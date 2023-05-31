import { ReactComponent as TrashIcon } from '../../assets/trash.svg';
import { ReactComponent as EditIcon } from '../../assets/edit.svg';

type DropDownItemProps = {
	children: React.ReactNode;
	leftIcon: React.ReactNode;
	color?: string;
	onClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
};

type DropDownMenuProps = {
	openUpdateModal: () => void;
	toggleShowDropdown: () => void;
};

const DropDownItem = ({
	children,
	leftIcon,
	color,
	onClick,
}: DropDownItemProps) => {
	return (
		<div
			onClick={onClick}
			className="flex items-center gap-2 p-2 hover:bg-[#3c3c4b] cursor-pointer"
		>
			<span>{leftIcon}</span>
			<span className="px-2 font-semibold tracking-wide" style={{ color }}>
				{children}
			</span>
		</div>
	);
};

const DropDownMenu = ({ openUpdateModal, toggleShowDropdown }: DropDownMenuProps ) => {
	//TODO: Add delete functionality
	const handleItemClick = () => {
		toggleShowDropdown();
		openUpdateModal();
	};

	return (
		<div className="absolute top-[50px] bg-[#2e2e3b] z-10 right-0 rounded-lg shadow-md py-2 flex flex-col">
			<DropDownItem
				leftIcon={<EditIcon height={20} width={20} />}
				onClick={handleItemClick}
			>
				Edit
			</DropDownItem>

			<DropDownItem
				color="#E66671"
				leftIcon={<TrashIcon height={20} width={20} stroke="#e66671" />}
				onClick={() => console.log('Delete clicked')}
			>
				Delete
			</DropDownItem>
		</div>
	);
};

export default DropDownMenu;
