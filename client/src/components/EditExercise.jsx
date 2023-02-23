import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useParams } from 'react-router-dom';

const EditExercise = (props) => {
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState(new Date());
  const [users, setUsers] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchExercise = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/exercises/${id}`);
        const { username, description, duration, date: exerciseDate } = response.data;
        setUsername(username);
        setDescription(description);
        setDuration(duration);
        setDate(new Date(exerciseDate));
      } catch (error) {
        console.log(error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/users/');
        if (response.data.length > 0) {
          setUsers(response.data.map((user) => user.username));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchExercise();
    fetchUsers();
  }, [id]);

  const onSubmit = async (e) => {
    e.preventDefault();

    const exercise = {
      username,
      description,
      duration,
      date,
    };

    console.log(exercise);

    try {
      await axios.post(`http://localhost:5000/exercises/update/${id}`, exercise);
      window.location = '/';
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h3>Edit Exercise Log</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <select required className="form-control" value={username} onChange={(e) => setUsername(e.target.value)}>
            {users.map((user) => (
              <option key={user} value={user}>
                {user}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Description: </label>
          <input type="text" required className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input type="text" className="form-control" value={duration} onChange={(e) => setDuration(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker selected={date} onChange={(date) => setDate(date)} />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
};

export default EditExercise;
