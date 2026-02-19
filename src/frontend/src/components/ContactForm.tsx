import { useState } from 'react';
import { useSubmitContactForm } from '../hooks/useSubmitContactForm';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle } from 'lucide-react';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const submitContactForm = useSubmitContactForm();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phoneNumber.replace(/\s/g, ''))) {
      newErrors.phoneNumber = 'Please enter a valid 10-digit phone number';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await submitContactForm.mutateAsync(formData);
      setSubmitted(true);
      setFormData({ name: '', phoneNumber: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error('Contact form error:', error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  if (submitted) {
    return (
      <div className="rounded-xl bg-card p-8 shadow-lg border border-border/40 text-center">
        <div className="flex justify-center mb-4">
          <div className="rounded-full bg-green-100 p-3">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
        <p className="text-muted-foreground">
          Your message has been received. We'll get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-card p-6 shadow-lg border border-border/40 md:p-8">
      <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <Label htmlFor="name">
            Full Name <span className="text-destructive">*</span>
          </Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-2"
            placeholder="Enter your name"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-destructive">{errors.name}</p>
          )}
        </div>

        <div>
          <Label htmlFor="phoneNumber">
            Phone Number <span className="text-destructive">*</span>
          </Label>
          <Input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="mt-2"
            placeholder="Enter 10-digit phone number"
          />
          {errors.phoneNumber && (
            <p className="mt-1 text-sm text-destructive">{errors.phoneNumber}</p>
          )}
        </div>

        <div>
          <Label htmlFor="email">Email (Optional)</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-2"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <Label htmlFor="message">
            Message <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="mt-2 min-h-[120px]"
            placeholder="Tell us how we can help you..."
          />
          {errors.message && (
            <p className="mt-1 text-sm text-destructive">{errors.message}</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={submitContactForm.isPending}
          className="w-full bg-labour-blue hover:bg-labour-blue/90"
        >
          {submitContactForm.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            'Send Message'
          )}
        </Button>
      </form>
    </div>
  );
}
