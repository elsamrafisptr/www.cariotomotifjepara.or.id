'use client'

import Image from 'next/image'

import { footerSections, socialLinks } from '@/common/contents'

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12 md:px-28">
        <div className="flex w-full flex-col items-center justify-center gap-8 sm:items-start md:grid md:grid-cols-2 lg:grid-cols-4">
          {/* Logo Section */}
          <div className="flex flex-col items-center justify-center sm:items-start lg:col-span-1">
            <div className="mb-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-gray-900 shadow-lg ring-4 shadow-blue-50 ring-blue-600/20">
                <Image
                  src="/logo.png"
                  alt="Jual Otomotif Jepara Logo"
                  width={1024}
                  height={1024}
                  className="h-16 w-16 rounded-lg object-cover"
                />
              </div>
            </div>
            <p className="max-w-96 text-center text-sm leading-relaxed text-gray-600 sm:max-w-48 sm:text-left">
              Kepercayaan Anda untuk mendapatkan otomotif berkualitas dan layanan yang
              memuaskan sejak 2012
            </p>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section, index) => (
            <div key={index} className="lg:col-span-1">
              <h3 className="mb-4 text-center text-sm font-semibold tracking-wide text-gray-900 uppercase sm:text-left">
                {section.title}
              </h3>
              <ul className="flex flex-col items-center justify-center space-y-3 sm:items-start sm:justify-start">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="group flex items-center justify-between text-center text-sm text-gray-600 transition-colors duration-200 hover:text-gray-900 sm:items-start sm:justify-start"
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
              <p>
                © {new Date().getFullYear()} Jual Otomotif Jepara. All rights reserved.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <span className="hidden text-sm text-gray-400 md:block">
                Kunjungi Sosial Media Kami:
              </span>
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

          <div className="mt-4 flex w-full items-center justify-center border-t border-gray-800 pt-4 md:justify-start">
            <div className="flex flex-wrap gap-6 text-xs text-gray-400">
              <a href="#" className="transition-colors hover:text-white">
                Aksesibilitas
              </a>
              <a href="#" className="transition-colors hover:text-white">
                Sitemap
              </a>
              <a href="#" className="transition-colors hover:text-white">
                Jangan Jual Informasi Saya
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
