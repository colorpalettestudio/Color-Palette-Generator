import { Lock, LockOpen, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface ColorCardProps {
  color: string;
  isLocked: boolean;
  onToggleLock: () => void;
  onRemove: () => void;
  canRemove: boolean;
  onCopy: (color: string) => void;
}

export default function ColorCard({ 
  color, 
  isLocked, 
  onToggleLock, 
  onRemove, 
  canRemove,
  onCopy 
}: ColorCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    onCopy(color);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative rounded-xl overflow-hidden shadow-md flex flex-col h-64">
      <div 
        className="flex-1 relative group cursor-pointer"
        style={{ backgroundColor: color }}
        onClick={handleCopy}
        data-testid={`color-card-${color}`}
      >
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
          onClick={onToggleLock}
          className="hover-elevate active-elevate-2"
          data-testid={`button-lock-${color}`}
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
