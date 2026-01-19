'use client';

import type React from 'react';
import { MapPin, Building } from 'lucide-react';
import { indianStates, stateList } from '@/lib/india-cities';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  TrendingUp,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  ArrowRight,
  CheckCircle2,
  Globe,
} from 'lucide-react';
import Image from 'next/image';

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    country: '',
    state: '',
    city: '',
    address: '',
    agreeTerms: false,
    agreeMarketing: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await fetch(
        // 'https://serverofmycurrancywebsite-2.onrender.com/api/auth/register',
        'http://localhost:5000/api/auth/register',

        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            password: formData.password,
            country: formData.country,
            state: formData.state,
            city: formData.city,
            address: formData.address,
            agreeTerms: formData.agreeTerms,
            agreeMarketing: formData.agreeMarketing,
          }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        alert('Account created successfully!');
        console.log('User registered:', data);
        // Optionally, redirect to login page
        // router.push('/login');
      } else {
        alert(data.message || 'Registration failed');
        console.error('Error:', data);
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('Something went wrong. Please try again later.');
    }
  };

  const passwordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const strength = passwordStrength(formData.password);
  const strengthText = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
  const strengthColor = [
    'bg-destructive',
    'bg-orange-500',
    'bg-yellow-500',
    'bg-green-400',
    'bg-green-600',
  ];

  // Get available cities for selected state
  const availableCities = formData.state
    ? indianStates[formData.state] || []
    : [];

  return (
    <div className="min-h-screen flex">
      {/* Left Section - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background overflow-y-auto">
        <div className="w-full max-w-lg py-8">
          {/* Mobile Logo */}
          <Link
            href="/"
            className="lg:hidden flex items-center gap-2 mb-8 justify-center"
          >
            <Image
              src="/mycurrency-logo_1.png"
              alt="MyCurrency Logo"
              width={270}
              height={100}
              className="object-contain"
              priority
            />
          </Link>

          <Card className="border-0 shadow-2xl shadow-lg">
            <CardHeader className="space-y-1 pb-4">
              <CardTitle className="text-2xl font-bold text-center">
                Create Account
              </CardTitle>
              <CardDescription className="text-center">
                Join thousands of users enjoying seamless forex services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm font-medium">
                      First Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="firstName"
                        placeholder="John"
                        value={formData.firstName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            firstName: e.target.value,
                          })
                        }
                        className="pl-10 h-11 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sm font-medium">
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData({ ...formData, lastName: e.target.value })
                      }
                      className="h-11 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                      required
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="pl-10 h-11 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                      required
                    />
                  </div>
                </div>

                {/* Phone Field */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium">
                    Phone Number
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+00 00000 00000"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="pl-10 h-11 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                      required
                    />
                  </div>
                </div>

                {/* Country Field */}
                <div className="space-y-2">
                  <Label htmlFor="country" className="text-sm font-medium">
                    Country
                  </Label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
                    <Select
                      value={formData.country}
                      onValueChange={(value) =>
                        setFormData({ ...formData, country: value })
                      }
                    >
                      <SelectTrigger className="pl-10 h-11">
                        <SelectValue placeholder="Select your country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="in">India</SelectItem>
                        <SelectItem value="us">United States</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                        <SelectItem value="ae">UAE</SelectItem>
                        <SelectItem value="sg">Singapore</SelectItem>
                        <SelectItem value="au">Australia</SelectItem>
                        <SelectItem value="ca">Canada</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* State Field */}
                {formData.country === 'in' && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="state" className="text-sm font-medium">
                        State
                      </Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
                        <Select
                          value={formData.state}
                          onValueChange={(value) =>
                            setFormData({ ...formData, state: value, city: '' })
                          }
                        >
                          <SelectTrigger className="pl-10 h-11">
                            <SelectValue placeholder="Select your state" />
                          </SelectTrigger>
                          <SelectContent className="max-h-64">
                            {stateList.map((state) => (
                              <SelectItem key={state.value} value={state.value}>
                                {state.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* City Field */}
                    <div className="space-y-2">
                      <Label htmlFor="city" className="text-sm font-medium">
                        City
                      </Label>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
                        <Select
                          value={formData.city}
                          onValueChange={(value) =>
                            setFormData({ ...formData, city: value })
                          }
                          disabled={!formData.state}
                        >
                          <SelectTrigger className="pl-10 h-11 disabled:opacity-50 disabled:cursor-not-allowed">
                            <SelectValue placeholder="Select your city" />
                          </SelectTrigger>
                          <SelectContent>
                            {availableCities.map((city) => (
                              <SelectItem key={city} value={city}>
                                {city}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Address Field */}
                    <div className="space-y-2">
                      <Label htmlFor="address" className="text-sm font-medium">
                        Address
                      </Label>
                      <div className="relative">
                        <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <textarea
                          id="address"
                          placeholder="Enter your complete address"
                          value={formData.address}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              address: e.target.value,
                            })
                          }
                          className="pl-10 pt-3 p-3 min-h-24 w-full rounded-lg border border-input bg-background text-foreground transition-all duration-200 focus:ring-2 focus:ring-primary/20 focus:border-transparent resize-none"
                          required
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      className="pl-10 pr-10 h-11 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {/* Password Strength Indicator */}
                  {formData.password && (
                    <div className="space-y-2">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                              i < strength
                                ? strengthColor[strength - 1]
                                : 'bg-muted'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Password strength:{' '}
                        <span className="font-medium">
                          {strengthText[strength - 1] || 'Too short'}
                        </span>
                      </p>
                    </div>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div className="space-y-2">
                  <Label
                    htmlFor="confirmPassword"
                    className="text-sm font-medium"
                  >
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          confirmPassword: e.target.value,
                        })
                      }
                      className="pl-10 pr-10 h-11 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                      required
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {formData.confirmPassword &&
                    formData.password !== formData.confirmPassword && (
                      <p className="text-xs text-destructive">
                        Passwords do not match
                      </p>
                    )}
                </div>

                {/* Terms Checkbox */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="terms"
                      checked={formData.agreeTerms}
                      onCheckedChange={(checked) =>
                        setFormData({
                          ...formData,
                          agreeTerms: checked as boolean,
                        })
                      }
                      className="mt-0.5"
                    />
                    <Label
                      htmlFor="terms"
                      className="text-sm text-muted-foreground cursor-pointer leading-relaxed"
                    >
                      I agree to the{' '}
                      <Link
                        href="/terms"
                        className="text-primary hover:underline"
                      >
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link
                        href="/privacy"
                        className="text-primary hover:underline"
                      >
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="marketing"
                      checked={formData.agreeMarketing}
                      onCheckedChange={(checked) =>
                        setFormData({
                          ...formData,
                          agreeMarketing: checked as boolean,
                        })
                      }
                      className="mt-0.5"
                    />
                    <Label
                      htmlFor="marketing"
                      className="text-sm text-muted-foreground cursor-pointer leading-relaxed"
                    >
                      Send me exclusive offers, rate alerts, and forex tips
                    </Label>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full h-12 text-base font-semibold group transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 mt-4"
                  disabled={
                    !formData.agreeTerms ||
                    formData.password !== formData.confirmPassword
                  }
                >
                  Create Account
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>

                {/* Divider */}
                {/* <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">
                      Or sign up with
                    </span>
                  </div>
                </div> */}

                {/* Social Signup */}
                {/* <div className="grid grid-cols-2 gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="h-11 hover:bg-secondary transition-colors bg-transparent"
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Google
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="h-11 hover:bg-secondary transition-colors bg-transparent"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
                    </svg>
                    Apple
                  </Button>
                </div> */}

                {/* Sign In Link */}
                <p className="text-center text-sm text-muted-foreground pt-4">
                  Already have an account?{' '}
                  <Link
                    href="/login"
                    className="text-primary font-semibold hover:text-primary/80 transition-colors"
                  >
                    Sign in
                  </Link>
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Right Section - Branding & Features */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-72 h-72 border border-primary-foreground/30 rounded-full" />
          <div className="absolute top-40 right-40 w-96 h-96 border border-primary-foreground/20 rounded-full" />
          <div className="absolute bottom-20 left-20 w-64 h-64 border border-primary-foreground/25 rounded-full" />
        </div>

        <div className="relative z-10 flex flex-col justify-center px-16 text-primary-foreground">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/mycurrency-logo-white.png"
              alt="MyCurrency Logo"
              width={270}
              height={100}
              className="object-contain"
              priority
            />
          </Link>

          <h1 className="text-4xl font-bold mb-6 leading-tight">
            Start Your Forex
            <br />
            Journey Today
          </h1>
          <p className="text-lg text-primary-foreground/80 mb-12 max-w-md">
            Join over 500,000+ customers who trust us for their currency
            exchange needs.
          </p>

          {/* Benefits */}
          <div className="space-y-5">
            {[
              'Best exchange rates guaranteed',
              'Zero hidden charges or fees',
              'Doorstep delivery across India',
              '24/7 customer support',
              'Secure & RBI authorized',
            ].map((benefit, index) => (
              <div key={index} className="flex items-center gap-3 group">
                <div className="w-8 h-8 bg-primary-foreground/10 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-primary-foreground/20 transition-colors">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <span className="text-lg">{benefit}</span>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="flex gap-8 mt-12 pt-8 border-t border-primary-foreground/20">
            <div>
              <div className="text-3xl font-bold">10K+</div>
              <div className="text-sm text-primary-foreground/70">
                Happy Customers
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold">50+</div>
              <div className="text-sm text-primary-foreground/70">
                Currencies
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold">4.9</div>
              <div className="text-sm text-primary-foreground/70">
                User Rating
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
