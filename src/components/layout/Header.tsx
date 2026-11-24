'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { LanguageSwitcher } from './LanguageSwitcher';
import { AccessibilityControls } from './AccessibilityControls';
import { SkipLink } from './SkipLink';
import { Menu, X, Sprout, Search, CheckSquare, Building, BookOpen, Info, MessageSquare, Shield } from 'lucide-react';

export function Header() {
  const t = useTranslations('common');
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: t('nav.home'), icon: Sprout },
    { href: '/finder', label: t('nav.finder'), icon: Search },
    { href: '/schemes', label: t('nav.schemes'), icon: BookOpen },
    { href: '/checklist', label: t('nav.checklist'), icon: CheckSquare },
    { href: '/offices', label: t('nav.offices'), icon: Building },
    { href: '/glossary', label: t('nav.glossary'), icon: BookOpen },
    { href: '/about', label: t('nav.about'), icon: Info },
    { href: '/feedback', label: t('nav.feedback'), icon: MessageSquare },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      <SkipLink />
      <header className="sticky top-0 z-40 w-full border-b border-paper-300/80 dark:border-stone-800 bg-paper-100/95 dark:bg-stone-900/95 backdrop-blur-md transition-colors">
        {/* Top utility bar: Project Attribution + Controls */}
        <div className="border-b border-paper-200/70 dark:border-stone-800/80 px-4 py-1.5 text-xs">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-ink-muted dark:text-stone-300 font-medium">
              <span className="inline-block w-2 h-2 rounded-full bg-field-600 dark:bg-emerald-400" />
              <span>{t('projectAttribution')}</span>
            </div>
            <div className="flex items-center gap-3">
              <AccessibilityControls />
              <LanguageSwitcher />
            </div>
          </div>
        </div>

        {/* Main Navigation Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          {/* Logo & Brand */}
          <Link href="/" className="group flex items-center gap-2.5 focus:outline-none">
            <div className="w-9 h-9 rounded-lg bg-field-800 dark:bg-field-700 text-straw-400 flex items-center justify-center shadow-editorial group-hover:scale-105 transition-transform">
              <Sprout className="w-5 h-5" />
            </div>
            <div>
              <span className="font-serif font-bold text-xl tracking-tight text-field-900 dark:text-paper-50 block leading-tight">
                Scheme Access Kit
              </span>
              <span className="text-[11px] text-ink-muted dark:text-stone-400 block -mt-0.5 truncate max-w-[240px] sm:max-w-none">
                {t('appTagline')}
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
            {navLinks.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-1.5 text-sm rounded-md font-medium transition-colors ${
                    active
                      ? 'bg-field-800 text-paper-50 dark:bg-field-700 shadow-sm'
                      : 'text-ink dark:text-stone-200 hover:bg-paper-200 dark:hover:bg-stone-800'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/admin"
              className="ml-2 px-2.5 py-1 text-xs rounded border border-paper-300 dark:border-stone-700 text-ink-muted dark:text-stone-400 hover:text-field-800 dark:hover:text-straw-400 hover:bg-paper-200/50 flex items-center gap-1"
              title="Admin & Verification Portal"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin</span>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-ink dark:text-paper-100 bg-paper-200/60 dark:bg-stone-800 hover:bg-paper-200 focus:outline-none focus:ring-2 focus:ring-field-800"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-paper-300 dark:border-stone-800 bg-paper-50 dark:bg-stone-900 px-4 pt-3 pb-6 shadow-xl animate-in fade-in slide-in-from-top-2 duration-150">
            <nav className="flex flex-col gap-1.5" aria-label="Mobile Navigation">
              {navLinks.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-base font-medium transition-colors ${
                      active
                        ? 'bg-field-800 text-paper-50 font-semibold dark:bg-field-700'
                        : 'text-ink dark:text-paper-100 hover:bg-paper-200 dark:hover:bg-stone-800'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${active ? 'text-straw-400' : 'text-field-800 dark:text-straw-400'}`} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
              <div className="pt-2 mt-2 border-t border-paper-200 dark:border-stone-800">
                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3.5 py-2 rounded-lg text-sm text-ink-muted dark:text-stone-400 hover:bg-paper-200 dark:hover:bg-stone-800"
                >
                  <Shield className="w-4 h-4" />
                  <span>{t('nav.admin')}</span>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
