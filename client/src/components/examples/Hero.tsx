import Hero from '../Hero';

export default function HeroExample() {
  return (
    <Hero 
      onShuffle={() => console.log('Shuffle clicked')}
      onAddColor={() => console.log('Add color clicked')}
      onClear={() => console.log('Clear clicked')}
      canAddMore={true}
    />
  );
}
