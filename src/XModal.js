import React, { useState } from 'react';

function XModal() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
      username: '',
      email: '',
      phone: '',
      dob: ''
    });
  
    const [errors, setErrors] = useState({});
  
    const handleOpenModal = () => {
      setIsModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setIsModalOpen(false);
    };
  
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value
      });
    };
  
    const validateForm = () => {
      let tempErrors = {};
  
      if (!formData.username) {
        tempErrors.username = 'Username is required';
      }
      
      if (!formData.email || !formData.email.includes('@')) {
        tempErrors.email = 'Invalid email. Please check your email address.';
      }
  
      if (!formData.phone || !/^\d{10}$/.test(formData.phone)) {
        tempErrors.phone = 'Invalid phone number. Please enter a 10-digit phone number.';
      }
  
      if (!formData.dob || !isValidDob(formData.dob)) {
        tempErrors.dob = 'Invalid date of birth. Date of birth cannot be in the future.';
      }
  
      return tempErrors;
    };
  
    const isValidDob = (dob) => {
      const selectedDate = new Date(dob);
      const today = new Date();
  
      // Reset time components to compare only the date
      today.setHours(0, 0, 0, 0);
  
      // Check if selected date is in the future
      return selectedDate <= today;
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const formErrors = validateForm();
  
      if (Object.keys(formErrors).length === 0) {
        alert('Form submitted successfully!');
        handleCloseModal();
        setFormData({
          username: '',
          email: '',
          phone: '',
          dob: ''
        });
      } else {
        setErrors(formErrors);
        Object.values(formErrors).forEach(error => alert(error));
      }
    };
  
    return (
      <div className="App">
        <h1>User Details Modal</h1>
        <button onClick={handleOpenModal}>Open Form</button>
  
        {isModalOpen && (
          <div className="modal" onClick={handleCloseModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h2>Fill Details</h2>
              <form onSubmit={handleSubmit}>
                <div>
                  <label>Username:</label>
                  <input
                    type="text"
                    id="username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                  {errors.username && <p>{errors.username}</p>}
                </div>
                <div>
                  <label>Email Address:</label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && <p>{errors.email}</p>}
                </div>
                <div>
                  <label>Phone Number:</label>
                  <input
                    type="text"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    pattern="\d*"
                    maxLength="10"
                  />
                  {errors.phone && <p>{errors.phone}</p>}
                </div>
                <div>
                  <label>Date of Birth:</label>
                  <input
                    type="date"
                    id="dob"
                    value={formData.dob}
                    onChange={handleChange}
                  />
                  {/* {errors.dob && <p>{errors.dob}</p>} */}
                </div>
                <button type="submit" className="submit-button">Submit</button>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }
 

export default XModal;