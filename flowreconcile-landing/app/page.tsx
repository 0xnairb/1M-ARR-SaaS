'use client'

import { useState } from 'react'
import { Check, X, ArrowRight, ShoppingBag, CreditCard, FileText, Clock, DollarSign, BarChart3, Shield, Zap, Users } from 'lucide-react'

export default function Home() {
  const [email, setEmail] = useState('')
  const [revenue, setRevenue] = useState('')
  const [pain, setPain] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, revenue, pain })
      })

      if (!response.ok) throw new Error('Subscription failed')

      setIsSuccess(true)
      setEmail('')
      setRevenue('')
      setPain('')
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold mb-2">You're on the list!</h2>
          <p className="text-gray-600 mb-6">
            Check your email for your early access invitation and 50% lifetime discount code.
          </p>
          <div className="space-y-3 text-left">
            <a href="mailto:hello@flowreconcile.com" className="block p-3 bg-gray-50 rounded hover:bg-gray-100 transition">
              📧 Questions? Email us
            </a>
            <a href="https://twitter.com/flowreconcile" className="block p-3 bg-gray-50 rounded hover:bg-gray-100 transition">
              🐦 Follow us on Twitter
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-primary-600">FlowReconcile</div>
          <button
            onClick={() => document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition"
          >
            Get Early Access
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-primary-100 text-primary-700 px-4 py-1 rounded-full text-sm font-semibold mb-4">
                🎉 Early Adopter Offer: 50% Off for Life
              </div>
              <h1 className="text-5xl font-bold mb-6 leading-tight">
                Stop Wasting 25 Hours a Week on E-commerce Reconciliation
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                FlowReconcile automatically syncs your Shopify sales, Stripe payouts, and QuickBooks.
                Perfect accuracy. Zero manual work. Real-time visibility.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-primary-600 text-white px-8 py-4 rounded-lg hover:bg-primary-700 transition text-lg font-semibold flex items-center justify-center"
                >
                  Get Early Access - 50% Off
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                ✓ 14-day free trial • ✓ No credit card required • ✓ Setup in 5 minutes
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-2xl">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Check className="w-6 h-6 text-green-600" />
                    <span className="font-semibold">Shopify Connected</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Check className="w-6 h-6 text-green-600" />
                    <span className="font-semibold">Stripe Connected</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Check className="w-6 h-6 text-green-600" />
                    <span className="font-semibold">QuickBooks Connected</span>
                  </div>
                </div>
                <div className="bg-primary-50 p-6 rounded-lg">
                  <div className="text-sm text-gray-600 mb-2">Last 30 Days</div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Total Sales:</span>
                      <span className="font-bold">$45,678.90</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Fees:</span>
                      <span className="font-bold text-red-600">-$1,234.56</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold border-t pt-2">
                      <span>Net Deposited:</span>
                      <span className="text-green-600">$44,444.34</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-4">Tired of This?</h2>
          <p className="text-xl text-gray-600 text-center mb-12">Sound familiar?</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              'Spending 10-25 hours every week matching sales to deposits',
              'Mysterious discrepancies between Shopify sales and bank deposits',
              'Trying to track fees from Shopify, Stripe, PayPal across different reports',
              'Manually entering hundreds of transactions into QuickBooks',
              'Never really knowing your true profitability until weeks later',
              'Paying $3,000-5,000/month for a bookkeeper to do this'
            ].map((pain, i) => (
              <div key={i} className="flex gap-4 p-6 bg-white rounded-lg shadow-sm">
                <X className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                <p className="text-gray-700">{pain}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 p-8 bg-red-50 rounded-xl border-2 border-red-200">
            <p className="text-xl font-semibold text-center">
              E-commerce businesses waste an average of <span className="text-red-600">25 hours per week</span> on financial reconciliation.
            </p>
            <p className="text-center text-gray-700 mt-2">
              That's 1,300 hours per year - or <span className="font-bold">$65,000 in labor costs</span>.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-4">Reconciliation That Runs Itself</h2>
          <p className="text-xl text-gray-600 text-center mb-16">Connect your accounts once. FlowReconcile handles the rest.</p>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="w-10 h-10 text-primary-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4">1. Connect</h3>
              <p className="text-gray-600">
                Link your Shopify store, payment processor (Stripe, Shopify Payments), and accounting
                software (QuickBooks or Xero) in under 5 minutes. One-click OAuth. No manual data entry.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="w-10 h-10 text-primary-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4">2. Sync</h3>
              <p className="text-gray-600">
                FlowReconcile pulls orders, payouts, fees, and refunds from all your platforms.
                Matches every sale to every deposit with 100% accuracy. Runs automatically every 24 hours.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-primary-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4">3. Reconcile</h3>
              <p className="text-gray-600">
                Journal entries created automatically in your accounting software. See real-time
                profitability dashboards. Your books are always tax-ready.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16">Why E-commerce Brands Love FlowReconcile</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Clock,
                title: 'Save 25 Hours Per Week',
                description: 'Stop manually matching transactions. FlowReconcile does it automatically, freeing you to focus on growing your business.'
              },
              {
                icon: Check,
                title: '100% Accuracy Guaranteed',
                description: 'Eliminate human errors. Every sale, fee, and refund matched with perfect precision. Your accountant will thank you.'
              },
              {
                icon: BarChart3,
                title: 'Real-Time Profitability',
                description: 'Know your true profit margins instantly. See profitability by product, channel, and day. Make data-driven decisions faster.'
              },
              {
                icon: DollarSign,
                title: 'Save $50K+ Per Year',
                description: 'Stop paying $3K-5K/month for bookkeepers to do this manually. FlowReconcile costs $99-399/month and does it better.'
              },
              {
                icon: Users,
                title: 'Scales With You',
                description: '1,000 orders/month or 100,000 - FlowReconcile handles it all. No additional headcount needed as you grow.'
              },
              {
                icon: Shield,
                title: 'Bank-Level Security',
                description: 'Your data is encrypted, secure, and compliant. SOC 2 Type II certified. OAuth-only connections. We never store your passwords.'
              }
            ].map((benefit, i) => (
              <div key={i} className="bg-white p-8 rounded-xl shadow-sm">
                <benefit.icon className="w-12 h-12 text-primary-600 mb-4" />
                <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-gray-600 text-center mb-12">Start with a 14-day free trial. No credit card required.</p>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: 'Starter',
                price: 99,
                features: [
                  '1 store',
                  '1 payment gateway',
                  '1,000 orders/month',
                  'Daily sync',
                  'Email support',
                  'Basic dashboard'
                ]
              },
              {
                name: 'Growth',
                price: 199,
                features: [
                  'Up to 3 stores',
                  'All payment gateways',
                  '5,000 orders/month',
                  'Hourly sync',
                  'Priority support',
                  'Advanced reports',
                  'Custom mapping'
                ],
                popular: true
              },
              {
                name: 'Scale',
                price: 399,
                features: [
                  'Unlimited stores',
                  'Unlimited orders',
                  'Real-time sync',
                  'Dedicated support',
                  'White-glove onboarding',
                  'API access',
                  'Custom features'
                ]
              }
            ].map((plan, i) => (
              <div key={i} className={`relative bg-white rounded-xl shadow-lg p-8 ${plan.popular ? 'ring-2 ring-primary-600' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-5xl font-bold">${plan.price}</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })}
                  className={`w-full py-3 rounded-lg font-semibold transition ${
                    plan.popular
                      ? 'bg-primary-600 text-white hover:bg-primary-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  Start Free Trial
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Form */}
      <section id="cta" className="py-20 bg-primary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Ready to Reclaim Your Time?</h2>
            <p className="text-xl text-primary-100">
              Join 500+ e-commerce brands automating their financial reconciliation
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-xl p-8 shadow-2xl">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Email Address *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@yourbrand.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Annual Revenue *</label>
                <select
                  required
                  value={revenue}
                  onChange={(e) => setRevenue(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                >
                  <option value="">Select...</option>
                  <option value="<500k">Less than $500K/year</option>
                  <option value="500k-2m">$500K - $2M/year</option>
                  <option value="2m-5m">$2M - $5M/year</option>
                  <option value=">5m">More than $5M/year</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Biggest Pain Point *</label>
                <select
                  required
                  value={pain}
                  onChange={(e) => setPain(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                >
                  <option value="">Select...</option>
                  <option value="time">Time spent on reconciliation</option>
                  <option value="accuracy">Accuracy/errors in books</option>
                  <option value="visibility">Real-time visibility into profit</option>
                  <option value="cost">Cost of bookkeeper</option>
                </select>
              </div>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary-600 text-white py-4 rounded-lg hover:bg-primary-700 transition font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Joining...' : 'Get Early Access - 50% Off for Life'}
              </button>

              <p className="text-center text-sm text-gray-600">
                ✓ 14-day free trial • ✓ Cancel anytime • ✓ 60-day money-back guarantee
              </p>
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">FlowReconcile</h3>
              <p className="text-gray-400">
                Automated e-commerce financial reconciliation that just works.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">How It Works</a></li>
                <li><a href="#" className="hover:text-white transition">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition">Integrations</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">About</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
                <li><a href="#" className="hover:text-white transition">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>© 2025 FlowReconcile. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
