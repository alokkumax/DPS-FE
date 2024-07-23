import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { IoSearch } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineDeleteOutline } from "react-icons/md";

function UserData() {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const [fname, setFName] = useState('');
	const [lname, setLName] = useState('');
	const [cities, setCities] = useState('');
	const [check, setCheck] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch('https://dummyjson.com/users');
				if (!response.ok) {
					throw new Error('NETWORK RESPONSE WAS NOT OK');
				}
				const res = await response.json();
				setData(res.users);
				console.log(data);
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, []);

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error.message}</div>;

	return (
		<div className='data_field'>
            <div className='filters'>
                <div className='filter_btns'>
                    <div className="search__box">
                        <div className="search">
                        <IoSearch color="gray" />
                        <input type="text" className='input' placeholder="Search username" />
                        </div>
                    </div>
                    <div className="dropdown">
                        <button className="dropbtn">Select City  <IoIosArrowDown/></button>
                        <div className="dropdown-content">
                            {
                                data.map(itm => (
                                    <a href="#" key={itm.id}>{itm.address.city}</a>

                                ))
                            }
                        </div>
                    </div>
                    
                    <div className='clear'><MdOutlineDeleteOutline/></div>
                </div>
                <div className='checkbox'>CHECK</div>
            </div>
			<table id="customers">
				<tr>
					<th>Company</th>
					<th>Contact</th>
					<th>Country</th>
				</tr>
				{data.map((itm) => (
					<tr key={itm.id}>
						<td>{itm.firstName}</td>
						<td>{itm.address.city}</td>
						<td>{itm.birthDate}</td>
					</tr>
				))}
			</table>
		</div>
	);
}

export default UserData;
