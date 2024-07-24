import React, { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

interface User {
	id: number;
	address: {
		city: string;
	};
}

interface DropdownProps {
	data: User[];
	handleNameSubmit: (value: string) => void;
	selectedCity: string;
}

const Dropdown: React.FC<DropdownProps> = ({
	data,
	handleNameSubmit,
	selectedCity,
}) => {
	const [open, setOpen] = useState<boolean>(false);
	console.log(selectedCity);

	return (
		<div className={`dropdown ${open ? 'dropdown-active' : ''}`}>
			<button onClick={() => setOpen(!open)} className="dropbtn">
				{selectedCity === '' ? 'Select city' : selectedCity}{' '}
				{open ? <IoIosArrowDown /> : <IoIosArrowUp />}
			</button>
			<div
				className={`dropdown-content ${
					open ? 'dropdown-content-active' : ''
				}`}
			>
				{data.map((itm) => (
					<li
						key={itm.id}
						onClick={() => {
							setOpen(false);
							handleNameSubmit(itm.address.city);
						}}
					>
						{itm.address.city}
					</li>
				))}
			</div>
		</div>
	);
};

export default Dropdown;
