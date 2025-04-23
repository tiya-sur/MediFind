import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pattable from './pattable';
axios.defaults.baseURL = 'https://hos-backend.onrender.com/';

function PatientList() {
  const [addSection, setAddSection] = useState(false);
  const [editSection, setEditSection] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    gender: '',
    address: '',
    reason: '',
    admitdate: '',
    admittime: '',
    room: '',
  });

  const [formDataEdit, setFormDataEdit] = useState({
    name: '',
    mobile: '',
    gender: '',
    address: '',
    reason: '',
    admitdate: '',
    admittime: '',
    room: '',
    _id: '',
  });

  const [dataList, setDataList] = useState([]);

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await axios.post('/patients/create', formData);
    if (data.data.success) {
      setAddSection(false);
      alert(data.data.message);
      getFetchData();
      setFormData({
        name: '',
        mobile: '',
        gender: '',
        address: '',
        reason: '',
        admitdate: '',
        admittime: '',
        room: '',
      });
    }
  };

  const getFetchData = async () => {
    const data = await axios.get('/patients/');
    if (data.data.success) {
      setDataList(data.data.data);
    }
  };

  const handleDelete = async (id) => {
    const data = await axios.delete('/patients/delete/' + id);
    if (data.data.success) {
      getFetchData();
      alert(data.data.message);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = await axios.put('/patients/update', formDataEdit);
    if (data.data.success) {
      getFetchData();
      alert(data.data.message);
      setEditSection(false);
    }
  };

  const handleEditOnChange = (e) => {
    const { value, name } = e.target;
    setFormDataEdit((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEdit = (el) => {
    setFormDataEdit(el);
    setEditSection(true);
  };

  useEffect(() => {
    getFetchData();
  }, []);

  return (
    <div
      className="white-background-container"
      style={{
        width: '90%',
        maxWidth: '1200px',
        margin: '40px auto',
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <button
        className="btn btn-add"
        style={{
          backgroundColor: '#1E88E5',
          color: '#fff',
          padding: '10px 20px',
          borderRadius: '5px',
          border: 'none',
          cursor: 'pointer',
          marginBottom: '20px',
        }}
        onClick={() => setAddSection(true)}
      >
        Add Patient
      </button>
      <br />
      {addSection && (
        <Pattable
          handleSubmit={handleSubmit}
          handleOnChange={handleOnChange}
          handleclose={() => setAddSection(false)}
          rest={formData}
        />
      )}
      {editSection && (
        <Pattable
          handleSubmit={handleUpdate}
          handleOnChange={handleEditOnChange}
          handleclose={() => setEditSection(false)}
          rest={formDataEdit}
        />
      )}
      <div className="tableContainer">
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            backgroundColor: '#fff',
            borderRadius: '10px',
            overflow: 'hidden',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          <thead>
            <tr style={{ backgroundColor: '#1E88E5', color: '#fff' }}>
              <th>Name</th>
              <th>Mobile</th>
              <th>Gender</th>
              <th>Address</th>
              <th>Reason</th>
              <th>Admit Date</th>
              <th>Admit Time</th>
              <th>Room</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {dataList.length > 0 ? (
              dataList.map((el, index) => (
                <tr key={index} style={{ borderBottom: '1px solid #1E88E5', color: '#1E88E5' }}>
                  <td>{el.name}</td>
                  <td>{el.mobile}</td>
                  <td>{el.gender}</td>
                  <td>{el.address}</td>
                  <td>{el.reason}</td>
                  <td>{el.admitdate}</td>
                  <td>{el.admittime}</td>
                  <td>{el.room}</td>
                  <td>
                    <button className="btn btn-edit" style={{ backgroundColor: '#1E88E5', color: '#fff' }} onClick={() => handleEdit(el)}>Edit</button>
                    <button className="btn btn-delete" style={{ backgroundColor: '#ff4444', color: '#fff' }} onClick={() => handleDelete(el._id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" style={{ textAlign: 'center', padding: '20px', color: '#1E88E5' }}>No Data</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PatientList;