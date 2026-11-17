'use client';

import React, { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { HelpOffice, Locale } from '@/types';
import { KARNATAKA_DISTRICTS } from '@/lib/data/offices';
import {
  Building,
  Phone,
  Clock,
  MapPin,
  Search,
  Filter,
  Info,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';

interface OfficeFinderProps {
  initialOffices: HelpOffice[];
  locale: Locale;
}

export function OfficeFinder({ initialOffices, locale }: OfficeFinderProps) {
  const t = useTranslations('offices');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All Districts');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOffices = useMemo(() => {
    return initialOffices.filter((office) => {
      if (selectedDistrict !== 'All Districts' && office.district !== selectedDistrict) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchDistrict = office.district.toLowerCase().includes(q);
        const matchOffice = office.officeName.toLowerCase().includes(q);
        const matchAddress = office.address.toLowerCase().includes(q);
        const matchServices = office.servicesProvided.some((s) => s.toLowerCase().includes(q));
        return matchDistrict || matchOffice || matchAddress || matchServices;
      }
      return true;
    });
  }, [initialOffices, selectedDistrict, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Notice on Data Sources */}
      <div className="p-4 rounded-xl border border-paper-300 dark:border-stone-800 bg-paper-50 dark:bg-stone-900 flex items-start gap-3 shadow-sm">
        <Info className="w-5 h-5 text-field-800 dark:text-straw-400 shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm text-ink-muted dark:text-stone-300 leading-relaxed">
          <strong className="text-ink dark:text-paper-100 font-bold block mb-0.5">
            Verified Public Directory:
          </strong>
          {t('placeholderNotice')}
        </div>
      </div>

      {/* District & Search Controls */}
      <div className="p-4 sm:p-6 rounded-2xl border border-paper-300 dark:border-stone-800 bg-paper-50 dark:bg-stone-900 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-ink-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search office by town, taluk or service..."
            className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-paper-300 dark:border-stone-800 bg-paper-100 dark:bg-stone-950 text-ink dark:text-paper-100 focus:outline-none focus:ring-2 focus:ring-field-800"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <label htmlFor="district-filter" className="text-xs font-bold text-ink-muted shrink-0">
            {t('searchDistrict')}:
          </label>
          <select
            id="district-filter"
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="w-full md:w-60 p-2 text-sm rounded-lg border border-paper-300 dark:border-stone-800 bg-paper-100 dark:bg-stone-950 text-ink dark:text-paper-100 focus:outline-none focus:ring-2 focus:ring-field-800 font-medium"
          >
            {KARNATAKA_DISTRICTS.map((dist) => (
              <option key={dist} value={dist}>
                {dist}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Offices Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredOffices.map((office) => (
          <div
            key={office.id}
            className="p-6 rounded-2xl border border-paper-300 dark:border-stone-800 bg-paper-50 dark:bg-stone-900 shadow-card hover:shadow-hover transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider bg-field-50 dark:bg-stone-800 text-field-900 dark:text-straw-400 border border-field-200 dark:border-stone-700">
                  {office.district} {office.districtKannada ? `(${office.districtKannada})` : ''}
                </span>
                <span className="text-xs text-ink-muted dark:text-stone-400 font-mono">
                  PIN: {office.pincode}
                </span>
              </div>

              <h2 className="font-serif font-bold text-lg sm:text-xl text-ink dark:text-paper-100 leading-snug">
                {office.officeName}
              </h2>

              {/* Address */}
              <div className="flex items-start gap-2.5 text-xs text-ink-muted dark:text-stone-300 leading-relaxed">
                <MapPin className="w-4 h-4 text-field-800 dark:text-straw-400 shrink-0 mt-0.5" />
                <span>{office.address}</span>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-2.5 text-xs text-ink dark:text-paper-100 font-semibold">
                <Phone className="w-4 h-4 text-field-800 dark:text-straw-400 shrink-0" />
                <a href={`tel:${office.phone}`} className="hover:underline">
                  {office.phone}
                </a>
              </div>

              {/* Hours */}
              <div className="flex items-center gap-2.5 text-xs text-ink-muted dark:text-stone-400">
                <Clock className="w-4 h-4 text-ink-muted shrink-0" />
                <span>{office.workingHours}</span>
              </div>

              {/* Services Provided */}
              <div className="pt-3 border-t border-paper-200 dark:border-stone-800 space-y-1.5">
                <span className="text-xs font-bold text-field-800 dark:text-straw-400 uppercase tracking-wider block">
                  {t('colServices')}:
                </span>
                <ul className="space-y-1 text-xs text-ink-muted dark:text-stone-300 list-disc list-inside">
                  {office.servicesProvided.map((service, idx) => (
                    <li key={idx}>{service}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Data Source Note */}
            <div className="pt-3 border-t border-paper-200 dark:border-stone-800 text-[11px] text-ink-muted dark:text-stone-400">
              <span>Source: {office.dataSourceNote}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
