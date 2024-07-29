import React, { useState } from 'react';
import './Popup.css';

const schemaOptions = [
  { label: 'First Name', value: 'first_name' },
  { label: 'Last Name', value: 'last_name' },
  { label: 'Gender', value: 'gender' },
  { label: 'Age', value: 'age' },
  { label: 'Account Name', value: 'account_name' },
  { label: 'City', value: 'city' },
  { label: 'State', value: 'state' },
];

function Popup({ onClose }) {
  const [segmentName, setSegmentName] = useState('');
  const [selectedSchemas, setSelectedSchemas] = useState([]);
  const [availableOptions, setAvailableOptions] = useState(schemaOptions);
  const [currentSelection, setCurrentSelection] = useState('');

  const addSchema = () => {
    if (currentSelection) {
      const selectedOption = availableOptions.find(option => option.value === currentSelection);
      setSelectedSchemas([...selectedSchemas, selectedOption]);
      setAvailableOptions(availableOptions.filter(option => option.value !== currentSelection));
      setCurrentSelection('');
    }
  };

  const saveSegment = () => {
    const data = {
      segment_name: segmentName,
      schema: selectedSchemas.map(schema => ({ [schema.value]: schema.label }))
    };

    // Send data to server
    fetch('https://webhook.site/YOUR_UNIQUE_WEBHOOK_URL', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    onClose();
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <h2>Save Segment</h2>
        <label>
          Segment Name:
          <input type="text" value={segmentName} onChange={(e) => setSegmentName(e.target.value)} />
        </label>
        <label>
          Add schema to segment:
          <select value={currentSelection} onChange={(e) => setCurrentSelection(e.target.value)}>
            <option value="" disabled>Select an option</option>
            {availableOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </label>
        <button onClick={addSchema}>+ Add new schema</button>
        <div className="schema-list">
          {selectedSchemas.map((schema, index) => (
            <div key={index} className="schema-item">
              <select
                value={schema.value}
                onChange={(e) => {
                  const newSchemas = [...selectedSchemas];
                  const newValue = e.target.value;
                  const newOption = schemaOptions.find(option => option.value === newValue);
                  newSchemas[index] = newOption;
                  setSelectedSchemas(newSchemas);
                  setAvailableOptions([...availableOptions.filter(option => option.value !== newValue), schema]);
                }}
              >
                {schemaOptions.filter(option => !selectedSchemas.some(selected => selected.value === option.value)).map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
        <button onClick={saveSegment}>Save segment</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default Popup;
