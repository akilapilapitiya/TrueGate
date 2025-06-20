import React from 'react'
import '../styles/pages/UserManage.css';

const UserManage = () => {
  return (
    <div className='user-manage-container'>
      <h1>Manage Users</h1>
      <div className="search-container">
        <input type="text" placeholder='Search Users'/>
      </div>
      <div className="table-container">
        <table>
          <tr>
            <th>User ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
          
        </table>
      </div>
    </div>
  )
}

export default UserManage