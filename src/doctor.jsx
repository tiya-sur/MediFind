import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Formtable from './formtable';

axios.defaults.baseURL = 'https://hos-backend.onrender.com/';

function DoctorList() {
  const [addSection, setAddSection] = useState(false);
  const [editSection, setEditSection] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    speciality: '',
    shiftstart: '',
    shiftend: '',
    slot: '',
    count: '',
  });

  const [formDataEdit, setFormDataEdit] = useState({
    name: '',
    email: '',
    mobile: '',
    speciality: '',
    shiftstart: '',
    shiftend: '',
    slot: '',
    count: '',
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
    const data = await axios.post('/doctors/create', formData);
    if (data.data.success) {
      setAddSection(false);
      alert(data.data.message);
      getFetchData();
      setFormData({
        name: '',
        email: '',
        mobile: '',
        speciality: '',
        shiftstart: '',
        shiftend: '',
        slot: '',
        count: '',
      });
    }
  };

  const getFetchData = async () => {
    try {
      const response = await axios.get('/doctors/');
      console.log('Data from server:', response.data);

      if (response.data.status === 'success') {
        setDataList(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDelete = async (id) => {
    const data = await axios.delete('/doctors/delete/' + id);
    if (data.data.success) {
      getFetchData();
      alert(data.data.message);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = await axios.put('/doctors/update', formDataEdit);
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
        Add Doctor
      </button>
      <br />
      {addSection && (
        <Formtable
          handleSubmit={handleSubmit}
          handleOnChange={handleOnChange}
          handleclose={() => setAddSection(false)}
          rest={formData}
        />
      )}
      {editSection && (
        <Formtable
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
              <th style={{ padding: '12px', textAlign: 'left' }}>Name</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Email</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Mobile</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Speciality</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Shift Start</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Shift End</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Slot</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Count</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {dataList.length > 0 ? (
              dataList.map((el, index) => (
                <tr
                  key={index}
                  style={{
                    borderBottom: '1px solid #1E88E5',
                    color: '#1E88E5',
                  }}
                >
                  <td style={{ padding: '12px' }}>{el.name}</td>
                  <td style={{ padding: '12px' }}>{el.email}</td>
                  <td style={{ padding: '12px' }}>{el.mobile}</td>
                  <td style={{ padding: '12px' }}>{el.speciality}</td>
                  <td style={{ padding: '12px' }}>{el.shiftstart}</td>
                  <td style={{ padding: '12px' }}>{el.shiftend}</td>
                  <td style={{ padding: '12px' }}>{el.slot}</td>
                  <td style={{ padding: '12px' }}>{el.count}</td>
                  <td style={{ padding: '12px' }}>
                    <button
                      className="btn btn-edit"
                      style={{
                        backgroundColor: '#1E88E5',
                        color: '#fff',
                        padding: '8px 16px',
                        borderRadius: '5px',
                        border: 'none',
                        cursor: 'pointer',
                        marginRight: '8px',
                      }}
                      onClick={() => handleEdit(el)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-delete"
                      style={{
                        backgroundColor: '#ff4444',
                        color: '#fff',
                        padding: '8px 16px',
                        borderRadius: '5px',
                        border: 'none',
                        cursor: 'pointer',
                      }}
                      onClick={() => handleDelete(el._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" style={{ textAlign: 'center', padding: '20px', color: '#1E88E5' }}>
                  No Data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DoctorList;