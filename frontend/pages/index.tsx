import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from '@/components/Header';

export default function Home() {
  const features = [
    {
      icon: '⚖️',
      title: 'Pakistani Legal Expertise',
      description: 'Guidance based on Pakistan Constitution, Criminal Code, and Civil Laws',
    },
    {
      icon: '🤖',
      title: 'AI-Powered Advice',
      description: 'Instant responses to your legal questions using advanced AI',
    },
    {
      icon: '📚',
      title: 'Legal Categories',
      description: 'Criminal, Family, Labor, Civil, Corporate, and Property Law',
    },
    {
      icon: '🔒',
      title: 'Confidential & Free',
      description: 'Anonymous legal assistance available 24/7',
    },
    {
      icon: '🌍',
      title: 'Urdu & English',
      description: 'Legal guidance in your preferred language',
    },
    {
      icon: '📞',
      title: 'Emergency Support',
      description: 'Quick access to legal aid hotlines and contacts',
    },
  ];

  const categories = [
    { name: 'Criminal Law', icon: '⚠️', desc: 'Crimes, prosecution, and defense' },
    { name: 'Family Law', icon: '👨‍👩‍👧', desc: 'Marriage, divorce, custody' },
    { name: 'Labor Law', icon: '💼', desc: 'Employment and worker rights' },
    { name: 'Civil Law', icon: '📋', desc: 'Contracts and disputes' },
    { name: 'Corporate Law', icon: '🏢', desc: 'Business and companies' },
    { name: 'Property Law', icon: '🏠', desc: 'Real estate and ownership' },
  ];

  return (
    <>
      <Head>
        <title>Pakistani Legal Aid Chatbot - Free Legal Guidance</title>
        <meta
          name="description"
          content="Get instant legal guidance based on Pakistani laws and Constitution. Free legal aid chatbot available 24/7."
        />
        <meta property="og:title" content="Pakistani Legal Aid Chatbot" />
        <meta
          property="og:description"
          content="Free legal assistance based on Pakistani laws and constitution"
        />
      </Head>

      <Header />

      <main className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center px-6 py-20">
          {/* Background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-600/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl"></div>
          </div>

          <div className="relative max-w-6xl mx-auto text-center">
            <div className="mb-8 inline-block">
              <span className="badge text-base px-4 py-2">🇵🇰 Pakistan Legal Aid 🇵🇰</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Free Legal Guidance
              <br />
              <span className="bg-gradient-to-r from-primary-400 to-primary-300 bg-clip-text text-transparent">
                For Every Pakistani
              </span>
            </h1>

            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Get instant legal advice based on Pakistani Constitution and laws. Our AI-powered chatbot provides
              accurate guidance for criminal, family, labor, and civil matters.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link href="/chat" className="btn-primary text-lg">
                Start Free Consultation
              </Link>
              <Link href="#features" className="btn-secondary text-lg">
                Learn More
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="card">
                <div className="text-3xl font-bold text-primary-400">24/7</div>
                <div className="text-sm text-slate-400">Available Anytime</div>
              </div>
              <div className="card">
                <div className="text-3xl font-bold text-primary-400">∞</div>
                <div className="text-sm text-slate-400">Unlimited Queries</div>
              </div>
              <div className="card">
                <div className="text-3xl font-bold text-primary-400">FREE</div>
                <div className="text-sm text-slate-400">Completely Free</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Why Choose Our Platform?</h2>
              <p className="text-xl text-slate-400">
                Comprehensive legal guidance specifically designed for Pakistani citizens
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="card-hover group"
                >
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Legal Categories Section */}
        <section className="py-20 px-6 bg-slate-800/50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Legal Categories Covered</h2>
              <p className="text-xl text-slate-400">
                Expert guidance across all major areas of Pakistani law
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category, index) => (
                <Link
                  key={index}
                  href="/chat"
                  className="card-hover"
                >
                  <div className="text-4xl mb-3">{category.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-slate-400 text-sm">{category.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="card bg-gradient-to-r from-primary-600/20 to-primary-500/20 border border-primary-500/30 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Have a Legal Question?
              </h2>
              <p className="text-lg text-slate-300 mb-8">
                Get instant guidance based on Pakistani laws and constitution. Our AI advisor is ready to help.
              </p>
              <Link href="/chat" className="btn-primary text-lg inline-block">
                Get Started Now
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-slate-700 py-12 px-6 bg-slate-900">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <h4 className="font-bold text-white mb-4">Legal Aid Chatbot</h4>
                <p className="text-slate-400 text-sm">
                  Free legal guidance for Pakistani citizens based on constitutional laws.
                </p>
              </div>
              <div>
                <h5 className="font-semibold text-white mb-4">Quick Links</h5>
                <ul className="space-y-2 text-slate-400 text-sm">
                  <li>
                    <Link href="/" className="hover:text-white transition-colors">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/chat" className="hover:text-white transition-colors">
                      Chat
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-white mb-4">Legal Services</h5>
                <ul className="space-y-2 text-slate-400 text-sm">
                  <li>Criminal Law</li>
                  <li>Family Law</li>
                  <li>Labor Law</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-white mb-4">Legal Aid</h5>
                <p className="text-slate-400 text-sm mb-2">Pakistan Legal Aid Organization</p>
                <p className="text-slate-400 text-sm">Contact your local bar council for assistance</p>
              </div>
            </div>

            <div className="border-t border-slate-700 pt-8 flex flex-col md:flex-row justify-between items-center text-slate-400 text-sm">
              <p>&copy; 2024 Pakistani Legal Aid Chatbot. All rights reserved.</p>
              <div className="flex gap-6 mt-4 md:mt-0">
                <Link href="#" className="hover:text-white transition-colors">
                  Disclaimer
                </Link>
                <Link href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
