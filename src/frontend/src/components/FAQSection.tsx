import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export function FAQSection() {
  const faqs = [
    {
      question: 'How do I book a labour service?',
      answer:
        'Booking is simple! Fill out our online booking form with your details, select the type of work needed, and pay a ₹300 advance booking fee securely through our payment gateway. You can also call us or WhatsApp us directly for immediate assistance.',
    },
    {
      question: 'Why do I need to pay ₹300 advance?',
      answer:
        'The ₹300 advance booking fee confirms your booking and ensures the worker is reserved for your project. This small advance helps us maintain service quality and commitment from both parties. The remaining payment is made directly to the worker after work completion.',
    },
    {
      question: 'Which areas do you serve?',
      answer:
        'We currently serve Tinsukia and Doomdooma districts in Assam, including surrounding areas. If you are unsure whether we cover your location, please contact us and we will confirm availability in your area.',
    },
    {
      question: 'Are your workers verified?',
      answer:
        'Yes, absolutely! Every worker on our platform goes through a thorough verification process. We check their skills, experience, identity documents, and past work references. We only onboard workers who meet our high standards of professionalism and expertise.',
    },
    {
      question: 'How is pricing determined?',
      answer:
        'We believe in transparent pricing. The ₹300 is just the advance booking fee. The actual service charges depend on the type of work, duration, and project requirements. Our workers provide fair quotes based on industry standards, and there are no hidden charges.',
    },
    {
      question: 'Can I get same-day service?',
      answer:
        'Yes, in many cases we can arrange same-day service depending on worker availability and the type of work required. For urgent requirements, we recommend calling us directly or using WhatsApp for the fastest response.',
    },
    {
      question: 'What is your cancellation policy?',
      answer:
        'If you need to cancel or reschedule, please inform us at least 24 hours in advance. For cancellations made with proper notice, we can refund the advance fee or reschedule your booking. Last-minute cancellations may have different terms.',
    },
    {
      question: 'Do you provide any service guarantee?',
      answer:
        'Yes! We stand behind the quality of our workers. If you face any issues with the work quality or worker behavior, please contact us immediately. We will work to resolve the issue and ensure your satisfaction, including sending a replacement worker if needed.',
    },
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold md:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Everything you need to know about our services
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="rounded-lg bg-card border border-border/40 px-6 shadow-sm"
              >
                <AccordionTrigger className="text-left font-semibold hover:text-labour-blue">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
