import React from 'react';

const inputGroupStyle = {
  marginBottom: '15px'
};

const labelStyle = {
  display: 'block',
  marginBottom: '5px',
  fontSize: '14px',
  fontWeight: 'bold'
};

const inputStyle = {
  width: '100%',
  padding: '8px',
  border: '1px solid #e2e8f0',
  borderRadius: '4px',
  fontSize: '14px'
};

const InputField = ({ label, name, value, onChange }) => {
  return (
    <div style={inputGroupStyle}>
      <label style={labelStyle}>
        {label}
      </label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        style={inputStyle}
      />
    </div>
  );
};

export default InputField;