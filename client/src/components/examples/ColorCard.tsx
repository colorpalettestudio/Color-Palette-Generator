import ColorCard from '../ColorCard';

export default function ColorCardExample() {
  return (
    <div className="w-64">
      <ColorCard 
        color="#FF6B6B"
        isLocked={false}
        onToggleLock={() => console.log('Toggle lock')}
        onRemove={() => console.log('Remove color')}
        canRemove={true}
        onCopy={(color) => console.log('Copy', color)}
        onDragStart={() => console.log('Drag start')}
        onDragOver={(e) => console.log('Drag over')}
        onDragEnd={() => console.log('Drag end')}
        isDragging={false}
      />
    </div>
  );
}
