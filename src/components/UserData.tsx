import React, { useEffect, useState } from 'react';
import { IoSearch } from 'react-icons/io5';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import {
	RiCheckboxBlankCircleLine,
	RiCheckboxCircleLine,
} from 'react-icons/ri';
import Dropdown from './Dropdown';
import Pagination from './Pagination';

const UserData: React.FC = () => {
	const [data, setData] = useState<any[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	// const [error, setError] = useState<Error | null>(null);
	const [query, setQuery] = useState<string>('');
	const [filteredData, setFilteredData] = useState<any[]>([]);
	const [checked, setChecked] = useState<boolean>(false);
	const [selectedCity, setSelectedCity] = useState<string>('');

	const [currentPage, setCurrentPage] = useState(1);
	const [postPerPage] = useState(10);

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
			// setError(error as Error);
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

	const getFilteredItems = (query: string, data: any[]) => {
		if (!query) {
			setFilteredData(data);
		}
		const filtered = data.filter(
			(user) =>
				user.firstName.toUpperCase().startsWith(query.toUpperCase()) ||
				user.lastName.toUpperCase().startsWith(query.toUpperCase())
		);
		setFilteredData(filtered);
	};

	const handleNameSubmit = (value: string) => {
		setSelectedCity(value);
		console.log(selectedCity)
	};
	const handleClear = () => {
		setQuery('');
		setSelectedCity('');
	};

	const indexOfLastUser = currentPage * postPerPage;
	const indexOfFirstUser = indexOfLastUser - postPerPage;
	const currentUser = filteredData.slice(indexOfFirstUser, indexOfLastUser);

	const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

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

						<Dropdown
							data={data}
							handleNameSubmit={handleNameSubmit}
						/>

						<button className="clear" onClick={handleClear}>
							<MdOutlineDeleteOutline />
						</button>
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
						<thead>
							<tr>
								<th>Name</th>
								<th>City</th>
								<th>Birthday</th>
							</tr>
						</thead>
						<tbody>
							{currentUser.map((itm) => (
								<tr
									key={itm.id}
									className={checked ? 'lighted' : ''}
								>
									<td>
										{itm.firstName + ' ' + itm.lastName}
									</td>
									<td>{itm.address.city}</td>
									<td>{itm.birthDate}</td>
								</tr>
							))}
						</tbody>
					</table>
				) : (
					<p>Loading data ..</p>
				)}
			</div>

			<Pagination
				currentPage={currentPage}
				paginate={paginate}
				postPerPage={postPerPage}
				totalPosts={filteredData.length}
			/>
		</div>
	);
};

export default UserData;
