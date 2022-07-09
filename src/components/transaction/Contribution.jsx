import React from 'react';

const Contribution = () => {
  const handleDays = (e) => {
    console.log(+e.target.value);
  };

  return (
    <div>
      <h2>Customer Details</h2>
      <div>
        <p>Name:</p>
        <p>Daily Contribution:</p>
        <h2>Customer Details</h2>
        <input
          type="number"
          className="form-control"
          id="days_number"
          placeholder="No. of days"
          required
          autoCorrect="off"
          onChange={handleDays}
        />
        <p>Previous payment date:</p>
        <p>Current payment date:</p>
      </div>
    </div>
  );
};

export default Contribution;
