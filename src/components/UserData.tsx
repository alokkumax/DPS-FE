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
	const [query, setQuery] = useState<string>('');
	const [filteredData, setFilteredData] = useState<any[]>([]);
	const [checked, setChecked] = useState<boolean>(false);
	const [selectedCity, setSelectedCity] = useState<string>('');

	const [currentPage, setCurrentPage] = useState(1);
	const [postPerPage] = useState(10);

	const [open, setOpen] = useState<boolean>(false);
	const [selectedUser, setSelectedUser] = useState<any>({});
	const [oldestUsers, setOldestUsers] = useState<any>({});

	const handleChecked = () => {
		setChecked(!checked);
	};

	// function for data fetch from END POINT
	const fetchData = async () => {
		try {
			const response = await fetch('https://dummyjson.com/users');
			if (!response.ok) {
				throw new Error('NETWORK RESPONSE WAS NOT OK');
			}
			const res = await response.json();
			setData(res.users);
		} catch (error) {
			console.error(error);
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

	// function to get an Object with KEY : VAL as
	// { CITY : OLDEST USER }
	const getOldestPerCity = async () => {
		let oldestPerCity: any = {};
		const checkAge = (i: string, j: string) => {
			const date1 = new Date(i);
			const date2 = new Date(j);
			console.log(date1);
			console.log(date2);
			if (date1 < date2) {
				return true;
			} else if (date1 > date2) {
				return false;
			} else {
				return true;
			}
		};

		data.forEach((user) => {
			const city = user.address.city;
			if (
				!oldestPerCity[city] ||
				checkAge(user.birthDate, oldestPerCity[city].birthDate)
			) {
				oldestPerCity[city] = user;
			}
		});
		return oldestPerCity;
	};

	// called when pagination is changed
	const getCurrentData = () => {
		const indexOfLastUser = currentPage * postPerPage;
		const indexOfFirstUser = indexOfLastUser - postPerPage;
		const currentUser = data.slice(indexOfFirstUser, indexOfLastUser);
		setFilteredData(currentUser);
	};

	// Filters data based on different conditions, returns the filteredArray
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

	// handles the selected {city} from DropDown Component
	const handleNameSubmit = (value: string) => {
		setSelectedCity(value);
	};

	// RESET button functionality
	const handleClear = () => {
		setQuery('');
		setSelectedCity('');
		setCurrentPage(1);
	};

	const paginate = (pageNumber: number) => {
		setCurrentPage(pageNumber);
	};

	// when list is empty, shows this component
	const EmptyData = () => {
		return (
			<div className="emptyData">
				<img src={emptyPng} alt="" />
				<p>No Data Found</p>
			</div>
		);
	};

	// when searching with queries, shows this component
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
									placeholder="Search Name"
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
