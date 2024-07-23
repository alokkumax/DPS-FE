import React, { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { IoIosArrowDown } from 'react-icons/io';
import { IoIosArrowUp } from 'react-icons/io';

function Dropdown({ data }) {
	const [selectedCity, setSelectedCity] = useState('');
	const [open, setOpen] = useState(false);
	console.log(open);

	return (
		<div class={ `dropdown ${open ? "dropdown-active" : ""}`}>
			<div onClick={() => setOpen(!open)}  class="dropbtn">Select city {open ? <IoIosArrowDown /> : <IoIosArrowUp />}</div>
			<div class={ `dropdown-content ${open ? "dropdown-content-active" : ""}`}>
        {data.map((itm) => (
					<li key={itm.id}>{itm.address.city}</li>
				))}
			</div>
		</div>
	);
}

export default Dropdown;
