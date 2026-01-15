'use client';

import type React from 'react';

import { useState } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { RateTicker } from '@/components/rate-ticker';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  Send,
  Building2,
  Headphones,
  CheckCircle,
} from 'lucide-react';

const contactMethods = [
  {
    icon: Phone,
    title: 'Phone Support',
    description: 'Speak to our team directly',
    value: '+91 98765 43210',
    action: 'tel:+919876543210',
  },
  {
    icon: Mail,
    title: 'Email Us',
    description: 'Get response within 24 hours',
    value: 'support@mycurrency.in',
    action: 'mailto:support@mycurrency.in',
  },
  {
    icon: MessageSquare,
    title: 'Live Chat',
    description: 'Chat with us in real-time',
    value: 'Available 9 AM - 7 PM',
    action: '#',
  },
  {
    icon: Headphones,
    title: 'WhatsApp',
    description: 'Quick queries on WhatsApp',
    value: '+91 98765 43210',
    action: 'https://wa.me/919876543210',
  },
];

const offices = [
  {
    city: 'Haryana (Head Office)',
    address: 'E-187, Jindal Global City, Sector 35, Sonipat, Haryana 131001',
    phone: '+91 99912 25544',
  },
  {
    city: 'Delhi',
    address: '456 Connaught Place, New Delhi - 110001',
    phone: '+91 99912 25544',
  },
  {
    city: 'Bangalore',
    address: '789 MG Road, Bangalore - 560001',
    phone: '+91 99912 25544',
  },
  {
    city: 'Chennai',
    address: '321 Anna Salai, Chennai - 600002',
    phone: '+91 99912 25544',
  },
];

const inquiryTypes = [
  'Currency Exchange',
  'Money Transfer',
  'Forex Card',
  'Corporate Services',
  'Partnership Inquiry',
  'Feedback / Complaint',
  'Other',
];

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        inquiryType: '',
        message: '',
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <RateTicker />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-primary text-primary-foreground py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-5xl font-bold mb-6 text-balance">
                Get in Touch
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/80 leading-relaxed">
                Have questions about our services? We're here to help. Reach out
                to us through any of the channels below, and our team will get
                back to you promptly.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-12 bg-card border-b border-border">
          <div className="container mx-auto px-4">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactMethods.map((method) => (
                <a key={method.title} href={method.action} className="group">
                  <Card className="h-full bg-card border-border hover:shadow-lg hover:border-primary/30 transition-all">
                    <CardContent className="p-6 text-center">
                      <div className="inline-flex p-3 bg-primary/10 rounded-full mb-4 group-hover:bg-primary/20 transition-colors">
                        <method.icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-1">
                        {method.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {method.description}
                      </p>
                      <p className="text-sm font-medium text-primary">
                        {method.value}
                      </p>
                    </CardContent>
                  </Card>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  Send Us a Message
                </h2>
                <p className="text-muted-foreground mb-8">
                  Fill out the form below and we'll get back to you within 24
                  hours.
                </p>

                {formSubmitted ? (
                  <Card className="bg-success/10 border-success/30">
                    <CardContent className="p-8 text-center">
                      <div className="inline-flex p-3 bg-success/20 rounded-full mb-4">
                        <CheckCircle className="h-8 w-8 text-success" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        Message Sent!
                      </h3>
                      <p className="text-muted-foreground">
                        Thank you for contacting us. Our team will get back to
                        you shortly.
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          required
                        />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="inquiry">Inquiry Type *</Label>
                        <Select
                          value={formData.inquiryType}
                          onValueChange={(value) =>
                            setFormData({ ...formData, inquiryType: value })
                          }
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select inquiry type" />
                          </SelectTrigger>
                          <SelectContent>
                            {inquiryTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Your Message *</Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us how we can help you..."
                        rows={5}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                    >
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </Button>
                  </form>
                )}
              </div>

              {/* Business Hours & Map */}
              <div className="space-y-8">
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      Business Hours
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Monday - Friday
                      </span>
                      <span className="font-medium text-foreground">
                        9:00 AM - 7:00 PM
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Saturday</span>
                      <span className="font-medium text-foreground">
                        9:00 AM - 5:00 PM
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sunday</span>
                      <span className="font-medium text-foreground">
                        Closed
                      </span>
                    </div>
                    <div className="pt-3 border-t border-border">
                      <p className="text-sm text-muted-foreground">
                        * Online booking available 24/7. Orders placed outside
                        business hours will be processed on the next working
                        day.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Map Placeholder */}
                <Card className="bg-card border-border overflow-hidden">
                  <div className="h-64 bg-secondary flex items-center justify-center">
                    <img
                      src="/india-map-with-office-locations-marked.jpg"
                      alt="Office Locations Map"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Office Locations */}
        <section className="py-16 md:py-20 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Our Office Locations
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Visit any of our branches across India for in-person assistance
                with your forex needs.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {offices.map((office) => (
                <Card
                  key={office.city}
                  className="bg-card border-border hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                        <Building2 className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="font-semibold text-foreground">
                        {office.city}
                      </h3>
                    </div>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">
                          {office.address}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        <a
                          href={`tel:${office.phone.replace(/\s/g, '')}`}
                          className="text-primary hover:underline"
                        >
                          {office.phone}
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ CTA */}
        <section
          className="py-16 md:py-20 text-primary-foreground"
          style={{ backgroundColor: '#2c4777' }}
        >
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Have More Questions?
              </h2>
              <p className="text-primary-foreground/80 mb-8">
                Check out our frequently asked questions or reach out to our
                support team for personalized assistance with your forex needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg">
                  View FAQs
                </Button>
                <Button
                  size="lg"
                  className="bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  Start Live Chat
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
