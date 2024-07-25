import React, { useState } from 'react';
interface UserPropType {
	firstName: string;
	lastName: string;
	username: string;
	image: string;
	age: number;

	company: CompanyPropType;
}
interface CompanyPropType {
	name: string;
	department: string;
	title: string;
	address: {
		address: string;
		city: string;
		state: string;
	};
}
interface propType {
	open: boolean;
	onClose: () => void;
	selectedUser: UserPropType;
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
	// interface UserPropType {
	// 	firstName: string;
	// 	lastName: string;
	// 	username: string;
	// 	image: string;
	// 	company: CompanyPropType;
	// }
	// interface WorkPlacePropType{
	// 	user : UserPropType
	// }
	// const WorkPlace:React.FC<WorkPlacePropType> = ({user}) => {
	// 	return (
	// 		<div className="workplace">
	// 			<table>
	// 				<tr>
	// 					<td>Company</td>
	// 					{/* <td className="data">{user.company.department}</td> */}
	// 				</tr>
	// 				<tr>
	// 					<td>Address</td>
	// 					{/* <td className="data">
	// 						{selectedUser.company.address.address +
	// 							', ' +
	// 							selectedUser.company.address.city +
	// 							', ' +
	// 							selectedUser.company.address.state}
	// 					</td> */}
	// 				</tr>
	// 				<tr>
	// 					<td>Designation</td>
	// 					{/* <td className="data">{selectedUser.company.title}</td> */}
	// 				</tr>
	// 			</table>
	// 		</div>
	// 	);
	// };
	// console.log(selectedUser.company);
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
						<p>{selectedUser.age + " years old"}</p>
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
					{/* {toggle === 0 ? <WorkPlace user = {selectedUser} /> : ''} */}
				</div>
			</div>
		</div>
	);
};

export default Modal;
