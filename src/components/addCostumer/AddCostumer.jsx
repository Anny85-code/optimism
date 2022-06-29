import React, { useState } from 'react';
import './AddCostumer.css';

const AddCustomer = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [picture, setPicture] = useState('');
  const [isPending, setIsPending] = useState(false);
  // const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));
    const id = user.user.id;
    const customer = {
      user_id: id,
      name,
      email,
      phone,
      address,
      picture,
    };
    console.log(customer);
    setIsPending(true);
    const url = 'https://optimistic-food.herokuapp.com/api/v1/customers';
    const fetchData = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Accept: 'application/json',
        Authorization: localStorage.token,
        // 'Access-Control-Allow-Origin': '*',
      },
      // Auth: { bearer: localStorage.token },
      body: JSON.stringify(customer),
    });
    const fetchDataResponse = await fetchData.json();
    console.log(fetchDataResponse);
    // const newCustomerResp = newCustomer.json();
    // console.log(newCustomerResp);
    // .then((resp) => resp.json())
    // .then(() => console.log('New Costumer added'))
    // .then((data) => {
    //   if (data.error || data.errors) {
    //     const errorMsg = data.error || data.errors;
    //     dispatch({ type: 'CUSTOMER_FAILED', errorMsg });
    //   } else {
    //     window.history.pushState({}, '', '/dashboard');
    //     window.location.reload();
    //   }
    // });
    // const response = addCostumer.json();
    // console.log(response);
    setIsPending(false);
  };

  return (
    <div className="form-container">
      <h3 className="title">Add Customer</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">
            Name *
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              placeholder="Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="email">
            Email
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="phone">
            Phone *
            <input
              type="number"
              className="form-control"
              id="phone"
              name="phone"
              placeholder="Phone"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="address">
            Address *
            <input
              type="text"
              className="form-control"
              id="address"
              name="address"
              required
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="picture">
            Picture
            <input
              type="text"
              className="form-control"
              id="picture"
              name="picture"
              placeholder="picture"
              value={picture}
              onChange={(e) => setPicture(e.target.value)}
            />
          </label>
        </div>
        <div className="form-group btn">
          {!isPending && <button type="submit">Add Customer</button>}
          {isPending && (
            <button type="submit" disabled>
              Adding Customer . . .
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddCustomer;
