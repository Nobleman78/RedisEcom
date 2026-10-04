import React from "react";
import { spaceMono } from "@/fonts/Fonts";

export default function ContactPage() {
  return (
    <div className={`pt-30 min-h-screen bg-white ${spaceMono.className}`}>
      {/* Hero Section */}
      <section className="bg-white py-16 sm:py-24 text-black border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl md:text-5xl">
            Get in Touch
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-500">
            We'd love to hear from you. Whether you have a question about our collections, sizing, or anything else, our team is ready to answer all your questions.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

            {/* Contact Info & FAQs */}
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 mb-8">
                Contact Information
              </h2>
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Visit Us</h3>
                    <p className="mt-1 text-gray-500">
                      123 Fashion Avenue<br />
                      New York, NY 10001<br />
                      United States
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Call Us</h3>
                    <p className="mt-1 text-gray-500">
                      +1 (555) 123-4567<br />
                      Mon-Fri 9am to 6pm EST
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Email Us</h3>
                    <p className="mt-1 text-gray-500">
                      support@redisecom.com<br />
                      press@redisecom.com
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <h2 className="text-2xl font-extrabold text-gray-900 mb-6">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-base font-semibold text-gray-900">Do you ship internationally?</h4>
                    <p className="mt-2 text-sm text-gray-500">Yes, we ship to over 100 countries worldwide. Shipping costs will apply, and will be added at checkout.</p>
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-gray-900">How long will it take to get my order?</h4>
                    <p className="mt-2 text-sm text-gray-500">It depends on where you are. Orders processed here will take 5-7 business days to arrive. Overseas deliveries can take anywhere from 7-16 days.</p>
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-gray-900">Can I return my product?</h4>
                    <p className="mt-2 text-sm text-gray-500">We always aim for make sure our customers love our products, but if you do need to return an order, we’re happy to help. Just email us directly and we’ll take you through the process.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-10 border border-gray-100 h-fit">
              <h2 className="text-2xl font-extrabold text-gray-900 mb-6">
                Send us a message
              </h2>
              <form action="#" method="POST" className="space-y-6">
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                      First name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="first-name"
                        id="first-name"
                        autoComplete="given-name"
                        className="block w-full rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-black focus:ring-black border sm:text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                      Last name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="last-name"
                        id="last-name"
                        autoComplete="family-name"
                        className="block w-full rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-black focus:ring-black border sm:text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="block w-full rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-black focus:ring-black border sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                    Subject
                  </label>
                  <div className="mt-1">
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      className="block w-full rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-black focus:ring-black border sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      className="block w-full rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-black focus:ring-black border sm:text-sm"
                      defaultValue={''}
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="inline-flex w-full justify-center items-center rounded-md border border-transparent bg-black px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-colors"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
