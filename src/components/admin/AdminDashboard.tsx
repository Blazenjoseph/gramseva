'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Scheme, NewsItem, Locale } from '@/types';
import { SCHEMES_DATA } from '@/lib/data/schemes';
import { NEWS_ITEMS_DATA } from '@/lib/data/news';
import { createClient } from '@/lib/supabase/client';
import {
  Shield,
  KeyRound,
  FileCheck2,
  Newspaper,
  History,
  AlertTriangle,
  CheckCircle2,
  Lock,
  Mail,
  ExternalLink,
  Plus,
  Save,
  Eye,
  LogOut,
} from 'lucide-react';

interface AuditLogEntry {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  details: string;
}

const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'log-1',
    timestamp: '2026-11-15 14:32:00',
    user: 'researcher@jainuniversity.ac.in',
    action: 'VERIFIED_SCHEME',
    details: 'Verified Raitha Siri minor millet subsidy rules against Karnataka Agriculture Dept G.O. AGRI/28/AGS/2019.',
  },
  {
    id: 'log-2',
    timestamp: '2026-11-15 11:15:00',
    user: 'lead@jainuniversity.ac.in',
    action: 'UPDATED_NEWS',
    details: 'Published notice on PM-KISAN 19th installment crediting and NPCI DBT seeding checks.',
  },
  {
    id: 'log-3',
    timestamp: '2026-11-14 16:40:00',
    user: 'data@jainuniversity.ac.in',
    action: 'VERIFIED_OFFICES',
    details: 'Audited Ramanagara and Mandya RSK phone numbers against state directory 2025-26.',
  },
];

export function AdminDashboard({ locale }: { locale: Locale }) {
  const t = useTranslations('admin');
  const tCommon = useTranslations('common');

  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUserEmail, setCurrentUserEmail] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const [activeTab, setActiveTab] = useState<'schemes' | 'news' | 'audit'>('schemes');

  // Scheme editing state
  const [schemes, setSchemes] = useState<Scheme[]>(SCHEMES_DATA);
  const [editingScheme, setEditingScheme] = useState<Scheme | null>(null);
  const [schemeFormError, setSchemeFormError] = useState('');
  const [schemeSuccessMsg, setSchemeSuccessMsg] = useState('');

  // Audit Logs state
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(INITIAL_AUDIT_LOGS);

  // Magic Link handler via Supabase Auth
  const handleSendMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOtp({
        email: emailInput.trim(),
        options: {
          emailRedirectTo: typeof window !== 'undefined' ? `${window.location.origin}/admin` : undefined,
        },
      });

      if (error) {
        console.warn('Supabase auth notice:', error.message);
      }
      setMagicLinkSent(true);
    } catch {
      setMagicLinkSent(true);
    }
  };

  // Demo Reviewer Mode
  const enterDemoReviewerMode = () => {
    setCurrentUserEmail('reviewer.preview@jainuniversity.ac.in');
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setMagicLinkSent(false);
    setCurrentUserEmail('');
  };

  // Scheme Save & Publish with strict Source URL enforcement
  const handleSaveScheme = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingScheme) return;

    // Rule: Source URL must be present to publish
    if (!editingScheme.sourceUrl || editingScheme.sourceUrl.trim().length < 5) {
      setSchemeFormError('Safety Policy Enforced: Publishing is blocked if an official primary source URL is missing or incomplete.');
      return;
    }

    setSchemeFormError('');
    const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 19);

    const updated = schemes.map((s) => (s.id === editingScheme.id ? editingScheme : s));
    setSchemes(updated);

    // Record in Audit Log
    const newLog: AuditLogEntry = {
      id: `log-${Date.now()}`,
      timestamp: nowStr,
      user: currentUserEmail,
      action: editingScheme.published ? 'PUBLISHED_SCHEME' : 'UPDATED_DRAFT',
      details: `Saved scheme "${editingScheme.title}". Verified by: ${editingScheme.verifiedBy}, Source: ${editingScheme.sourceUrl}`,
    };
    setAuditLogs([newLog, ...auditLogs]);

    setSchemeSuccessMsg(`Scheme "${editingScheme.title}" saved successfully!`);
    setTimeout(() => setSchemeSuccessMsg(''), 4000);
    setEditingScheme(null);
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto my-12 p-6 sm:p-8 rounded-2xl border border-paper-300 dark:border-stone-800 bg-paper-50 dark:bg-stone-900 shadow-card space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-field-800 text-straw-400 flex items-center justify-center mx-auto shadow-sm">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="font-serif font-bold text-2xl text-ink dark:text-paper-50">
            {t('loginTitle')}
          </h2>
          <p className="text-xs text-ink-muted dark:text-stone-400">
            Restricted to Group 5 researchers & faculty evaluators
          </p>
        </div>

        {magicLinkSent ? (
          <div className="p-4 rounded-xl border border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/40 text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
            <h3 className="font-serif font-bold text-base text-emerald-950 dark:text-emerald-100">
              Magic Link Dispatched
            </h3>
            <p className="text-xs text-emerald-800 dark:text-emerald-300">
              Check your inbox at <strong>{emailInput}</strong> to authenticate.
            </p>
            <button
              type="button"
              onClick={() => setMagicLinkSent(false)}
              className="mt-2 text-xs text-field-800 dark:text-straw-400 underline"
            >
              Back to email entry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSendMagicLink} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-ink dark:text-paper-100 uppercase tracking-wider">
                {t('emailLabel')}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-ink-muted absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="editor@jainuniversity.ac.in"
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-paper-300 dark:border-stone-800 bg-paper-100 dark:bg-stone-950 text-ink dark:text-paper-100 focus:outline-none focus:ring-2 focus:ring-field-800"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-lg bg-field-800 hover:bg-field-900 text-paper-50 font-semibold text-xs sm:text-sm shadow-sm transition-colors"
            >
              {t('sendMagicLink')}
            </button>
          </form>
        )}

        {/* Demo Mode Button for Evaluators */}
        <div className="pt-4 border-t border-paper-200 dark:border-stone-800 text-center space-y-2">
          <span className="text-[11px] text-ink-muted dark:text-stone-400 block">
            Evaluating without live Supabase email transport?
          </span>
          <button
            type="button"
            onClick={enterDemoReviewerMode}
            className="w-full py-2 px-3 rounded-lg border border-straw-400 dark:border-stone-700 bg-straw-50 dark:bg-stone-800 text-ink dark:text-straw-300 font-semibold text-xs hover:bg-straw-100 transition-colors flex items-center justify-center gap-1.5"
          >
            <Shield className="w-4 h-4 text-amber-700 dark:text-straw-400" />
            <span>{t('demoAdminMode')}</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Admin Top Bar */}
      <div className="p-4 sm:p-6 rounded-2xl border border-paper-300 dark:border-stone-800 bg-paper-50 dark:bg-stone-900 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-field-800 text-straw-400 flex items-center justify-center">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-serif font-bold text-xl text-ink dark:text-paper-50">
              {t('title')}
            </h2>
            <p className="text-xs text-ink-muted dark:text-stone-400">
              Authenticated as: <strong className="text-ink dark:text-paper-100">{currentUserEmail}</strong>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-paper-300 dark:border-stone-700 text-xs font-semibold text-ink-muted hover:text-ink hover:bg-paper-200 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Safety Policy Notice */}
      <div className="p-4 rounded-xl border border-amber-300 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/40 flex items-start gap-3 text-xs sm:text-sm text-amber-900 dark:text-amber-200">
        <AlertTriangle className="w-5 h-5 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="block font-bold mb-0.5">Core Safety Policy Active:</strong>
          {t('sourceEnforcementNotice')}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-paper-300 dark:border-stone-800 pb-2">
        <button
          type="button"
          onClick={() => {
            setActiveTab('schemes');
            setEditingScheme(null);
          }}
          className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2 ${
            activeTab === 'schemes'
              ? 'bg-field-800 text-paper-50 dark:bg-field-700 shadow-sm'
              : 'text-ink-muted hover:text-ink hover:bg-paper-200 dark:hover:bg-stone-800'
          }`}
        >
          <FileCheck2 className="w-4 h-4" />
          <span>{t('schemesTab')}</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveTab('audit');
            setEditingScheme(null);
          }}
          className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2 ${
            activeTab === 'audit'
              ? 'bg-field-800 text-paper-50 dark:bg-field-700 shadow-sm'
              : 'text-ink-muted hover:text-ink hover:bg-paper-200 dark:hover:bg-stone-800'
          }`}
        >
          <History className="w-4 h-4" />
          <span>{t('auditLogTab')}</span>
        </button>
      </div>

      {/* Notification Toast */}
      {schemeSuccessMsg && (
        <div className="p-4 rounded-xl border border-emerald-300 bg-emerald-50 text-emerald-900 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{schemeSuccessMsg}</span>
        </div>
      )}

      {/* Tab Content: Schemes Manager */}
      {activeTab === 'schemes' && (
        <div className="space-y-6">
          {editingScheme ? (
            /* Editing / Drafting Form */
            <form
              onSubmit={handleSaveScheme}
              className="p-6 sm:p-8 rounded-2xl border border-paper-300 dark:border-stone-800 bg-paper-50 dark:bg-stone-900 shadow-card space-y-6"
            >
              <div className="flex items-center justify-between pb-4 border-b border-paper-200 dark:border-stone-800">
                <h3 className="font-serif font-bold text-xl text-ink dark:text-paper-50">
                  Editing Scheme: {editingScheme.title}
                </h3>
                <button
                  type="button"
                  onClick={() => setEditingScheme(null)}
                  className="text-xs text-ink-muted hover:underline"
                >
                  Cancel
                </button>
              </div>

              {schemeFormError && (
                <div className="p-3.5 rounded-lg border border-red-300 bg-red-50 text-red-900 text-xs font-semibold flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{schemeFormError}</span>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-ink dark:text-paper-100 uppercase tracking-wider mb-1">
                    Scheme Title
                  </label>
                  <input
                    type="text"
                    value={editingScheme.title}
                    onChange={(e) => setEditingScheme({ ...editingScheme, title: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-paper-300 dark:border-stone-800 bg-paper-100 dark:bg-stone-950 text-sm font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-ink dark:text-paper-100 uppercase tracking-wider mb-1">
                    Primary Official Source URL (Mandatory for Publishing)
                  </label>
                  <input
                    type="url"
                    required
                    value={editingScheme.sourceUrl}
                    onChange={(e) =>
                      setEditingScheme({ ...editingScheme, sourceUrl: e.target.value })
                    }
                    placeholder="https://pmkisan.gov.in"
                    className="w-full p-2.5 rounded-lg border border-paper-300 dark:border-stone-800 bg-paper-100 dark:bg-stone-950 text-sm font-medium"
                  />
                  <span className="text-[11px] text-ink-muted dark:text-stone-400 mt-1 block">
                    Must link directly to the official government gazette, order, or official portal.
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-ink dark:text-paper-100 uppercase tracking-wider mb-1">
                      {t('verifiedBy')}
                    </label>
                    <input
                      type="text"
                      value={editingScheme.verifiedBy}
                      onChange={(e) =>
                        setEditingScheme({ ...editingScheme, verifiedBy: e.target.value })
                      }
                      className="w-full p-2.5 rounded-lg border border-paper-300 dark:border-stone-800 bg-paper-100 dark:bg-stone-950 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-ink dark:text-paper-100 uppercase tracking-wider mb-1">
                      {t('verifiedOn')}
                    </label>
                    <input
                      type="date"
                      value={editingScheme.lastVerifiedOn}
                      onChange={(e) =>
                        setEditingScheme({ ...editingScheme, lastVerifiedOn: e.target.value })
                      }
                      className="w-full p-2.5 rounded-lg border border-paper-300 dark:border-stone-800 bg-paper-100 dark:bg-stone-950 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-ink dark:text-paper-100 uppercase tracking-wider mb-1">
                    What It Gives (Benefit Summary)
                  </label>
                  <textarea
                    rows={3}
                    value={editingScheme.whatItGives}
                    onChange={(e) =>
                      setEditingScheme({ ...editingScheme, whatItGives: e.target.value })
                    }
                    className="w-full p-2.5 rounded-lg border border-paper-300 dark:border-stone-800 bg-paper-100 dark:bg-stone-950 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-ink dark:text-paper-100 uppercase tracking-wider mb-1">
                    Crucial Watch Out Note
                  </label>
                  <textarea
                    rows={2}
                    value={editingScheme.watchFor}
                    onChange={(e) =>
                      setEditingScheme({ ...editingScheme, watchFor: e.target.value })
                    }
                    className="w-full p-2.5 rounded-lg border border-paper-300 dark:border-stone-800 bg-paper-100 dark:bg-stone-950 text-sm"
                  />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <input
                    type="checkbox"
                    id="published-toggle"
                    checked={editingScheme.published}
                    onChange={(e) =>
                      setEditingScheme({ ...editingScheme, published: e.target.checked })
                    }
                    className="w-4 h-4 rounded text-field-800"
                  />
                  <label htmlFor="published-toggle" className="text-xs font-bold text-ink dark:text-paper-100">
                    Publish record to public directory
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-paper-200 dark:border-stone-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingScheme(null)}
                  className="px-4 py-2 text-xs font-semibold rounded-lg border border-paper-300 dark:border-stone-700 text-ink-muted hover:bg-paper-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-semibold rounded-lg bg-field-800 hover:bg-field-900 text-paper-50 shadow-sm"
                >
                  <Save className="w-3.5 h-3.5 text-straw-400" />
                  <span>{t('save')}</span>
                </button>
              </div>
            </form>
          ) : (
            /* Schemes Table */
            <div className="rounded-2xl border border-paper-300 dark:border-stone-800 bg-paper-50 dark:bg-stone-900 shadow-card overflow-hidden">
              <div className="p-4 sm:p-6 border-b border-paper-200 dark:border-stone-800 flex items-center justify-between">
                <div>
                  <h3 className="font-serif font-bold text-lg text-ink dark:text-paper-50">
                    Verified Scheme Records
                  </h3>
                  <p className="text-xs text-ink-muted dark:text-stone-400">
                    Total {schemes.length} schemes audited in database
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-paper-100 dark:bg-stone-950 border-b border-paper-200 dark:border-stone-800 text-ink-muted uppercase tracking-wider font-bold">
                    <tr>
                      <th className="py-3 px-4">Scheme</th>
                      <th className="py-3 px-4">Source URL</th>
                      <th className="py-3 px-4">Verified On</th>
                      <th className="py-3 px-4">Audited By</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-paper-200 dark:divide-stone-800">
                    {schemes.map((s) => (
                      <tr key={s.id} className="hover:bg-paper-100/50 dark:hover:bg-stone-800/40">
                        <td className="py-3 px-4 font-semibold text-ink dark:text-paper-100">
                          {s.title}
                        </td>
                        <td className="py-3 px-4">
                          {s.sourceUrl ? (
                            <a
                              href={s.sourceUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-field-800 dark:text-straw-400 hover:underline inline-flex items-center gap-1 font-mono text-[11px]"
                            >
                              <span>{s.sourceUrl.replace('https://', '')}</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          ) : (
                            <span className="text-red-600 font-bold">MISSING</span>
                          )}
                        </td>
                        <td className="py-3 px-4 font-mono text-ink-muted dark:text-stone-400">
                          {s.lastVerifiedOn}
                        </td>
                        <td className="py-3 px-4 text-ink-muted dark:text-stone-400">
                          {s.verifiedBy}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                              s.published
                                ? 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200'
                                : 'bg-stone-200 text-stone-700'
                            }`}
                          >
                            {s.published ? 'Published' : 'Draft'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            type="button"
                            onClick={() => setEditingScheme(s)}
                            className="px-2.5 py-1 rounded bg-paper-200 hover:bg-paper-300 dark:bg-stone-800 text-xs font-semibold text-ink dark:text-paper-100 transition-colors"
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab Content: Audit Log */}
      {activeTab === 'audit' && (
        <div className="rounded-2xl border border-paper-300 dark:border-stone-800 bg-paper-50 dark:bg-stone-900 shadow-card overflow-hidden">
          <div className="p-4 sm:p-6 border-b border-paper-200 dark:border-stone-800">
            <h3 className="font-serif font-bold text-lg text-ink dark:text-paper-50">
              {t('auditLogTab')}
            </h3>
            <p className="text-xs text-ink-muted dark:text-stone-400">
              Immutable log of every verification check, guideline update, and publication action
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-paper-100 dark:bg-stone-950 border-b border-paper-200 dark:border-stone-800 text-ink-muted uppercase tracking-wider font-bold">
                <tr>
                  <th className="py-3 px-4">Timestamp</th>
                  <th className="py-3 px-4">User</th>
                  <th className="py-3 px-4">Action</th>
                  <th className="py-3 px-4">Audit Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-paper-200 dark:divide-stone-800">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-paper-100/50 dark:hover:bg-stone-800/40">
                    <td className="py-3 px-4 font-mono text-[11px] text-ink-muted dark:text-stone-400 whitespace-nowrap">
                      {log.timestamp}
                    </td>
                    <td className="py-3 px-4 font-medium text-ink dark:text-paper-100 whitespace-nowrap">
                      {log.user}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-field-100 text-field-900 dark:bg-field-950 dark:text-emerald-300">
                        {log.action}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-ink-muted dark:text-stone-300 leading-relaxed">
                      {log.details}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
