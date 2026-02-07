import React from 'react';
import KanbanColumn from './KanbanColumn';

const KanbanBoard = ({ 
  columns, 
  onCardMove, 
  onCardClick, 
  renderCard,
  className = '' 
}) => {
  return (
    <div className={`flex gap-6 overflow-x-auto pb-4 ${className}`}>
      {columns.map((column) => (
        <KanbanColumn
          key={column.id}
          column={column}
          onCardMove={onCardMove}
          onCardClick={onCardClick}
          renderCard={renderCard}
        />
      ))}
    </div>
  );
};

export default KanbanBoard;
