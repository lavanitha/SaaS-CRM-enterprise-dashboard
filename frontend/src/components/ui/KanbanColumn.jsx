import React from 'react';
import GlassCard from './GlassCard';
import Badge from './Badge';

const KanbanColumn = ({ 
  column, 
  onCardMove, 
  onCardClick, 
  renderCard 
}) => {
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const cardId = e.dataTransfer.getData('text/plain');
    const targetColumnId = column.id;
    
    if (onCardMove) {
      onCardMove(cardId, targetColumnId);
    }
  };

  return (
    <div className="flex-shrink-0 w-80">
      {/* Column Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-white font-semibold text-lg">{column.title}</h3>
          <Badge variant="secondary" size="sm">
            {column.cards?.length || 0}
          </Badge>
        </div>
        {column.addButton && (
          <button className="text-white/60 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        )}
      </div>

      {/* Cards Container */}
      <div 
        className="space-y-3 min-h-[500px] p-2"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {column.cards?.map((card, index) => {
          const cardKey = card._id || card.id || `card-${index}`;
          return (
            <div
              key={cardKey}
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData('text/plain', cardKey);
              }}
              onClick={() => onCardClick?.(card)}
              className="cursor-pointer"
            >
              {renderCard ? renderCard(card) : (
                <GlassCard className="p-4 hover:scale-105 transition-transform">
                  <h4 className="text-white font-medium mb-2">{card.title}</h4>
                  <p className="text-white/60 text-sm">{card.description}</p>
                </GlassCard>
              )}
            </div>
          );
        })}
        
        {/* Empty State */}
        {(!column.cards || column.cards.length === 0) && (
          <div className="text-center py-8 text-white/40">
            <p className="text-sm">No items</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default KanbanColumn;
