import React from 'react';
import { useDrop } from 'react-dnd';
import DraggableField from './DraggableField';

const dropZoneStyle = {
  minHeight: '200px',
  backgroundColor: '#f7fafc',
  border: '2px dashed #e2e8f0',
  borderRadius: '4px',
  padding: '20px'
};

const DropZone = ({ selectedFields, onDrop, onRemove }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'field',
    drop: (item) => onDrop(item),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div>
      <h2 style={{ fontSize: '20px', marginBottom: '15px' }}>PDF Layout</h2>
      <div
        ref={drop}
        style={{
          ...dropZoneStyle,
          backgroundColor: isOver ? '#edf2f7' : '#f7fafc',
        }}
      >
        {selectedFields.map((field) => (
          <div key={field.id} style={{ position: 'relative' }}>
            <DraggableField field={field} />
            <button
              onClick={() => onRemove(field.id)}
              style={{
                position: 'absolute',
                right: '10px',
                top: '10px',
                border: 'none',
                background: 'none',
                color: '#e53e3e',
                cursor: 'pointer'
              }}
            >
              ×
            </button>
          </div>
        ))}
        {selectedFields.length === 0 && (
          <div style={{ textAlign: 'center', color: '#718096' }}>
            Drag fields here
          </div>
        )}
      </div>
    </div>
  );
};

export default DropZone;