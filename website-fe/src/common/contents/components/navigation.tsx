import { BookOpen, Cloud, Code, FileText, Globe } from 'lucide-react'

export const navigationItems = [
  {
    title: 'Layanan',
    href: '#',
    content: {
      sections: [
        {
          title: 'Cari Motor Baru',
          items: [
            {
              title: '',
              description: '',
              icon: BookOpen,
              href: '#'
            },
            {
              title: '',
              description: '',
              icon: FileText,
              href: '#'
            },
            {
              title: '',
              description: '',
              icon: Code,
              href: '#'
            }
          ]
        },
        {
          title: 'Jasa Iklan Motor Bekas',
          items: [
            {
              title: '',
              description: '',
              icon: Code,
              href: '#'
            },
            {
              title: '',
              description: '',
              icon: Cloud,
              href: '#'
            },
            {
              title: '',
              description: '',
              icon: Globe,
              href: '#'
            }
          ]
        }
      ]
    }
  },
  {
    title: 'Brand',
    href: '#',
    content: {
      sections: [
        {
          title: 'Honda',
          items: [
            {
              title: '',
              description: '',
              icon: BookOpen,
              href: '#'
            }
          ]
        },
        {
          title: 'Yamaha',
          items: [
            {
              title: '',
              description: '',
              icon: Code,
              href: '#'
            },
            {
              title: '',
              description: '',
              icon: Cloud,
              href: '#'
            },
            {
              title: '',
              description: '',
              icon: Globe,
              href: '#'
            }
          ]
        },
        {
          title: 'Suzuki',
          items: [
            {
              title: '',
              description: '',
              icon: Code,
              href: '#'
            },
            {
              title: '',
              description: '',
              icon: Cloud,
              href: '#'
            },
            {
              title: '',
              description: '',
              icon: Globe,
              href: '#'
            }
          ]
        }
      ]
    }
  }
]

export const simpleItems = [
  { title: 'Beranda', href: '/' },
  { title: 'Tentang Kami', href: '/about' }
]
