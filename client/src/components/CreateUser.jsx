import axios from 'axios';
import React, { useState } from 'react';

const CreateUser = () => {
  const [username, setUsername] = useState('');
  const onSubmit = (el) => {
    el.preventDefault();

    axios.post('http://localhost:5000/users/add', { username: username }).then((res) => console.log(res));

    window.location = '/';
  };
  return (
    <div>
      <h3>Create New User</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <input type="text" required className="form-control" value={username} onChange={(val) => setUsername(val.target.value)} />
        </div>
        <div className="form-group">
          <input type="submit" value="Create User" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
};

export default CreateUser;
