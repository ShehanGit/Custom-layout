import React from 'react';

const previewStyle = {
  padding: '20px',
  backgroundColor: 'white',
  borderRadius: '4px',
  border: '1px solid #e2e8f0'
};

const Preview = React.forwardRef(({ selectedFields }, ref) => {
  return (
    <div ref={ref} style={previewStyle}>
      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Generated Document</h1>
      {selectedFields.map((field) => (
        <div key={field.id} style={{ marginBottom: '10px' }}>
          <span style={{ fontWeight: 'bold' }}>{field.label}:</span>{' '}
          <span>{field.value || 'N/A'}</span>
        </div>
      ))}
    </div>
  );
});

export default Preview;