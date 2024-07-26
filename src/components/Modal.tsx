import React from 'react';
interface UserPropType {
	firstName: string;
	lastName: string;
	username: string;
	image: string;
	age: number;
	role:string;
	phone:string;
	email:string;
}

interface propType {
	open: boolean;
	onClose: () => void;
	selectedUser: UserPropType;
}

const Modal: React.FC<propType> = ({ open, onClose, selectedUser }) => {

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
					<div>
					<img
						className="profile-img"
						src={selectedUser.image}
						alt=""
					/>
					<div>
						<h3>
							{selectedUser.firstName +
								' ' +
								selectedUser.lastName}
						</h3>
						<p>@{selectedUser.username}</p>
					</div>
					</div>
					<div className="admin">
						#{selectedUser.role}
					</div>
				</div>
				<div className="tabs">
				<div className="workplace">
				<table>
					<tr>
						<td>Age</td>
						<td className="data">{selectedUser.age}</td>
					</tr>
					<tr>
						<td>Phone No</td>
						<td className="data">{selectedUser.phone}</td>

					</tr>
					<tr>
						<td>Email</td>
						<td className="data">{selectedUser.email}</td>

					</tr>
				</table>
			</div>
				</div>
			</div>
		</div>
	);
};

export default Modal;
