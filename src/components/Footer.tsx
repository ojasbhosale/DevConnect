import Link from 'next/link';
import {
  Github,
  Twitter,
  Linkedin,
  Heart,
  Code,
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-black/50 backdrop-blur-lg text-sm">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link
              href="/"
              className="text-xl font-bold text-white tracking-tight mb-4 block"
            >
              DevConnect<span className="text-blue-500">.</span>
            </Link>
            <p className="text-gray-400 mb-4">
              Connecting developers worldwide. Discover talent, showcase skills, and build meaningful professional relationships.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h3 className="text-white font-semibold mb-4">Platform</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Discover Developers
                </Link>
              </li>
              <li>
                <Link
                  href="/browse"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Browse Profiles
                </Link>
              </li>
              <li>
                <Link
                  href="/build"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Build Profile
                </Link>
              </li>
              <li>
                <Link
                  href="/showcase"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Showcase Projects
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/docs"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="/api"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  API Reference
                </Link>
              </li>
              <li>
                <Link
                  href="/guides"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Guides
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/help"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <hr className="my-8 border-gray-700" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-xs">
          <p>
            © {new Date().getFullYear()} DevConnect. All rights reserved.
          </p>
          <p className="flex items-center gap-1">
            <Code size={14} /> with <Heart size={14} className="text-red-500" /> by Ojas Bhosale
          </p>
        </div>
      </div>
    </footer>
  );
}
