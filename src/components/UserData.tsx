import React, { useEffect, useState } from 'react';
import { IoSearch } from 'react-icons/io5';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { MdCheckBoxOutlineBlank } from 'react-icons/md';
import { MdCheckBox } from 'react-icons/md';
import emptyPng from '../assets/empty.png';
import loadingGIF from '../assets/loading.gif';
import Dropdown from './Dropdown';
import Pagination from './Pagination';
import Modal from './Modal';

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

	const [open, setOpen] = useState<boolean>(false);
	const [selectedUser, setSelectedUser] = useState<any>({});
	const [oldestUsers, setOldestUsers] = useState<any>({});
	const [searchQuery, setSearchQuery] = useState<string>('');

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
		getCurrentData();
		getOldestPerCity().then((result: any) => setOldestUsers(result));
	}, [data, currentPage]);

	useEffect(() => {
		getFilteredItems();
	}, [query, selectedCity]);

	const getOldestPerCity = async () => {
		let oldestPerCity: any = {};

		const checkAge = (i: string, j: string) => {
			const date1 = new Date(i);
			const date2 = new Date(j);

			if (date1 < date2) {
				return false;
			} else if (date1 > date2) {
				return true;
			} else {
				return true;
			}
		};
		data.forEach((user) => {
			const city = user.address.city;
			if (
				!oldestPerCity[city] ||
				checkAge(user.birthDate, oldestPerCity[city].birtbirthDate)
			) {
				oldestPerCity[city] = user;
			}
		});

		return oldestPerCity;
	};

	const getCurrentData = () => {
		const indexOfLastUser = currentPage * postPerPage;
		const indexOfFirstUser = indexOfLastUser - postPerPage;
		const currentUser = data.slice(indexOfFirstUser, indexOfLastUser);
		setFilteredData(currentUser);
	};
	const getFilteredItems = () => {
		if (!query && !selectedCity) {
			getCurrentData();
		} else if (selectedCity && !query) {
			const filtered = data.filter(
				(user) => user.address.city == selectedCity
			);
			setFilteredData(filtered);
		} else if (query && !selectedCity) {
			const filtered = data.filter(
				(user) =>
					user.firstName
						.toUpperCase()
						.startsWith(query.toUpperCase()) ||
					user.lastName.toUpperCase().startsWith(query.toUpperCase())
			);
			setFilteredData(filtered);
		} else {
			const filtered = data.filter(
				(user) =>
					user.address.city == selectedCity &&
					(user.firstName
						.toUpperCase()
						.startsWith(query.toUpperCase()) ||
						user.lastName
							.toUpperCase()
							.startsWith(query.toUpperCase()))
			);
			setFilteredData(filtered);
		}
	};

	const handleNameSubmit = (value: string) => {
		setSelectedCity(value);
	};
	const handleClear = () => {
		setQuery('');
		setSearchQuery('');
		setSelectedCity('');
		setCurrentPage(1);
	};

	const paginate = (pageNumber: number) => {
		setCurrentPage(pageNumber);
	};
	const EmptyData = () => {
		return (
			<div className="emptyData">
				<img src={emptyPng} alt="" />
				<p>No Data Found</p>
			</div>
		);
	};
	const Loading = () => {
		return (
			<div className="loadingData">
				<img src={loadingGIF} alt="" />
			</div>
		);
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
									value={query}
									type="text"
									className="input"
									placeholder="Search username"
									onChange={(e) => {
										!loading && setQuery(e.target.value);
										setTimeout(() => {
											setLoading(false);
										}, 1000);
										setLoading(true);
									}}
								/>
							</div>
						</div>
						<div className="mobile">
							<Dropdown
								data={data}
								handleNameSubmit={handleNameSubmit}
								selectedCity={selectedCity}
							/>

							<div className="clear" onClick={handleClear}>
								<MdOutlineDeleteOutline />
							</div>
						</div>
					</div>
					<div className="checkbox" onClick={handleChecked}>
						<p>Highlight oldest per city </p>
						{checked ? (
							<MdCheckBox
								className="radio filled-radio"
								onClick={handleChecked}
							/>
						) : (
							<MdCheckBoxOutlineBlank className="radio" />
						)}
					</div>
				</div>
				{filteredData.length === 0 ? (
					<EmptyData />
				) : !loading ? (
					<table id="customers">
						<thead>
							<tr>
								<th>Name</th>
								<th>City</th>
								<th>Birthday</th>
							</tr>
						</thead>
						<tbody>
							{filteredData.map((itm) => (
								<tr
									key={itm.id}
									className={
										checked &&
										itm.id ===
											oldestUsers[itm.address.city].id
											? 'lighted'
											: ''
									}
									onClick={() => {
										setOpen(true);
										setSelectedUser(itm);
									}}
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
					<Loading />
				)}
			</div>
			<Pagination
				currentPage={currentPage}
				paginate={paginate}
				postPerPage={postPerPage}
				totalPosts={
					query || selectedCity ? filteredData.length : data.length
				}
			/>
			<Modal
				open={open}
				onClose={() => setOpen(false)}
				selectedUser={selectedUser}
			/>
		</div>
	);
};

export default UserData;
