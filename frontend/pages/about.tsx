import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from '@/components/Header';

export default function About() {
  return (
    <>
      <Head>
        <title>About - Pakistani Legal Aid Chatbot</title>
        <meta name="description" content="Learn about our Pakistani Legal Aid Chatbot" />
      </Head>

      <Header />

      <main className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 min-h-screen">
        <div className="max-w-4xl mx-auto px-6 py-20">
          {/* Hero */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-white mb-4">About Legal Aid Chatbot</h1>
            <p className="text-xl text-slate-300">
              Empowering Pakistani citizens with free, accessible legal guidance
            </p>
          </div>

          {/* Content */}
          <div className="space-y-12">
            {/* Mission */}
            <div className="card">
              <h2 className="text-3xl font-bold text-white mb-4 flex items-center gap-2">
                <span>🎯</span> Our Mission
              </h2>
              <p className="text-slate-300 text-lg leading-relaxed">
                To provide free, accurate, and accessible legal guidance to all Pakistani citizens.
                We believe that everyone deserves access to legal information regardless of their
                socioeconomic status. Our mission is to bridge the gap between common people and
                complex legal systems through AI-powered assistance.
              </p>
            </div>

            {/* How It Works */}
            <div className="card">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-2">
                <span>⚙️</span> How It Works
              </h2>
              <div className="space-y-4">
                {[
                  {
                    step: 1,
                    title: 'Ask Your Question',
                    desc: 'Type any legal question related to Pakistani laws',
                  },
                  {
                    step: 2,
                    title: 'Select Category',
                    desc: 'Choose the relevant legal category for better guidance',
                  },
                  {
                    step: 3,
                    title: 'Get Instant Response',
                    desc: 'Receive AI-powered legal guidance based on Pakistani laws',
                  },
                  {
                    step: 4,
                    title: 'Consult Professional',
                    desc: 'For complex cases, consult with a qualified lawyer',
                  },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center font-bold text-white">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                      <p className="text-slate-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Legal Knowledge Base */}
            <div className="card">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-2">
                <span>📚</span> Legal Knowledge Base
              </h2>
              <p className="text-slate-300 mb-4">
                Our chatbot is trained on comprehensive information about Pakistani legal system:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  'Constitution of Pakistan 1973',
                  'Pakistan Penal Code',
                  'Civil Procedure Code 1908',
                  'Criminal Procedure Code 1898',
                  'Family Law Ordinance 1961',
                  'Labor Laws & Ordinances',
                  'Companies Act 2017',
                  'Transfer of Property Act 1882',
                ].map((law) => (
                  <div key={law} className="flex items-center gap-2">
                    <span className="text-primary-400">✓</span>
                    <span className="text-slate-300">{law}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Important Disclaimer */}
            <div className="card bg-yellow-900/20 border border-yellow-700/30">
              <h2 className="text-3xl font-bold text-yellow-300 mb-4 flex items-center gap-2">
                <span>⚠️</span> Important Disclaimer
              </h2>
              <p className="text-slate-300 leading-relaxed">
                This chatbot provides general legal information and guidance based on Pakistani laws.
                It is NOT a substitute for professional legal advice from a qualified lawyer.
                For critical legal matters, complex cases, or situations with significant consequences,
                always consult with a licensed attorney. The information provided is for educational
                purposes only and should not be considered as legal counsel.
              </p>
            </div>

            {/* Contact Information */}
            <div className="card">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-2">
                <span>📞</span> Legal Aid Resources
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-white mb-2">Pakistan Legal Aid Organization</h3>
                  <p className="text-slate-400">Provides free legal aid to poor and needy citizens</p>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">Bar Councils</h3>
                  <p className="text-slate-400">
                    Contact your provincial bar council for lawyer referral and assistance
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">Emergency Services</h3>
                  <p className="text-slate-400">
                    Police: 15 | FIA: 111-824-111 (Cyber Crime Hotline)
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center">
              <Link href="/chat" className="btn-primary text-lg inline-block">
                Start Your Free Legal Consultation
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
