import React, { useState } from 'react'

const AddCostumer = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const costumer = {name, email, phone, address};
    fetch('http://localhost:3000/costumers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(costumer)
    }).then(() => console.log('New Costumer added'))
  }

  return (
    <div>
      <form onSubmit={handleSubmit()}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" className="form-control" id="name" name="name" required value={name} onChange={(e) => setName(e.target.value)}/>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" className="form-control" id="email" name="email" required value={email} onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input type="text" className="form-control" id="phone" name="phone" required value={phone} onChange={(e) => setPhone(e.target.value)}/>
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input type="text" className="form-control" id="address" name="address" required value={address} onChange={(e) => setAddress(e.target.value)}/>
        </div>
        <div className="form-group">
          <button type="submit">Add Costumer</button>
        </div>
      </form>
    </div>
  )
}

export default AddCostumer;
