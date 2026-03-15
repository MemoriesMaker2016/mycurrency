'use client';

import { useState } from 'react';
import { ChevronDown, Lock } from 'lucide-react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Image from 'next/image';

export default function PaymentPage() {
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);

  const paymentMethods = [
    {
      id: 'credit-card',
      name: 'Credit Card',
      icon: '💳',
      logos: ['visa', 'mastercard', 'rupay'],
    },
    {
      id: 'upi',
      name: 'UPI',
      icon: '📱',
      logos: ['upi'],
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: '₽',
      logos: ['paypal'],
    },
  ];

  const handlePaymentSelect = (id: string) => {
    setSelectedPayment(selectedPayment === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Methods */}
          <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-2xl font-bold mb-6">Choose a payment method</h2>

            <div className="space-y-4">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className={`border-2 rounded-lg transition ${
                    selectedPayment === method.id
                      ? 'border-gray-300 bg-white'
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <button
                    onClick={() => handlePaymentSelect(method.id)}
                    className="w-full flex justify-between items-center px-6 py-4 cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <p className="font-semibold">{method.name}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      {method.logos.map((logo) => (
                        <div
                          key={logo}
                          className="flex items-center justify-center h-6"
                        >
                          <Image
                            src={`/payment/${logo}.png`}
                            alt={logo}
                            width={48}
                            height={24}
                            className="h-5 w-auto object-contain"
                          />
                        </div>
                      ))}
                      <ChevronDown
                        className={`transition-transform ${
                          selectedPayment === method.id ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                  </button>

                  {/* Payment Form */}
                  {selectedPayment === method.id && (
                    <div className="px-6 pb-6 border-t border-gray-200 space-y-4">
                      {method.id === 'credit-card' && (
                        <>
                          <input
                            type="text"
                            placeholder="Name on card"
                            className="w-full px-4 py-2 border rounded-lg"
                          />
                          <input
                            type="text"
                            placeholder="Card number"
                            className="w-full px-4 py-2 border rounded-lg"
                          />
                          <div className="grid grid-cols-2 gap-4">
                            <input
                              type="text"
                              placeholder="MM / YY"
                              className="px-4 py-2 border rounded-lg"
                            />
                            <input
                              type="text"
                              placeholder="CVC"
                              className="px-4 py-2 border rounded-lg"
                            />
                          </div>

                          <button className="mt-6 px-6 py-2 bg-blue-600 text-white py-3 rounded-lg">
                            Submit Payment
                          </button>
                        </>
                      )}

                      {method.id === 'upi' && (
                        <>
                          <input
                            type="tel"
                            placeholder="+91 Phone number"
                            className="w-full px-4 py-2 border rounded-lg"
                          />
                          <input
                            type="text"
                            placeholder="UPI ID"
                            className="w-full px-4 py-2 border rounded-lg"
                          />
                          <button className="mt-6 px-6 py-2 bg-blue-600 text-white py-3 rounded-lg">
                            Submit Payment
                          </button>
                        </>
                      )}

                      {method.id === 'paypal' && (
                        <button className="w-full bg-yellow-400 py-3 rounded-full font-bold">
                          Pay with PayPal
                        </button>
                      )}

                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Lock size={16} className="text-green-600" />
                        Secure & encrypted payment
                      </div>
                      <p className="text-sm text-gray-600">
                        By checking out you agree with our Terms of Service and
                        confirm that you have read our Privacy Policy. You can
                        cancel recurring payments at any time.
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white border rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span>USD</span>
                <span>₹2799</span>
              </div>
              <div className="flex justify-between">
                <span>GST (18%)</span>
                <span>₹503.82</span>
              </div>
              <hr />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>₹3302.82</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
