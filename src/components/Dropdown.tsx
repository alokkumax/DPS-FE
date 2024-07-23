import React, { useState } from 'react';
// import { AiOutlineSearch } from 'react-icons/ai';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

interface User {
	id: number;
	address: {
		city: string;
	};
}

interface DropdownProps {
	data: User[];
	id?: number;
	handleNameSubmit: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ data, id , handleNameSubmit}) => {
	const [selectedCity, setSelectedCity] = useState<string>('');
	const [open, setOpen] = useState<boolean>(false);


	return (
		<div className={`dropdown ${open ? 'dropdown-active' : ''}`}>
			<button onClick={() => setOpen(!open)} className="dropbtn">
				{selectedCity == '' ? 'Select city' : selectedCity}{' '}
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
							setSelectedCity(itm.address.city);
							handleNameSubmit(itm.address.city)
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
