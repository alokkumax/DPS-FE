import React, { useEffect, useRef, useState } from 'react';
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
	const ref:any = useRef();

	useEffect(()=> {
		let handler = (e : any) => {
			let node: any = ref.current;
			if(node && !node.contains(e.target)){
				setOpen(false)
			}
		}
		document.addEventListener("mousedown",handler)
	},[])
	let cities: string[] = [];
	data.map((itm) => cities.push(itm.address.city));

	let uniqCities: string[] = [];
	cities.forEach((element) => {
		if (!uniqCities.includes(element)) {
			uniqCities.push(element);
		}
	});

	return (
		<div className={`dropdown ${open ? 'dropdown-active' : ''}`} ref={ref}>
			<button onClick={() => setOpen(!open)} className="dropbtn">
				{selectedCity === '' ? 'Select city' : selectedCity}{' '}
				{open ? <IoIosArrowDown /> : <IoIosArrowUp />}
			</button>
			<div
				className={`dropdown-content ${
					open ? 'dropdown-content-active' : ''
				}`}
			>
				{uniqCities.sort().map((itm, index) => (
					<li
						key={index}
						onClick={() => {
							setOpen(false);
							handleNameSubmit(itm);
						}}
					>
						{itm}
					</li>
				))}
				{/* {uniq.map((itm) => (
					<li
						key={itm.id}
						onClick={() => {
							setOpen(false);
							handleNameSubmit(itm.address.city);
						}}
					>
						{itm.address.city}
					</li>
				))} */}
			</div>
		</div>
	);
};

export default Dropdown;
