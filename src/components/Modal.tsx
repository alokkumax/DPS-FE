import React from 'react'
interface userObj{
    firstName:string;
    lastName:string;
    username:string;
}
interface propType {
    open : boolean;
    onClose: ()=> void;
    selectedUser : userObj;
}

const Modal:React.FC<propType> = ({open,onClose,selectedUser}) => {
    console.log(selectedUser)
  return (
    <div onClick={onClose} className={ `modal-overlay ${open ? "show-modal": "hide-modal"}`}>
      <div className={ `modal ${open ? "show-opacity": "hide-opacity"}`} onClick={(e) => e.stopPropagation()}>
        <h3>{selectedUser.firstName + " " + selectedUser.lastName}</h3>
        <p>@{selectedUser.username}</p>
      </div>
    </div>
  )
}

export default Modal
