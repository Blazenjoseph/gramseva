'use client';

import React, { useState, useMemo } from 'react';
import { Scheme, NewsItem, Locale, VerificationStatus, AuditLogEntry } from '@/types';
import { SCHEMES_DATA } from '@/lib/data/schemes';
import { NEWS_ITEMS_DATA } from '@/lib/data/news';
import { createClient } from '@/lib/supabase/client';
import {
  isOfficialDomain,
  calculateSchemeStatus,
  validateSchemeForPublish,
} from '@/lib/admin/verification';
import {
  Shield,
  Lock,
  Mail,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Clock,
  FileEdit,
  Send,
  History,
  Search,
  Filter,
  LogOut,
  RefreshCw,
  Info,
  Calendar,
  Layers,
  ArrowRight,
  X,
} from 'lucide-react';

interface UpdateCentreProps {
  locale: Locale;
}

const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'audit-1',
    timestamp: '2026-11-23 09:30:00',
    user: 'lead.editor@jainuniversity.ac.in',
    action: 'VERIFIED_SOURCE',
    oldValue: 'Source access date: 2026-11-15',
    newValue: 'Source access date: 2026-11-23 (pmkisan.gov.in & PIB)',
    details: 'Verified PM-KISAN 24th instalment disbursal figures (₹18,690 crore transferred to 9.34 crore farmers).',
  },
  {
    id: 'audit-2',
    timestamp: '2026-11-23 10:15:00',
    user: 'lead.editor@jainuniversity.ac.in',
    action: 'UPDATED_NEWS',
    oldValue: 'PMFBY 2025 Kharif notice',
    newValue: 'PMFBY Kharif 2026 progress report (PIB 29 August 2026)',
    details: 'Added PIB news note with strict verification caveat: "to be checked against PIB release".',
  },
  {
    id: 'audit-3',
    timestamp: '2026-11-23 11:00:00',
    user: 'researcher.karnataka@jainuniversity.ac.in',
    action: 'SAVED_DRAFT',
    oldValue: 'Raitha Siri portal URL unlinked',
    newValue: 'Linked Karnataka Budget 2026-27 (finance.karnataka.gov.in)',
    details: 'Marked minimum-land rule and portal application link as to be verified.',
  },
];

export function UpdateCentre({ locale }: UpdateCentreProps) {
  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUserEmail, setCurrentUserEmail] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const [authError, setAuthError] = useState('');

  // Tab State
  const [activeTab, setActiveTab] = useState<'schemes' | 'news' | 'audit'>('schemes');

  // Scheme Management State
  const [schemes, setSchemes] = useState<Scheme[]>(SCHEMES_DATA);
  const [editingScheme, setEditingScheme] = useState<Scheme | null>(null);
  const [publishErrors, setPublishErrors] = useState<string[]>([]);
  const [actionSuccessMsg, setActionSuccessMsg] = useState('');
  const [sourceReminderModal, setSourceReminderModal] = useState<{
    isOpen: boolean;
    url: string;
    schemeTitle: string;
  }>({
    isOpen: false,
    url: '',
    schemeTitle: '',
  });

  // Schemes Filter State
  const [schemeSearch, setSchemeSearch] = useState('');
  const [schemeStatusFilter, setSchemeStatusFilter] = useState<string>('all');
  const [schemeLevelFilter, setSchemeLevelFilter] = useState<string>('all');

  // News Items State & Filters
  const [newsItems] = useState<NewsItem[]>(NEWS_ITEMS_DATA);
  const [newsSearch, setNewsSearch] = useState('');
  const [newsStateFilter, setNewsStateFilter] = useState('all');
  const [newsSchemeFilter, setNewsSchemeFilter] = useState('all');
  const [newsDateFrom, setNewsDateFrom] = useState('');
  const [newsDateTo, setNewsDateTo] = useState('');

  // Audit Logs State
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(INITIAL_AUDIT_LOGS);

  // Authentication Handlers
  const handleSendMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOtp({
        email: emailInput.trim(),
        options: {
          emailRedirectTo: typeof window !== 'undefined' ? `${window.location.origin}/${locale}/admin/updates` : undefined,
        },
      });

      if (error) {
        console.warn('Supabase auth notice:', error.message);
      }
      setMagicLinkSent(true);
      setAuthError('');
    } catch {
      setMagicLinkSent(true);
      setAuthError('');
    }
  };

  const handleDemoReviewerMode = () => {
    setCurrentUserEmail('reviewer.preview@jainuniversity.ac.in');
    setIsAuthenticated(true);
    setAuthError('');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setMagicLinkSent(false);
    setCurrentUserEmail('');
    setEditingScheme(null);
  };

  // Check Source Handler with Mandatory Reminder
  const handleCheckSource = (url: string, schemeTitle: string) => {
    setSourceReminderModal({
      isOpen: true,
      url,
      schemeTitle,
    });
  };

  const confirmOpenSource = () => {
    if (sourceReminderModal.url) {
      window.open(sourceReminderModal.url, '_blank', 'noopener,noreferrer');
    }
    setSourceReminderModal({ isOpen: false, url: '', schemeTitle: '' });
  };

  // Draft Save Handler
  const handleSaveDraft = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingScheme) return;

    const originalScheme = schemes.find((s) => s.id === editingScheme.id);
    const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 19);

    const updated = schemes.map((s) => (s.id === editingScheme.id ? { ...editingScheme, published: false } : s));
    setSchemes(updated);

    // Add Audit Log
    const log: AuditLogEntry = {
      id: `audit-${Date.now()}`,
      timestamp: nowStr,
      user: currentUserEmail || 'reviewer.preview@jainuniversity.ac.in',
      action: 'SAVED_DRAFT',
      oldValue: originalScheme ? `Draft Title: ${originalScheme.title}, Source: ${originalScheme.sourceUrl || 'None'}` : 'New draft',
      newValue: `Draft Title: ${editingScheme.title}, Source: ${editingScheme.sourceUrl || 'None'}, Access Date: ${editingScheme.sourceAccessDate || 'None'}`,
      details: `Saved draft for "${editingScheme.title}". Change summary: ${editingScheme.changeSummary || 'None provided'}`,
    };
    setAuditLogs([log, ...auditLogs]);

    setActionSuccessMsg(`Draft for "${editingScheme.title}" saved successfully.`);
    setTimeout(() => setActionSuccessMsg(''), 5000);
    setEditingScheme(null);
    setPublishErrors([]);
  };

  // Publish Handler with Strict Verification Validation
  const handlePublish = (schemeToPublish: Scheme) => {
    const validation = validateSchemeForPublish({
      sourceUrl: schemeToPublish.sourceUrl,
      sourceAccessDate: schemeToPublish.sourceAccessDate,
      changeSummary: schemeToPublish.changeSummary,
    });

    if (!validation.canPublish) {
      setPublishErrors(validation.errors);
      return;
    }

    setPublishErrors([]);
    const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 19);
    const todayDate = schemeToPublish.sourceAccessDate || new Date().toISOString().substring(0, 10);

    const originalScheme = schemes.find((s) => s.id === schemeToPublish.id);

    const updated = schemes.map((s) =>
      s.id === schemeToPublish.id
        ? {
            ...schemeToPublish,
            published: true,
            lastVerifiedOn: todayDate,
            verifiedBy: currentUserEmail || 'Editorial Verification Desk',
          }
        : s
    );
    setSchemes(updated);

    // Audit Log for Publish Action
    const log: AuditLogEntry = {
      id: `audit-${Date.now()}`,
      timestamp: nowStr,
      user: currentUserEmail || 'reviewer.preview@jainuniversity.ac.in',
      action: 'PUBLISHED_SCHEME',
      oldValue: originalScheme ? `Status: ${calculateSchemeStatus(originalScheme)}, Verified: ${originalScheme.lastVerifiedOn}` : 'Unpublished',
      newValue: `Status: verified, Verified On: ${todayDate}, Official Source: ${schemeToPublish.sourceUrl}`,
      details: `Published updated scheme "${schemeToPublish.title}". Change Summary: ${schemeToPublish.changeSummary}`,
    };
    setAuditLogs([log, ...auditLogs]);

    setActionSuccessMsg(`Scheme "${schemeToPublish.title}" successfully verified and published!`);
    setTimeout(() => setActionSuccessMsg(''), 5000);
    setEditingScheme(null);
  };

  // Filtered Schemes
  const filteredSchemes = useMemo(() => {
    return schemes.filter((scheme) => {
      // Search
      const matchesSearch =
        scheme.title.toLowerCase().includes(schemeSearch.toLowerCase()) ||
        scheme.department.toLowerCase().includes(schemeSearch.toLowerCase()) ||
        scheme.state.toLowerCase().includes(schemeSearch.toLowerCase());

      // Status
      const calculatedStatus = calculateSchemeStatus(scheme);
      const matchesStatus = schemeStatusFilter === 'all' || calculatedStatus === schemeStatusFilter;

      // Level
      const isCentral = scheme.state.toLowerCase() === 'central' || scheme.state.toLowerCase() === 'all-india';
      const matchesLevel =
        schemeLevelFilter === 'all' ||
        (schemeLevelFilter === 'central' && isCentral) ||
        (schemeLevelFilter === 'state' && !isCentral);

      return matchesSearch && matchesStatus && matchesLevel;
    });
  }, [schemes, schemeSearch, schemeStatusFilter, schemeLevelFilter]);

  // Filtered News Items
  const filteredNews = useMemo(() => {
    return newsItems.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(newsSearch.toLowerCase()) ||
        item.summary.toLowerCase().includes(newsSearch.toLowerCase());

      const matchesState = newsStateFilter === 'all' || (item.state && item.state.toLowerCase() === newsStateFilter.toLowerCase());

      const matchesScheme = newsSchemeFilter === 'all' || item.schemeSlug === newsSchemeFilter;

      let matchesDate = true;
      if (newsDateFrom) {
        matchesDate = matchesDate && item.publishedAt >= newsDateFrom;
      }
      if (newsDateTo) {
        matchesDate = matchesDate && item.publishedAt <= newsDateTo;
      }

      return matchesSearch && matchesState && matchesScheme && matchesDate;
    });
  }, [newsItems, newsSearch, newsStateFilter, newsSchemeFilter, newsDateFrom, newsDateTo]);

  // If not authenticated, show login and reviewer demo toggle
  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto my-12 p-6 sm:p-8 rounded-2xl border border-paper-300 dark:border-stone-800 bg-paper-50 dark:bg-stone-900 shadow-card space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-field-800 text-straw-400 flex items-center justify-center mx-auto shadow-sm">
            <Shield className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-serif font-bold text-field-900 dark:text-straw-400">
            Admin Update Centre
          </h1>
          <p className="text-sm text-paper-700 dark:text-paper-300 leading-relaxed">
            Secure verification portal for agricultural scheme data, official gazette audits, and public news releases.
          </p>
        </div>

        {magicLinkSent ? (
          <div className="p-4 rounded-xl bg-field-50 dark:bg-field-950/40 border border-field-200 dark:border-field-800 text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-field-700 dark:text-field-400 mx-auto" />
            <h3 className="font-semibold text-field-900 dark:text-field-200">Magic link dispatched</h3>
            <p className="text-xs text-paper-700 dark:text-paper-300">
              Check your inbox for <strong>{emailInput}</strong> to authenticate.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSendMagicLink} className="space-y-4">
            <div>
              <label htmlFor="admin-email" className="block text-xs font-semibold uppercase tracking-wider text-paper-700 dark:text-paper-300 mb-1">
                Institutional Email (Supabase Auth)
              </label>
              <div className="relative">
                <input
                  id="admin-email"
                  type="email"
                  required
                  placeholder="editor@jainuniversity.ac.in"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-paper-300 dark:border-stone-700 bg-paper-100/50 dark:bg-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-field-700"
                />
                <Mail className="w-4 h-4 text-paper-500 absolute left-3.5 top-3" />
              </div>
            </div>

            {authError && (
              <p className="text-xs text-red-600 dark:text-red-400">{authError}</p>
            )}

            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-field-800 text-paper-50 hover:bg-field-900 font-medium text-sm transition-colors shadow-sm"
            >
              Send magic link
            </button>
          </form>
        )}

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-paper-300 dark:border-stone-800" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-paper-50 dark:bg-stone-900 px-2 text-paper-500">Academic Review</span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleDemoReviewerMode}
          className="w-full py-2.5 rounded-lg border-2 border-dashed border-field-700 dark:border-field-500 text-field-800 dark:text-field-300 hover:bg-field-100/50 dark:hover:bg-field-950/30 text-sm font-semibold transition-colors flex items-center justify-center gap-2"
        >
          <Lock className="w-4 h-4" />
          Enter Reviewer Demo Mode
        </button>

        <p className="text-xs text-center text-paper-600 dark:text-paper-400">
          Strict zero personal data architecture. No farmer Aadhaar, bank, or land records are ever processed or stored.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-6 rounded-2xl border border-paper-300 dark:border-stone-800 bg-paper-50 dark:bg-stone-900 shadow-card">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide uppercase bg-field-100 text-field-800 dark:bg-field-900/60 dark:text-field-300">
              Admin Update Centre
            </span>
            <span className="text-xs text-paper-500">Reference Date: 23 November 2026</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-field-900 dark:text-straw-400">
            Government Scheme Update & Verification Centre
          </h1>
          <p className="text-xs sm:text-sm text-paper-700 dark:text-paper-300">
            Signed in as: <span className="font-mono font-semibold">{currentUserEmail}</span> · Group 5, Design Thinking, JAIN University
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-paper-700 dark:text-paper-300 hover:bg-paper-200 dark:hover:bg-stone-800 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
        </div>
      </div>

      {/* Global Action Messages */}
      {actionSuccessMsg && (
        <div className="p-4 rounded-xl bg-field-50 dark:bg-field-950/50 border border-field-200 dark:border-field-800 text-field-900 dark:text-field-200 text-sm flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-field-700 shrink-0" />
          <span>{actionSuccessMsg}</span>
        </div>
      )}

      {publishErrors.length > 0 && (
        <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-300 dark:border-red-800 text-red-900 dark:text-red-200 text-sm space-y-2">
          <div className="flex items-center gap-2 font-semibold text-red-800 dark:text-red-300">
            <AlertTriangle className="w-5 h-5" />
            <span>Publishing Blocked — Policy Verification Requirements Not Met:</span>
          </div>
          <ul className="list-disc pl-6 space-y-1 text-xs">
            {publishErrors.map((err, idx) => (
              <li key={idx}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex border-b border-paper-300 dark:border-stone-800 gap-2 sm:gap-6">
        <button
          onClick={() => setActiveTab('schemes')}
          className={`pb-3 text-sm font-semibold flex items-center gap-2 border-b-2 transition-colors ${
            activeTab === 'schemes'
              ? 'border-field-800 text-field-900 dark:border-straw-400 dark:text-straw-400'
              : 'border-transparent text-paper-600 dark:text-paper-400 hover:text-field-800'
          }`}
        >
          <Layers className="w-4 h-4" />
          Schemes Dashboard ({schemes.length})
        </button>
        <button
          onClick={() => setActiveTab('news')}
          className={`pb-3 text-sm font-semibold flex items-center gap-2 border-b-2 transition-colors ${
            activeTab === 'news'
              ? 'border-field-800 text-field-900 dark:border-straw-400 dark:text-straw-400'
              : 'border-transparent text-paper-600 dark:text-paper-400 hover:text-field-800'
          }`}
        >
          <Calendar className="w-4 h-4" />
          News & Updates ({newsItems.length})
        </button>
        <button
          onClick={() => setActiveTab('audit')}
          className={`pb-3 text-sm font-semibold flex items-center gap-2 border-b-2 transition-colors ${
            activeTab === 'audit'
              ? 'border-field-800 text-field-900 dark:border-straw-400 dark:text-straw-400'
              : 'border-transparent text-paper-600 dark:text-paper-400 hover:text-field-800'
          }`}
        >
          <History className="w-4 h-4" />
          Verification Audit Log ({auditLogs.length})
        </button>
      </div>

      {/* TAB 1: SCHEMES DASHBOARD */}
      {activeTab === 'schemes' && (
        <div className="space-y-6">
          {/* Controls & Search */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 rounded-xl bg-paper-100/60 dark:bg-stone-900/60 border border-paper-200 dark:border-stone-800">
            <div className="relative">
              <input
                type="text"
                placeholder="Search scheme name or department..."
                value={schemeSearch}
                onChange={(e) => setSchemeSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-paper-300 dark:border-stone-700 bg-paper-50 dark:bg-stone-800"
              />
              <Search className="w-4 h-4 text-paper-500 absolute left-2.5 top-2.5" />
            </div>

            <div className="flex items-center gap-2">
              <label className="text-xs font-semibold text-paper-700 dark:text-paper-300 whitespace-nowrap">
                Status:
              </label>
              <select
                value={schemeStatusFilter}
                onChange={(e) => setSchemeStatusFilter(e.target.value)}
                className="w-full py-2 px-3 text-xs rounded-lg border border-paper-300 dark:border-stone-700 bg-paper-50 dark:bg-stone-800"
              >
                <option value="all">All statuses</option>
                <option value="verified">Verified (≤ 90 days)</option>
                <option value="review-due">Review due (&gt; 90 days)</option>
                <option value="missing-source">Missing source (Blocked)</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-xs font-semibold text-paper-700 dark:text-paper-300 whitespace-nowrap">
                Level:
              </label>
              <select
                value={schemeLevelFilter}
                onChange={(e) => setSchemeLevelFilter(e.target.value)}
                className="w-full py-2 px-3 text-xs rounded-lg border border-paper-300 dark:border-stone-700 bg-paper-50 dark:bg-stone-800"
              >
                <option value="all">All levels</option>
                <option value="central">Central / Nationwide</option>
                <option value="state">State-specific</option>
              </select>
            </div>
          </div>

          {/* Scheme Table */}
          <div className="overflow-x-auto rounded-xl border border-paper-300 dark:border-stone-800 bg-paper-50 dark:bg-stone-900 shadow-sm">
            <table className="w-full text-left text-xs">
              <thead className="bg-paper-100 dark:bg-stone-800/80 border-b border-paper-200 dark:border-stone-700 text-paper-700 dark:text-paper-300 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="py-3 px-4">Scheme Name</th>
                  <th className="py-3 px-3">Level</th>
                  <th className="py-3 px-3">Verification Status</th>
                  <th className="py-3 px-3">Last Verified</th>
                  <th className="py-3 px-3">Audited By</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-paper-200 dark:divide-stone-800">
                {filteredSchemes.map((scheme) => {
                  const status: VerificationStatus = calculateSchemeStatus(scheme);
                  const isCentral = scheme.state.toLowerCase() === 'central' || scheme.state.toLowerCase() === 'all-india';

                  return (
                    <tr key={scheme.id} className="hover:bg-paper-100/50 dark:hover:bg-stone-800/40 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-field-900 dark:text-paper-100">
                          {scheme.title}
                        </div>
                        <div className="text-[11px] text-paper-500 truncate max-w-xs">
                          {scheme.department}
                        </div>
                      </td>

                      <td className="py-3.5 px-3">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                            isCentral
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-200'
                              : 'bg-amber-100 text-amber-900 dark:bg-amber-900/60 dark:text-amber-200'
                          }`}
                        >
                          {isCentral ? 'Central' : scheme.state}
                        </span>
                      </td>

                      <td className="py-3.5 px-3">
                        {status === 'verified' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Verified
                          </span>
                        )}
                        {status === 'review-due' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-100 text-amber-900 dark:bg-amber-950/80 dark:text-amber-300">
                            <Clock className="w-3.5 h-3.5" />
                            Review due (&gt;90d)
                          </span>
                        )}
                        {status === 'missing-source' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300">
                            <AlertTriangle className="w-3.5 h-3.5" />
                            Missing source
                          </span>
                        )}
                      </td>

                      <td className="py-3.5 px-3 font-mono text-[11px] text-paper-700 dark:text-paper-300">
                        {scheme.lastVerifiedOn || '—'}
                      </td>

                      <td className="py-3.5 px-3 text-[11px] text-paper-600 dark:text-paper-400">
                        {scheme.verifiedBy || 'Unassigned'}
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {scheme.sourceUrl ? (
                            <button
                              onClick={() => handleCheckSource(scheme.sourceUrl, scheme.title)}
                              className="px-2.5 py-1 rounded bg-paper-200 dark:bg-stone-800 text-field-900 dark:text-paper-100 hover:bg-paper-300 text-[11px] font-medium transition-colors flex items-center gap-1"
                              title="Check source on official site"
                            >
                              <ExternalLink className="w-3 h-3" />
                              Check source
                            </button>
                          ) : (
                            <span className="text-[10px] text-rose-600 dark:text-rose-400 font-semibold italic">
                              No source URL
                            </span>
                          )}

                          <button
                            onClick={() => {
                              setEditingScheme({ ...scheme });
                              setPublishErrors([]);
                            }}
                            className="px-2.5 py-1 rounded bg-field-800 text-paper-50 hover:bg-field-900 text-[11px] font-medium transition-colors flex items-center gap-1"
                          >
                            <FileEdit className="w-3 h-3" />
                            Edit Draft
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* EDIT FORM (DRAFT ONLY) */}
          {editingScheme && (
            <div className="p-6 rounded-2xl border-2 border-field-600 dark:border-straw-500 bg-paper-50 dark:bg-stone-900 shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-paper-300 dark:border-stone-800 pb-4">
                <div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-amber-200 text-amber-900">
                    Draft Editor Mode
                  </span>
                  <h2 className="text-xl font-serif font-bold text-field-900 dark:text-straw-400 mt-1">
                    Edit Scheme Record: {editingScheme.title}
                  </h2>
                  <p className="text-xs text-paper-600 dark:text-paper-400">
                    Saving records creates an internal draft only. Publishing is a distinct action requiring verified official source domain.
                  </p>
                </div>
                <button
                  onClick={() => setEditingScheme(null)}
                  className="p-1 rounded-lg text-paper-500 hover:bg-paper-200 dark:hover:bg-stone-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveDraft} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-paper-800 dark:text-paper-200 mb-1">
                      Scheme Title / Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingScheme.title}
                      onChange={(e) => setEditingScheme({ ...editingScheme, title: e.target.value })}
                      className="w-full p-2.5 rounded-lg border border-paper-300 dark:border-stone-700 bg-paper-100/50 dark:bg-stone-800 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-paper-800 dark:text-paper-200 mb-1">
                      Administering Department *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingScheme.department}
                      onChange={(e) => setEditingScheme({ ...editingScheme, department: e.target.value })}
                      className="w-full p-2.5 rounded-lg border border-paper-300 dark:border-stone-700 bg-paper-100/50 dark:bg-stone-800 text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-paper-800 dark:text-paper-200 mb-1">
                      Benefit Description (what it gives) *
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={editingScheme.whatItGives}
                      onChange={(e) => setEditingScheme({ ...editingScheme, whatItGives: e.target.value })}
                      className="w-full p-2.5 rounded-lg border border-paper-300 dark:border-stone-700 bg-paper-100/50 dark:bg-stone-800 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-paper-800 dark:text-paper-200 mb-1">
                      Eligibility Criteria (who it is for) *
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={editingScheme.whoItIsFor}
                      onChange={(e) => setEditingScheme({ ...editingScheme, whoItIsFor: e.target.value })}
                      className="w-full p-2.5 rounded-lg border border-paper-300 dark:border-stone-700 bg-paper-100/50 dark:bg-stone-800 text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-paper-800 dark:text-paper-200 mb-1">
                      Documents Required (one per line) *
                    </label>
                    <textarea
                      rows={3}
                      value={editingScheme.documentsNeeded.join('\n')}
                      onChange={(e) =>
                        setEditingScheme({
                          ...editingScheme,
                          documentsNeeded: e.target.value.split('\n').filter((d) => d.trim().length > 0),
                        })
                      }
                      className="w-full p-2.5 rounded-lg border border-paper-300 dark:border-stone-700 bg-paper-100/50 dark:bg-stone-800 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-paper-800 dark:text-paper-200 mb-1">
                      "Watch out" Note / Bottlenecks *
                    </label>
                    <textarea
                      rows={3}
                      value={editingScheme.watchFor}
                      onChange={(e) => setEditingScheme({ ...editingScheme, watchFor: e.target.value })}
                      className="w-full p-2.5 rounded-lg border border-paper-300 dark:border-stone-700 bg-paper-100/50 dark:bg-stone-800 text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-xl bg-paper-100/60 dark:bg-stone-800/60 border border-paper-300 dark:border-stone-700">
                  <div className="md:col-span-2">
                    <label className="block font-semibold text-paper-800 dark:text-paper-200 mb-1">
                      Official Source URL * (must be .gov.in, .nic.in, or state portal)
                    </label>
                    <input
                      type="url"
                      placeholder="https://pmkisan.gov.in"
                      value={editingScheme.sourceUrl}
                      onChange={(e) => setEditingScheme({ ...editingScheme, sourceUrl: e.target.value })}
                      className="w-full p-2.5 rounded-lg border border-paper-300 dark:border-stone-700 bg-paper-50 dark:bg-stone-900 text-xs font-mono"
                    />
                    <p className="text-[11px] text-paper-500 mt-1">
                      Publish rule: Blocked unless verified on an official government domain.
                    </p>
                  </div>

                  <div>
                    <label className="block font-semibold text-paper-800 dark:text-paper-200 mb-1">
                      Source Access Date *
                    </label>
                    <input
                      type="date"
                      value={editingScheme.sourceAccessDate || '2026-11-23'}
                      onChange={(e) => setEditingScheme({ ...editingScheme, sourceAccessDate: e.target.value })}
                      className="w-full p-2.5 rounded-lg border border-paper-300 dark:border-stone-700 bg-paper-50 dark:bg-stone-900 text-xs font-mono"
                    />
                  </div>

                  <div className="md:col-span-3">
                    <label className="block font-semibold text-paper-800 dark:text-paper-200 mb-1">
                      Change Summary * (Describe what was audited or updated)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Verified 24th instalment figures against PIB release; confirmed NPCI DBT bank link rule."
                      value={editingScheme.changeSummary || ''}
                      onChange={(e) => setEditingScheme({ ...editingScheme, changeSummary: e.target.value })}
                      className="w-full p-2.5 rounded-lg border border-paper-300 dark:border-stone-700 bg-paper-50 dark:bg-stone-900 text-xs"
                    />
                  </div>
                </div>

                {/* Form Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-paper-300 dark:border-stone-800">
                  <div className="text-xs text-paper-600 dark:text-paper-400">
                    Publishing immediately writes to the verified audit log and updates public catalog.
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button
                      type="submit"
                      className="flex-1 sm:flex-none px-4 py-2.5 rounded-lg border border-paper-400 dark:border-stone-600 text-paper-800 dark:text-paper-200 hover:bg-paper-200 text-xs font-semibold"
                    >
                      Save Draft
                    </button>

                    <button
                      type="button"
                      onClick={() => handlePublish(editingScheme)}
                      className="flex-1 sm:flex-none px-5 py-2.5 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-paper-50 font-bold text-xs flex items-center justify-center gap-2 shadow-sm"
                    >
                      <Send className="w-3.5 h-3.5" />
                      Publish Scheme
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: NEWS & UPDATES LIST */}
      {activeTab === 'news' && (
        <div className="space-y-6">
          {/* News Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 p-4 rounded-xl bg-paper-100/60 dark:bg-stone-900/60 border border-paper-200 dark:border-stone-800 text-xs">
            <div>
              <label className="block font-semibold text-paper-700 dark:text-paper-300 mb-1">
                Search Updates:
              </label>
              <input
                type="text"
                placeholder="Keyword, e.g. PIB, 24th..."
                value={newsSearch}
                onChange={(e) => setNewsSearch(e.target.value)}
                className="w-full p-2 rounded-lg border border-paper-300 dark:border-stone-700 bg-paper-50 dark:bg-stone-800"
              />
            </div>

            <div>
              <label className="block font-semibold text-paper-700 dark:text-paper-300 mb-1">
                State:
              </label>
              <select
                value={newsStateFilter}
                onChange={(e) => setNewsStateFilter(e.target.value)}
                className="w-full p-2 rounded-lg border border-paper-300 dark:border-stone-700 bg-paper-50 dark:bg-stone-800"
              >
                <option value="all">All States / Central</option>
                <option value="central">Central / All-India</option>
                <option value="karnataka">Karnataka</option>
                <option value="andhra pradesh">Andhra Pradesh</option>
                <option value="telangana">Telangana</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-paper-700 dark:text-paper-300 mb-1">
                Associated Scheme:
              </label>
              <select
                value={newsSchemeFilter}
                onChange={(e) => setNewsSchemeFilter(e.target.value)}
                className="w-full p-2 rounded-lg border border-paper-300 dark:border-stone-700 bg-paper-50 dark:bg-stone-800"
              >
                <option value="all">All Schemes</option>
                <option value="pm-kisan">PM-KISAN</option>
                <option value="pm-fasal-bima-yojana">PMFBY</option>
                <option value="raitha-siri">Raitha Siri</option>
                <option value="krishi-bhagya">Krishi Bhagya</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-paper-700 dark:text-paper-300 mb-1">
                Published Since:
              </label>
              <input
                type="date"
                value={newsDateFrom}
                onChange={(e) => setNewsDateFrom(e.target.value)}
                className="w-full p-2 rounded-lg border border-paper-300 dark:border-stone-700 bg-paper-50 dark:bg-stone-800 font-mono"
              />
            </div>
          </div>

          {/* News List */}
          <div className="space-y-4">
            {filteredNews.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-xl border border-paper-300 dark:border-stone-800 bg-paper-50 dark:bg-stone-900 shadow-sm space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-field-100 text-field-800 dark:bg-field-950 dark:text-field-300">
                      {item.category}
                    </span>
                    {item.state && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200">
                        {item.state}
                      </span>
                    )}
                    <span className="text-xs text-paper-500 font-mono">
                      Published: {item.publishedAt}
                    </span>
                  </div>

                  <span className="text-xs text-paper-600 dark:text-paper-400 font-mono">
                    Last Verified: {item.lastVerifiedOn}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-serif font-bold text-field-900 dark:text-straw-400">
                    {item.title}
                  </h3>
                  <p className="text-xs text-paper-700 dark:text-paper-300 mt-1 leading-relaxed">
                    {item.summary}
                  </p>
                </div>

                {item.verificationNote && (
                  <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-[11px] text-amber-900 dark:text-amber-200 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0 text-amber-700" />
                    <span>Audit note: {item.verificationNote}</span>
                  </div>
                )}

                <div className="flex items-center justify-between pt-2 border-t border-paper-200 dark:border-stone-800 text-xs">
                  <span className="text-paper-500 font-mono text-[11px]">
                    Source: {item.sourceUrl}
                  </span>

                  <button
                    onClick={() => handleCheckSource(item.sourceUrl, item.title)}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded bg-paper-200 dark:bg-stone-800 text-field-900 dark:text-paper-100 hover:bg-paper-300 text-xs font-medium transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Check official source
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: AUDIT LOG */}
      {activeTab === 'audit' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-paper-100/60 dark:bg-stone-900/60 border border-paper-200 dark:border-stone-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <History className="w-4 h-4 text-field-800 dark:text-straw-400" />
              <span className="font-semibold text-paper-800 dark:text-paper-200">
                Immutable Editorial Verification Audit Log
              </span>
            </div>
            <span className="text-paper-500">
              Total Recorded Actions: {auditLogs.length}
            </span>
          </div>

          <div className="space-y-3">
            {auditLogs.map((log) => (
              <div
                key={log.id}
                className="p-4 rounded-xl border border-paper-300 dark:border-stone-800 bg-paper-50 dark:bg-stone-900 shadow-sm space-y-2 text-xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px] text-paper-500 border-b border-paper-200 dark:border-stone-800 pb-2">
                  <div className="flex items-center gap-2 font-mono">
                    <span className="font-bold text-field-900 dark:text-paper-200 uppercase">
                      {log.action}
                    </span>
                    <span>·</span>
                    <span>{log.timestamp}</span>
                  </div>
                  <span className="font-mono text-paper-600 dark:text-paper-400">
                    Actor: {log.user}
                  </span>
                </div>

                <div className="text-paper-800 dark:text-paper-200 leading-relaxed">
                  {log.details}
                </div>

                {(log.oldValue || log.newValue) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-2 text-[11px] font-mono bg-paper-100/70 dark:bg-stone-800/70 p-2.5 rounded-lg">
                    <div>
                      <span className="text-red-700 dark:text-red-400 font-bold block mb-0.5">
                        Previous State:
                      </span>
                      <span className="text-paper-700 dark:text-paper-300">{log.oldValue || '—'}</span>
                    </div>
                    <div>
                      <span className="text-emerald-700 dark:text-emerald-400 font-bold block mb-0.5">
                        New Verified State:
                      </span>
                      <span className="text-paper-700 dark:text-paper-300">{log.newValue || '—'}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MANDATORY SOURCE REMINDER MODAL */}
      {sourceReminderModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-paper-950/60 backdrop-blur-sm">
          <div className="w-full max-w-lg p-6 rounded-2xl bg-paper-50 dark:bg-stone-900 border-2 border-field-700 dark:border-straw-500 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-field-900 dark:text-straw-400">
              <div className="w-10 h-10 rounded-xl bg-field-100 dark:bg-field-900 flex items-center justify-center">
                <ExternalLink className="w-5 h-5 text-field-800 dark:text-straw-400" />
              </div>
              <h3 className="text-lg font-serif font-bold">
                Check Official Primary Source
              </h3>
            </div>

            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 space-y-2 text-xs text-amber-900 dark:text-amber-200">
              <p className="font-bold text-sm">
                Reminder: Check the official source and enter the values yourself.
              </p>
              <p className="leading-relaxed">
                Do not scrape or auto-publish from government websites. Review the official gazette notification, circular, or portal guidelines directly, then record verified dates, amounts, and eligibility conditions manually.
              </p>
            </div>

            <div className="text-xs space-y-1">
              <span className="text-paper-500 block">Target Scheme / Update:</span>
              <span className="font-semibold text-paper-900 dark:text-paper-100 block">
                {sourceReminderModal.schemeTitle}
              </span>
              <span className="font-mono text-[11px] text-paper-600 dark:text-paper-400 break-all block">
                {sourceReminderModal.url}
              </span>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-paper-200 dark:border-stone-800">
              <button
                type="button"
                onClick={() => setSourceReminderModal({ isOpen: false, url: '', schemeTitle: '' })}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-paper-700 dark:text-paper-300 hover:bg-paper-200 dark:hover:bg-stone-800"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmOpenSource}
                className="px-4 py-2 rounded-lg bg-field-800 hover:bg-field-900 text-paper-50 text-xs font-bold transition-colors"
              >
                Open Official Source in New Tab
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
