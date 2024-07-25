import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VehicleForm = () => {
  const [name, setName] = useState('');
  const [route, setRoute] = useState('');
  const [stages, setStages] = useState([{ stageName: '', time: '' }]);
 

  
  const handleStageChange = (index, event) => {
    const values = [...stages];
    values[index][event.target.name] = event.target.value;
    setStages(values);
  };

  const handleAddStage = () => {
    setStages([...stages, { stageName: '', time: '' }]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios.post('http://localhost:5000/api/vehicles', { name, route, stages });
    setName('');
    setRoute('');
    setStages([{ stageName: '', time: '' }]);
  };
  return (
    <div className="form-container">
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Vehicle Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
     
      {stages.map((stage, index) => (
        <div key={index} className="stage-container">
          <input
            type="text"
            name="stageName"
            placeholder="Stage Name"
            value={stage.stageName}
            onChange={(event) => handleStageChange(index, event)}
          />
          <input
            type="time"
            name="time"
            value={stage.time}
            onChange={(event) => handleStageChange(index, event)}
          />
        </div>
      ))}
      <button type="button" className="add-stage-button" onClick={handleAddStage}>Add Stage</button>
      <button type="submit" className="submit-button">Submit</button>
    </form>
  </div>
  );
};

export default VehicleForm;
