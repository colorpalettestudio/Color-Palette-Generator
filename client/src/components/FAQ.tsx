import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How do I lock a color?",
    answer: "Click the lock icon below any swatch to prevent it from changing when you shuffle."
  },
  {
    question: "Can I add or remove colors?",
    answer: "Yes, add up to 10 or remove extras anytime."
  },
  {
    question: "Can I copy HEX codes?",
    answer: "Click a color's code to instantly copy it to your clipboard."
  },
  {
    question: "How do I export my palette?",
    answer: "Use the export button to download your palette as PNG, PDF, SVG, Adobe Swatches, or VS Code theme."
  },
  {
    question: "Is it free to use?",
    answer: "100% free — no login or watermark."
  },
  {
    question: "Can I use these palettes commercially?",
    answer: "Yes! All generated palettes are royalty-free."
  }
];

export default function FAQ() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
        
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left" data-testid={`faq-question-${index}`}>
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground" data-testid={`faq-answer-${index}`}>
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
