import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { IoSearch } from 'react-icons/io5';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { RiCheckboxBlankCircleLine } from 'react-icons/ri';
import { RiCheckboxCircleLine } from 'react-icons/ri';
import Dropdown from './Dropdown';

function UserData() {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [query, setQuery] = useState('');

	const [filteredData, setFilteredData] = useState([]);
	const [checked, setChecked] = useState(false);

	const handleChecked = () => {
		setChecked(!checked);
	};

	const fetchData = async () => {
		try {
			const response = await fetch('https://dummyjson.com/users');
			if (!response.ok) {
				throw new Error('NETWORK RESPONSE WAS NOT OK');
			}
			const res = await response.json();
			setData(res.users);
			console.log('tap');
		} catch (error) {
			setError(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);
	useEffect(() => {
		setFilteredData(data);
	}, [data]);
	useEffect(() => {
		if (query.length > 0) {
			getFilteredItems(query, data);
		} else {
			setFilteredData(data);
		}
	}, [query]);

	const getFilteredItems = (query, data) => {
		// search functionality with NAME
		if (!query) {
			setFilteredData(data);
		}
		let t = data.filter(
			(data) =>
				data.firstName.toUpperCase().startsWith(query.toUpperCase()) ||
				data.lastName.toUpperCase().startsWith(query.toUpperCase())
		); // for case sensitivity
		setFilteredData(t);
	};

	return (
		<div className="data_field">
			<div>
				<div className="filters">
					<div className="filter_btns">
						<div className="search__box">
							<div className="search">
								<IoSearch color="gray" />
								<input
									type="text"
									className="input"
									placeholder="Search username"
									onChange={(e) => {
										setQuery(e.target.value);
									}}
								/>
							</div>
						</div>

						<Dropdown data={data} />

						<div className="clear">
							<MdOutlineDeleteOutline />
						</div>
					</div>
					<div className="checkbox">
						<p>
							Highlight seniors of the cities{' '}
							{checked ? (
								<RiCheckboxCircleLine
									className="radio"
									onClick={handleChecked}
								/>
							) : (
								<RiCheckboxBlankCircleLine
									className="radio"
									onClick={handleChecked}
								/>
							)}
						</p>
					</div>
				</div>
				{!loading ? (
					<table id="customers">
						<tr>
							<th>Name</th>
							<th>City</th>
							<th>Birthday</th>
						</tr>
						{filteredData.slice(0, 10).map((itm) => (
							<tr key={itm.id}>
								<td>{itm.firstName + ' ' + itm.lastName}</td>
								<td>{itm.address.city}</td>
								<td>{itm.birthDate}</td>
							</tr>
						))}
					</table>
				) : (
					<p>Loading data ..</p>
				)}
			</div>

			<div className="pagination">
				<button className="active">1</button>
				<button>2</button>
				<button>3</button>
			</div>
		</div>
	);
}

export default UserData;
