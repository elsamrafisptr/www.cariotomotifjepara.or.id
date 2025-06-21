'use client'

import { Facebook, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react'

const Footer = () => {
  const footerSections = [
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '#' },
        { label: 'Contact Us', href: '#' },
        { label: 'Careers', href: '#' },
        { label: 'Press', href: '#' },
        { label: 'Investor Relations', href: '#' }
      ]
    },
    {
      title: 'Customer Service',
      links: [
        { label: 'Help Center', href: '#' },
        { label: 'FAQ', href: '#' },
        { label: 'Returns & Exchanges', href: '#' },
        { label: 'Shipping Info', href: '#' },
        { label: 'Size Guide', href: '#' },
        { label: 'Track Your Order', href: '#' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', href: '#' },
        { label: 'Terms of Service', href: '#' },
        { label: 'Cookie Policy', href: '#' },
        { label: 'Imprint', href: '#' },
        { label: 'Data Protection', href: '#' }
      ]
    }
  ]

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Youtube, href: '#', label: 'YouTube' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' }
  ]

  return (
    <footer className="border-t border-gray-200 bg-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo Section */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-gray-900">
                <span className="text-xl font-bold text-white">LOGO</span>
              </div>
            </div>
            <p className="max-w-48 text-sm leading-relaxed text-gray-600">
              Your trusted partner for quality products and exceptional service since
              2014.
            </p>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section, index) => (
            <div key={index} className="lg:col-span-1">
              <h3 className="mb-4 text-sm font-semibold tracking-wide text-gray-900 uppercase">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="group flex items-center justify-between text-sm text-gray-600 transition-colors duration-200 hover:text-gray-900"
                    >
                      <span>{link.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            {/* Copyright */}
            <div className="text-sm text-gray-400">
              <p>© 2024 Your Company. All rights reserved.</p>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <span className="hidden text-sm text-gray-400 md:block">Follow us:</span>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-800 transition-colors duration-200 hover:bg-gray-700"
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 border-t border-gray-800 pt-4">
            <div className="flex flex-wrap gap-6 text-xs text-gray-400">
              <a href="#" className="transition-colors hover:text-white">
                Accessibility
              </a>
              <a href="#" className="transition-colors hover:text-white">
                Sitemap
              </a>
              <a href="#" className="transition-colors hover:text-white">
                Cookie Settings
              </a>
              <a href="#" className="transition-colors hover:text-white">
                Do Not Sell My Info
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
