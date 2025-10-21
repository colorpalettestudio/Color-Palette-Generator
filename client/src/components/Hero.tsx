export default function Hero() {
  return (
    <section className="pt-12 pb-8 text-center">
      <div className="max-w-5xl mx-auto px-4">
        <div className="inline-block px-4 py-1.5 rounded-full bg-muted text-sm font-medium mb-6">
          Free, Instant & No Sign-Up Needed
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 leading-tight">
          Color Palette <span className="rainbow-text rainbow-text-animated">Generator</span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Shuffle random palettes, lock your favorites, and explore ready-made palettes.
        </p>
      </div>
    </section>
  );
}
