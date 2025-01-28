import React, { useState, useRef } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import InputField from './components/InputForm/InputField';
import DraggableField from './components/DragDrop/DraggableField';
import DropZone from './components/DragDrop/DropZone';
import Preview from './components/PDFPreview/Preview';
import { useReactToPrint } from 'react-to-print';
import axios from 'axios';

const initialFields = [
  { id: 'name', label: 'Full Name', value: '' },
  { id: 'email', label: 'Email', value: '' },
  { id: 'phone', label: 'Phone', value: '' },
  { id: 'address', label: 'Address', value: '' },
  { id: 'company', label: 'Company', value: '' }
];

const containerStyle = {
  padding: '20px',
  maxWidth: '1200px',
  margin: '0 auto',
};

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '20px',
  marginBottom: '20px'
};

const sectionStyle = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
};

const buttonStyle = {
  padding: '8px 16px',
  borderRadius: '4px',
  border: 'none',
  color: 'white',
  cursor: 'pointer',
  marginLeft: '10px'
};

function App() {
  const [fields, setFields] = useState(initialFields);
  const [selectedFields, setSelectedFields] = useState([]);
  const previewRef = useRef();

  const handleDrop = (item) => {
    if (!selectedFields.find(f => f.id === item.id)) {
      setSelectedFields([...selectedFields, item]);
    }
  };

  const handleRemove = (fieldId) => {
    setSelectedFields(selectedFields.filter(field => field.id !== fieldId));
  };

  const handleInputChange = (e, fieldId) => {
    const updatedFields = fields.map(field => 
      field.id === fieldId ? { ...field, value: e.target.value } : field
    );
    setFields(updatedFields);

    const updatedSelectedFields = selectedFields.map(field =>
      field.id === fieldId ? { ...field, value: e.target.value } : field
    );
    setSelectedFields(updatedSelectedFields);
  };

  const handlePrint = useReactToPrint({
    content: () => previewRef.current,
  });

  const handleDownloadPDF = async () => {
    try {
      const response = await axios.post('http://localhost:5000/generate-pdf', {
        fields: selectedFields
      }, {
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'generated-document.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={containerStyle}>
        <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>PDF Generator</h1>
        
        <div style={gridStyle}>
          {/* Input Fields */}
          <div style={sectionStyle}>
            <h2 style={{ fontSize: '20px', marginBottom: '15px' }}>Input Data</h2>
            {fields.map(field => (
              <InputField
                key={field.id}
                label={field.label}
                name={field.id}
                value={field.value}
                onChange={(e) => handleInputChange(e, field.id)}
              />
            ))}
          </div>

          {/* Available Fields */}
          <div style={sectionStyle}>
            <h2 style={{ fontSize: '20px', marginBottom: '15px' }}>Available Fields</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {fields.map(field => (
                <DraggableField key={field.id} field={field} />
              ))}
            </div>
          </div>

          {/* Drop Zone */}
          <div style={sectionStyle}>
            <DropZone
              selectedFields={selectedFields}
              onDrop={handleDrop}
              onRemove={handleRemove}
            />
          </div>
        </div>

        {/* Preview and Actions */}
        <div style={sectionStyle}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
            <button
              onClick={handlePrint}
              style={{ ...buttonStyle, backgroundColor: '#3490dc' }}
            >
              Print
            </button>
            <button
              onClick={handleDownloadPDF}
              style={{ ...buttonStyle, backgroundColor: '#38a169' }}
            >
              Download PDF
            </button>
          </div>
          
          <Preview ref={previewRef} selectedFields={selectedFields} />
        </div>
      </div>
    </DndProvider>
  );
}

export default App;