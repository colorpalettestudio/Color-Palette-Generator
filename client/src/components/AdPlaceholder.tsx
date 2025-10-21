export default function AdPlaceholder() {
  return (
    <div className="my-8">
      <div className="max-w-7xl mx-auto px-4">
        <div 
          className="h-[100px] border-2 border-dashed border-border rounded-xl flex items-center justify-center"
          data-testid="ad-placeholder"
        >
          <p className="text-muted-foreground text-sm">Ad space — coming soon</p>
        </div>
      </div>
    </div>
  );
}
