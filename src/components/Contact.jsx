import { useState } from 'react';
import SectionFrame from './SectionFrame';
import { FaWhatsapp, FaLinkedinIn, FaGithub, FaEnvelope } from 'react-icons/fa';
import { LuSend, LuArrowUpRight } from 'react-icons/lu';

export default function Contact({ onShowToast }) {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const socialChannels = [
    {
      code: 'WHATSAPP_FEED',
      label: 'WhatsApp Direct',
      value: '+94 72 024 3581',
      url: 'https://wa.me/94720243581?text=Hello%20Naseef%2C%20I%20visited%20your%20portfolio.',
      icon: FaWhatsapp,
      action: 'Chat Now ↗',
    },
    {
      code: 'LINKEDIN_PROF',
      label: 'LinkedIn Network',
      value: 'MFA Naseef Sharaf',
      url: 'https://www.linkedin.com/in/naseef-sharaf-mfa-291293346/',
      icon: FaLinkedinIn,
      action: 'Connect ↗',
    },
    {
      code: 'GITHUB_VCS',
      label: 'GitHub Codebase',
      value: 'Nashaf-engr',
      url: 'https://github.com/Nashaf-engr',
      icon: FaGithub,
      action: 'Follow ↗',
    },
    {
      code: 'DIRECT_EMAIL',
      label: 'Email Inquiries',
      value: 'nashafeng32@gmail.com',
      url: 'mailto:nashafeng32@gmail.com',
      icon: FaEnvelope,
      action: 'Compose ↗',
    },
  ];

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      if (onShowToast) {
        onShowToast('error', 'Incomplete Submission', 'Please fill out your name, email, and message.');
      }
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('https://formsubmit.co/ajax/nashafeng32@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject || 'Portfolio Inquiry from ArtCraft Theme',
          message: formData.message,
          _subject: 'New inquiry from portfolio',
          _template: 'table',
        }),
      });

      if (!response.ok) {
        throw new Error('Network error');
      }

      setFormData({ name: '', email: '', subject: '', message: '' });
      if (onShowToast) {
        onShowToast('success', 'Message Transmitted', 'Your inquiry was delivered directly to Naseef.');
      }
    } catch {
      if (onShowToast) {
        onShowToast('error', 'Transmission Failed', 'Could not deliver automatically. Please use the direct WhatsApp link.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SectionFrame
      id="contact"
      index="09"
      title="Transmission Channels"
      meta="Direct Inquiries • 24h Response"
      headline="Start a"
      italicWord="conversation"
      headlineAfter="or project brief."
      subheading="Whether discussing an engineering role, technical collaboration, or tailored digital product — my transmission channels are open."
    >
      <div className="grid gap-px border-t border-line bg-line lg:grid-cols-12">
        
        {/* Left Column (5 cols): Direct Social & Comms Channels */}
        <div className="lg:col-span-5 bg-bg p-6 md:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-line pb-3">
            <span className="hud-label text-faint">COMMUNICATION MATRIX</span>
            <span className="hud-label text-accent">AVAILABLE</span>
          </div>

          <div className="space-y-3">
            {socialChannels.map((chan, idx) => {
              const Icon = chan.icon;
              return (
                <a
                  key={idx}
                  href={chan.url}
                  target="_blank"
                  rel="noreferrer"
                  className="block p-4 border border-line bg-bg-raised hover:bg-invert-bg hover:text-invert-fg group transition-all"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="hud-label text-faint group-hover:text-invert-fg/70">
                      {chan.code}
                    </span>
                    <span className="text-[10px] font-mono text-accent group-hover:text-invert-fg">
                      {chan.action}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-2">
                    <Icon className="text-base text-ink group-hover:text-invert-fg" />
                    <div>
                      <h4 className="font-display font-medium text-sm text-ink-strong group-hover:text-invert-fg">
                        {chan.label}
                      </h4>
                      <p className="text-xs font-mono text-muted group-hover:text-invert-fg/80">
                        {chan.value}
                      </p>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>

          <div className="border border-line bg-bg-raised p-4 space-y-2">
            <p className="hud-label text-faint text-[10px]">CURRENT TIMEZONE</p>
            <p className="text-xs font-mono text-ink">
              Asia/Colombo (GMT+5:30) • Sri Lanka
            </p>
            <p className="text-[11px] text-muted">
              Average response time: &lt; 24 hours.
            </p>
          </div>
        </div>

        {/* Right Column (7 cols): Direct Transmission Form */}
        <div className="lg:col-span-7 bg-bg p-6 md:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-line pb-3">
            <span className="hud-label text-faint">TRANSMISSION DISPATCH // FORM</span>
            <span className="hud-label text-muted">DIRECT DISPATCH</span>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="hud-label text-faint block">
                  SENDER NAME *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Elena Rostova"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-bg-raised border border-line p-3 font-mono text-xs text-ink focus:border-ink-strong focus:outline-none transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="hud-label text-faint block">
                  REPLY EMAIL *
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. elena@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-bg-raised border border-line p-3 font-mono text-xs text-ink focus:border-ink-strong focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="hud-label text-faint block">
                INQUIRY SUBJECT
              </label>
              <input
                type="text"
                placeholder="e.g. Frontend Architecture or Role Invitation"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full bg-bg-raised border border-line p-3 font-mono text-xs text-ink focus:border-ink-strong focus:outline-none transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="hud-label text-faint block">
                PROJECT DISPATCH / MESSAGE *
              </label>
              <textarea
                required
                rows={5}
                placeholder="Detail your requirements, project scope, or opportunity..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-bg-raised border border-line p-3 font-mono text-xs text-ink focus:border-ink-strong focus:outline-none transition-colors resize-none"
              />
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-[10px] font-mono text-faint">
                DISPATCHES FORWARDED TO PERSONAL INBOX
              </span>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-artcraft py-3 px-6 cursor-pointer"
              >
                <LuSend className="w-3.5 h-3.5" />
                <span>{isSubmitting ? 'Transmitting...' : 'Dispatch Message'}</span>
              </button>
            </div>
          </form>
        </div>

      </div>
    </SectionFrame>
  );
}
