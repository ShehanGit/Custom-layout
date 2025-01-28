import React from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';

const FieldsList = ({ fields }) => {
  return (
    <Droppable droppableId="available-fields">
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="bg-gray-100 p-4 rounded-lg min-h-screen"
        >
          <h2 className="text-xl font-bold mb-4">Available Fields</h2>
          {fields.map((field, index) => (
            <Draggable key={field.id} draggableId={field.id} index={index}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className="bg-white p-4 mb-2 rounded shadow"
                >
                  {field.label}
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default FieldsList;