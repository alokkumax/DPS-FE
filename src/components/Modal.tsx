import React, { useState } from 'react';
interface userObj {
	firstName: string;
	lastName: string;
	username: string;
	company: {
		name: string;
		title: string;
		address: {
			address: string;
			city: string;
			state: string;
		};
	};
	// image:File
}
interface propType {
	open: boolean;
	onClose: () => void;
	selectedUser: userObj;
}

const Modal: React.FC<propType> = ({ open, onClose, selectedUser }) => {
	const [toggle, setToggle] = useState(0);
	const tabs = [
		{
			id: 0,
			label: 'Workplace',
		},
		{
			id: 1,
			label: 'Address',
		},
		{
			id: 2,
			label: 'Tags',
		},
		{
			id: 3,
			label: 'Contact',
		},
	];
	const handleToggle = (id: number) => {
		setToggle(id);
	};
	const WorkPlace = () => {
		return (
			<div className="workplace">
				<table>
					<tr>
						<td>Company</td>
						{/* <td className="data">{selectedUser.company.name}</td> */}
					</tr>
					<tr>
						<td>Address</td>
						{/* <td className="data">
							{selectedUser.company.address.address +
								', ' +
								selectedUser.company.address.city +
								', ' +
								selectedUser.company.address.state}
						</td> */}
					</tr>
					<tr>
						<td>Designation</td>
						{/* <td className="data">{selectedUser.company.title}</td> */}
					</tr>
				</table>
			</div>
		);
	};
	return (
		<div
			onClick={onClose}
			className={`modal-overlay ${open ? 'show-modal' : 'hide-modal'}`}
		>
			<div
				className={`modal ${open ? 'show-opacity' : 'hide-opacity'}`}
				onClick={(e) => e.stopPropagation()}
			>
				<div className="profile-top">
					<img
						className="profile-img"
						src={selectedUser.image}
						alt=""
					/>
					<div>
						<h1>
							{selectedUser.firstName +
								' ' +
								selectedUser.lastName}
						</h1>
						<p>@{selectedUser.username}</p>
					</div>
				</div>
				<div className="tabs">
					<ul>
						{tabs.map((tab) => (
							<li
								className={`${
									toggle === tab.id ? 'active-tab' : ''
								} tab-link`}
								key={tab.id}
								onClick={() => handleToggle(tab.id)}
							>
								{tab.label}
							</li>
						))}
					</ul>
					{toggle === 0 ? <WorkPlace /> : ''}
				</div>
			</div>
		</div>
	);
};

export default Modal;
