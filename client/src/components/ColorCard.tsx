import { Lock, LockOpen, X, GripVertical, Pipette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useRef } from 'react';

interface ColorCardProps {
  color: string;
  isLocked: boolean;
  onToggleLock: () => void;
  onRemove: () => void;
  canRemove: boolean;
  onCopy: (color: string) => void;
  onColorChange: (color: string) => void;
  onDragStart?: () => void;
  onDragOver?: (e: React.DragEvent) => void;
  onDragEnd?: () => void;
  isDragging?: boolean;
}

export default function ColorCard({ 
  color, 
  isLocked, 
  onToggleLock, 
  onRemove, 
  canRemove,
  onCopy,
  onColorChange,
  onDragStart,
  onDragOver,
  onDragEnd,
  isDragging = false,
}: ColorCardProps) {
  const [copied, setCopied] = useState(false);
  const colorInputRef = useRef<HTMLInputElement>(null);

  const handleCopy = () => {
    onCopy(color);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleColorClick = () => {
    colorInputRef.current?.click();
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onColorChange(e.target.value);
  };

  return (
    <div 
      className={`relative rounded-xl overflow-hidden shadow-md flex flex-col h-64 transition-opacity ${isDragging ? 'opacity-50' : 'opacity-100'}`}
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
    >
      <div 
        className="flex-1 relative group cursor-pointer"
        style={{ backgroundColor: color }}
        onClick={handleColorClick}
        data-testid={`color-card-${color}`}
      >
        <div 
          className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center text-white cursor-grab active:cursor-grabbing">
            <GripVertical className="w-4 h-4" />
          </div>
        </div>
        
        {canRemove && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center text-white transition-colors opacity-0 group-hover:opacity-100"
            data-testid={`button-remove-${color}`}
          >
            <X className="w-4 h-4" />
          </button>
        )}
        
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <div className="flex items-center gap-2 text-white font-medium text-sm px-4 py-2 bg-black/40 rounded-lg backdrop-blur-sm">
            <Pipette className="w-4 h-4" />
            <span>Pick color</span>
          </div>
        </div>

        <input
          ref={colorInputRef}
          type="color"
          value={color}
          onChange={handleColorChange}
          className="absolute opacity-0 pointer-events-none"
          data-testid={`input-color-${color}`}
        />
      </div>
      
      <div className="bg-background p-4 flex items-center justify-between border-t">
        <button
          onClick={handleCopy}
          className="font-mono text-sm font-medium hover:text-primary transition-colors flex-1 text-left"
          data-testid={`button-copy-${color}`}
        >
          {copied ? 'Copied!' : color.toUpperCase()}
        </button>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            onToggleLock();
            e.currentTarget.blur();
          }}
          className="hover-elevate active-elevate-2"
          aria-pressed={isLocked}
          aria-label={isLocked ? "Unlock color" : "Lock color"}
          data-testid={`button-lock-${color}`}
          data-locked={isLocked ? "true" : "false"}
        >
          {isLocked ? (
            <Lock className="w-4 h-4" />
          ) : (
            <LockOpen className="w-4 h-4" />
          )}
        </Button>
      </div>
    </div>
  );
}
