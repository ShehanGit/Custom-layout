import React from 'react';
import { useDrag } from 'react-dnd';

const fieldStyle = {
  padding: '10px',
  backgroundColor: 'white',
  border: '1px solid #e2e8f0',
  borderRadius: '4px',
  marginBottom: '8px',
  cursor: 'move',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
};

const DraggableField = ({ field }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'field',
    item: field,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        ...fieldStyle,
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      <span>{field.label}</span>
      <span style={{ color: '#718096' }}>⋮</span>
    </div>
  );
};

export default DraggableField;