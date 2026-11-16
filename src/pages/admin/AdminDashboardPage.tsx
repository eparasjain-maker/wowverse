import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminService } from '../../services/adminService';
import { bookingService } from '../../services/bookingService';
import { WeddingEnquiry, ConsultationBooking, BookingSettings, AvailabilityStatus, EnquiryStatus, ConsultationStatus } from '../../types';
import { Badge } from '../../components/common/Badge';
import {
  LayoutDashboard,
  Calendar as CalendarIcon,
  Inbox,
  Video,
  Settings as SettingsIcon,
  LogOut,
  CheckCircle,
  XCircle,
  Phone,
  MessageCircle,
  Sparkles,
  Save,
  Plus,
  Trash2,
  Clock,
  Shield,
  Eye,
  RefreshCw,
  Search,
  Check
} from 'lucide-react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isSameMonth, addDays, isSameDay } from 'date-fns';

export const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();

  // Navigation state
  const [activeTab, setActiveTab] = useState<'overview' | 'calendar' | 'enquiries' | 'consultations' | 'settings'>('overview');

  // Data state
  const [metrics, setMetrics] = useState({
    totalEnquiries: 0,
    pendingEnquiries: 0,
    confirmedWeddings: 0,
    upcomingConsultations: 0,
  });

  const [enquiries, setEnquiries] = useState<WeddingEnquiry[]>([]);
  const [consultations, setConsultations] = useState<ConsultationBooking[]>([]);
  const [settings, setSettings] = useState<BookingSettings | null>(null);
  const [loading, setLoading] = useState(true);

  // Calendar Module State
  const [calendarMonth, setCalendarMonth] = useState<Date>(new Date());
  const [availMap, setAvailMap] = useState<Record<string, { status: AvailabilityStatus; notes?: string }>>({});
  const [selectedCalendarDate, setSelectedCalendarDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'));
  const [newStatus, setNewStatus] = useState<AvailabilityStatus>('AVAILABLE');
  const [dateNote, setDateNote] = useState('');

  // Enquiries filter
  const [enquiryFilter, setEnquiryFilter] = useState<string>('ALL');
  const [searchEnquiry, setSearchEnquiry] = useState('');
  const [selectedEnquiry, setSelectedEnquiry] = useState<WeddingEnquiry | null>(null);

  // Time Slot Block State
  const [slotBlockDate, setSlotBlockDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'));
  const [availableSlotsForDate, setAvailableSlotsForDate] = useState<string[]>([]);
  const [blockedSlotsForDate, setBlockedSlotsForDate] = useState<string[]>([]);

  useEffect(() => {
    if (!adminService.isAuthenticated()) {
      navigate('/admin/login');
      return;
    }
    loadAllData();
  }, [navigate]);

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [m, enqs, cons, st, cal] = await Promise.all([
        adminService.getMetrics(),
        adminService.getEnquiries(),
        adminService.getConsultations(),
        adminService.getSettings(),
        bookingService.getWeddingAvailability()
      ]);
      setMetrics(m);
      setEnquiries(enqs);
      setConsultations(cons);
      setSettings(st);
      setAvailMap(cal);

      if (enqs.length > 0 && !selectedEnquiry) {
        setSelectedEnquiry(enqs[0]);
      }
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await adminService.logout();
    navigate('/admin/login');
  };

  // Calendar update
  const handleUpdateDateStatus = async () => {
    await adminService.setDateAvailability(selectedCalendarDate, newStatus, dateNote);
    await loadAllData();
    alert(`Date ${selectedCalendarDate} status updated to ${newStatus}`);
  };

  // Enquiry status change
  const handleUpdateEnquiry = async (id: string, status: EnquiryStatus, notes?: string) => {
    await adminService.updateEnquiryStatus(id, status, notes);
    await loadAllData();
    if (selectedEnquiry && selectedEnquiry.id === id) {
      setSelectedEnquiry({ ...selectedEnquiry, status, ...(notes !== undefined ? { admin_notes: notes } : {}) });
    }
  };

  // Consultation status change
  const handleUpdateConsultation = async (id: string, status: ConsultationStatus) => {
    await adminService.updateConsultationStatus(id, status);
    await loadAllData();
  };

  // Settings Save
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    await adminService.updateSettings(settings);
    alert('Settings updated successfully!');
  };

  // Render Calendar Matrix for Admin Calendar Manager
  const renderAdminCalendar = () => {
    const monthStart = startOfMonth(calendarMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cur = day;
        const dStr = format(cur, 'yyyy-MM-dd');
        const isCurrentMonth = isSameMonth(cur, monthStart);
        const isSelected = selectedCalendarDate === dStr;
        const statusItem = availMap[dStr];
        const status = statusItem ? statusItem.status : 'AVAILABLE';

        days.push(
          <div
            key={dStr}
            onClick={() => {
              setSelectedCalendarDate(dStr);
              setNewStatus(status);
              setDateNote(statusItem?.notes || '');
            }}
            className={`min-h-[72px] p-2 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
              !isCurrentMonth
                ? 'opacity-25 border-transparent'
                : isSelected
                ? 'bg-wow/20 border-wow ring-2 ring-wow'
                : 'bg-surface-light/40 border-surface-border hover:border-ivory/30'
            }`}
          >
            <div className="flex justify-between items-center text-xs">
              <span className={`font-semibold ${isSelected ? 'text-wow font-bold' : 'text-ivory'}`}>
                {format(cur, 'd')}
              </span>
              <span className="text-[9px] font-mono uppercase text-ivory-dim">
                {status.slice(0, 4)}
              </span>
            </div>
            <div className="mt-1">
              <span
                className={`inline-block text-[8px] uppercase px-1 py-0.5 rounded font-bold ${
                  status === 'BOOKED'
                    ? 'bg-red-500/20 text-red-400'
                    : status === 'LIMITED'
                    ? 'bg-amber-500/20 text-amber-400'
                    : status === 'UNAVAILABLE'
                    ? 'bg-zinc-800 text-zinc-500'
                    : 'bg-emerald-500/20 text-emerald-400'
                }`}
              >
                {status}
              </span>
            </div>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div key={day.toString()} className="grid grid-cols-7 gap-1.5">
          {days}
        </div>
      );
      days = [];
    }

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-surface-border">
          <h4 className="font-display font-bold text-lg text-ivory">
            {format(calendarMonth, 'MMMM yyyy')}
          </h4>
          <div className="flex gap-2">
            <button
              onClick={() => setCalendarMonth(subMonths(calendarMonth, 1))}
              className="p-1.5 rounded-lg bg-surface-light border border-surface-border text-ivory hover:text-white"
            >
              ←
            </button>
            <button
              onClick={() => setCalendarMonth(new Date())}
              className="px-2.5 py-1 text-xs uppercase tracking-wider rounded-lg bg-surface-light border border-surface-border text-ivory hover:text-white"
            >
              Today
            </button>
            <button
              onClick={() => setCalendarMonth(addMonths(calendarMonth, 1))}
              className="p-1.5 rounded-lg bg-surface-light border border-surface-border text-ivory hover:text-white"
            >
              →
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1.5 text-center text-[10px] text-ivory-dim font-semibold uppercase">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
            <div key={d}>{d}</div>
          ))}
        </div>

        <div className="space-y-1.5">{rows}</div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background text-ivory pt-24 pb-16">
      {/* Dashboard Top Bar */}
      <header className="border-b border-surface-border bg-surface/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-display font-bold text-xl text-ivory tracking-tighter">
              WOWVERSE
            </span>
            <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-md bg-wow/10 text-wow border border-wow/20">
              Creative Studio Portal
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={loadAllData}
              className="p-2 rounded-lg bg-surface-light border border-surface-border text-ivory-dim hover:text-white text-xs flex items-center gap-1.5"
              title="Refresh Data"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Sync</span>
            </button>
            <button
              onClick={handleLogout}
              className="px-3.5 py-1.5 rounded-full bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 text-xs font-semibold flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" /> Logout
            </button>
          </div>
        </div>

        {/* Tab Navigation Menu */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex space-x-2 md:space-x-4 overflow-x-auto py-2">
          {[
            { id: 'overview', label: 'Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
            { id: 'calendar', label: 'Wedding Calendar', icon: <CalendarIcon className="w-4 h-4" /> },
            { id: 'enquiries', label: `Enquiries (${metrics.pendingEnquiries})`, icon: <Inbox className="w-4 h-4" /> },
            { id: 'consultations', label: `Consultations (${metrics.upcomingConsultations})`, icon: <Video className="w-4 h-4" /> },
            { id: 'settings', label: 'Studio Settings', icon: <SettingsIcon className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-wow text-white shadow-md shadow-wow/20'
                  : 'text-ivory-dim hover:text-white hover:bg-surface-light'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 md:px-12 py-8">
        {/* MODULE 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-2xl bg-surface border border-surface-border">
                <span className="text-[11px] uppercase tracking-wider text-ivory-dim font-semibold">
                  Total Enquiries
                </span>
                <p className="font-display font-bold text-4xl text-ivory mt-2">
                  {metrics.totalEnquiries}
                </p>
                <span className="text-[10px] text-wow mt-1 block">Wedding inquiries recorded</span>
              </div>

              <div className="p-6 rounded-2xl bg-surface border border-surface-border">
                <span className="text-[11px] uppercase tracking-wider text-amber-400 font-semibold">
                  Pending Review
                </span>
                <p className="font-display font-bold text-4xl text-amber-400 mt-2">
                  {metrics.pendingEnquiries}
                </p>
                <span className="text-[10px] text-ivory-dim mt-1 block">Awaiting creator call</span>
              </div>

              <div className="p-6 rounded-2xl bg-surface border border-surface-border">
                <span className="text-[11px] uppercase tracking-wider text-emerald-400 font-semibold">
                  Locked Weddings
                </span>
                <p className="font-display font-bold text-4xl text-emerald-400 mt-2">
                  {metrics.confirmedWeddings}
                </p>
                <span className="text-[10px] text-ivory-dim mt-1 block">Dates confirmed / booked</span>
              </div>

              <div className="p-6 rounded-2xl bg-surface border border-surface-border">
                <span className="text-[11px] uppercase tracking-wider text-blue-400 font-semibold">
                  Upcoming Consultations
                </span>
                <p className="font-display font-bold text-4xl text-blue-400 mt-2">
                  {metrics.upcomingConsultations}
                </p>
                <span className="text-[10px] text-ivory-dim mt-1 block">Video direction calls</span>
              </div>
            </div>

            {/* Quick Overview Tables */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Enquiries */}
              <div className="p-6 rounded-3xl bg-surface border border-surface-border space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-surface-border">
                  <h3 className="font-display font-bold text-lg text-ivory">Recent Enquiries</h3>
                  <button onClick={() => setActiveTab('enquiries')} className="text-xs text-wow hover:underline">
                    View All →
                  </button>
                </div>
                <div className="space-y-3">
                  {enquiries.slice(0, 4).map((enq) => (
                    <div
                      key={enq.id}
                      onClick={() => {
                        setSelectedEnquiry(enq);
                        setActiveTab('enquiries');
                      }}
                      className="p-3.5 rounded-xl bg-surface-light border border-surface-border hover:border-ivory/30 cursor-pointer flex items-center justify-between text-xs"
                    >
                      <div>
                        <div className="font-semibold text-ivory">{enq.name} & {enq.partner_name}</div>
                        <div className="text-[11px] text-ivory-dim">{enq.wedding_date} · {enq.city_venue}</div>
                      </div>
                      <Badge status={enq.status} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming Consultations */}
              <div className="p-6 rounded-3xl bg-surface border border-surface-border space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-surface-border">
                  <h3 className="font-display font-bold text-lg text-ivory">Upcoming Video Calls</h3>
                  <button onClick={() => setActiveTab('consultations')} className="text-xs text-wow hover:underline">
                    View All →
                  </button>
                </div>
                <div className="space-y-3">
                  {consultations.slice(0, 4).map((c) => (
                    <div
                      key={c.id}
                      className="p-3.5 rounded-xl bg-surface-light border border-surface-border flex items-center justify-between text-xs"
                    >
                      <div>
                        <div className="font-semibold text-ivory">{c.name}</div>
                        <div className="text-[11px] text-ivory-dim font-mono">{c.date} · {c.time_slot}</div>
                      </div>
                      <Badge status={c.status} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MODULE 2: WEDDING CALENDAR MANAGER */}
        {activeTab === 'calendar' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in duration-300">
            {/* Calendar View */}
            <div className="lg:col-span-8 p-6 md:p-8 rounded-3xl bg-surface border border-surface-border">
              {renderAdminCalendar()}
            </div>

            {/* Date Editor Panel */}
            <div className="lg:col-span-4 p-6 rounded-3xl bg-surface border border-surface-border space-y-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-wow font-semibold block mb-1">
                  Edit Date Availability
                </span>
                <h3 className="font-display font-bold text-2xl text-ivory">
                  {selectedCalendarDate}
                </h3>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-ivory-dim mb-2">
                  Public Status
                </label>
                <div className="space-y-2">
                  {(['AVAILABLE', 'LIMITED', 'PENDING', 'BOOKED', 'UNAVAILABLE'] as AvailabilityStatus[]).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setNewStatus(st)}
                      className={`w-full text-left p-3 rounded-xl border text-xs font-semibold uppercase tracking-wider flex items-center justify-between transition-all ${
                        newStatus === st
                          ? 'bg-wow text-white border-wow'
                          : 'bg-surface-light border-surface-border text-ivory hover:border-ivory/30'
                      }`}
                    >
                      <span>{st}</span>
                      {newStatus === st && <Check className="w-4 h-4 text-white" />}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-ivory-dim mb-2">
                  Public Calendar Note (Optional)
                </label>
                <textarea
                  rows={2}
                  value={dateNote}
                  onChange={(e) => setDateNote(e.target.value)}
                  placeholder="e.g. 1 creator crew remaining for Vrindavan/Mathura"
                  className="w-full px-3 py-2 rounded-xl bg-surface-light border border-surface-border text-xs text-ivory focus:outline-none focus:border-wow resize-none"
                />
              </div>

              <button
                onClick={handleUpdateDateStatus}
                className="w-full py-3 rounded-full bg-wow hover:bg-wow-hover text-white text-xs uppercase font-bold tracking-widest shadow-lg shadow-wow/30 transition-all flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" /> Save Date Status
              </button>

              <div className="p-3.5 rounded-xl bg-surface-light border border-white/5 text-[11px] text-ivory-dim">
                💡 Only approved dates will show on the public calendar. Public visitors will not see customer names or private details.
              </div>
            </div>
          </div>
        )}

        {/* MODULE 3: ENQUIRIES MANAGER */}
        {activeTab === 'enquiries' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Filter Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-surface border border-surface-border">
              <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
                {['ALL', 'NEW', 'CONTACTED', 'CONFIRMED', 'DECLINED'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setEnquiryFilter(st)}
                    className={`px-3 py-1.5 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all ${
                      enquiryFilter === st
                        ? 'bg-wow text-white'
                        : 'bg-surface-light text-ivory-dim hover:text-white'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 text-ivory-dim absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchEnquiry}
                  onChange={(e) => setSearchEnquiry(e.target.value)}
                  placeholder="Search name, phone, venue..."
                  className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-surface-light border border-surface-border text-xs text-ivory focus:outline-none focus:border-wow"
                />
              </div>
            </div>

            {/* Enquiries Master-Detail Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* List */}
              <div className="lg:col-span-5 space-y-3 max-h-[700px] overflow-y-auto pr-1">
                {enquiries
                  .filter((e) => (enquiryFilter === 'ALL' || e.status === enquiryFilter) &&
                    (e.name.toLowerCase().includes(searchEnquiry.toLowerCase()) ||
                     e.partner_name.toLowerCase().includes(searchEnquiry.toLowerCase()) ||
                     e.city_venue.toLowerCase().includes(searchEnquiry.toLowerCase()) ||
                     e.whatsapp_number.includes(searchEnquiry)))
                  .map((e) => (
                    <div
                      key={e.id}
                      onClick={() => setSelectedEnquiry(e)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                        selectedEnquiry?.id === e.id
                          ? 'bg-wow/10 border-wow ring-1 ring-wow'
                          : 'bg-surface border-surface-border hover:border-ivory/30'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-mono text-[11px] font-bold text-wow">{e.enquiry_number}</span>
                        <Badge status={e.status} />
                      </div>
                      <h4 className="font-display font-bold text-sm text-ivory">
                        {e.name} & {e.partner_name}
                      </h4>
                      <p className="text-xs text-ivory-dim mt-0.5">
                        {e.wedding_date} · {e.city_venue}
                      </p>
                      <div className="mt-2 text-[11px] text-ivory-muted font-medium">
                        {e.preferred_package}
                      </div>
                    </div>
                  ))}
              </div>

              {/* Detail Card */}
              <div className="lg:col-span-7">
                {selectedEnquiry ? (
                  <div className="p-8 rounded-3xl bg-surface border border-surface-border space-y-6">
                    <div className="flex justify-between items-start pb-4 border-b border-surface-border">
                      <div>
                        <span className="font-mono text-xs text-wow font-bold">{selectedEnquiry.enquiry_number}</span>
                        <h3 className="font-display font-bold text-2xl text-ivory mt-1">
                          {selectedEnquiry.name} & {selectedEnquiry.partner_name}
                        </h3>
                        <p className="text-xs text-ivory-dim mt-0.5">
                          Submitted on {format(new Date(selectedEnquiry.created_at), 'PPP')}
                        </p>
                      </div>
                      <Badge status={selectedEnquiry.status} />
                    </div>

                    {/* Quick Contacts */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-3.5 rounded-xl bg-surface-light border border-surface-border">
                        <span className="text-[10px] uppercase text-ivory-dim font-semibold block mb-1">WhatsApp</span>
                        <a
                          href={`https://wa.me/${selectedEnquiry.whatsapp_number.replace(/\D/g, '')}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs font-mono font-bold text-emerald-400 hover:underline flex items-center gap-1.5"
                        >
                          <MessageCircle className="w-3.5 h-3.5" /> {selectedEnquiry.whatsapp_number}
                        </a>
                      </div>
                      <div className="p-3.5 rounded-xl bg-surface-light border border-surface-border">
                        <span className="text-[10px] uppercase text-ivory-dim font-semibold block mb-1">Email</span>
                        <a href={`mailto:${selectedEnquiry.email}`} className="text-xs text-white hover:underline">
                          {selectedEnquiry.email}
                        </a>
                      </div>
                    </div>

                    {/* Wedding Details */}
                    <div className="space-y-3 text-xs">
                      <div className="flex justify-between py-2 border-b border-white/5">
                        <span className="text-ivory-dim">Primary Wedding Date</span>
                        <span className="text-white font-medium">{selectedEnquiry.wedding_date}</span>
                      </div>
                      {selectedEnquiry.additional_dates && selectedEnquiry.additional_dates.length > 0 && (
                        <div className="flex justify-between py-2 border-b border-white/5">
                          <span className="text-ivory-dim">Additional Dates</span>
                          <span className="text-amber-400 font-medium">{selectedEnquiry.additional_dates.join(', ')}</span>
                        </div>
                      )}
                      <div className="flex justify-between py-2 border-b border-white/5">
                        <span className="text-ivory-dim">City / Venue</span>
                        <span className="text-white font-medium">{selectedEnquiry.city_venue}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-white/5">
                        <span className="text-ivory-dim">Functions</span>
                        <span className="text-white">{selectedEnquiry.number_of_functions} function(s)</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-white/5">
                        <span className="text-ivory-dim">Selected Package</span>
                        <span className="text-wow font-bold">{selectedEnquiry.preferred_package}</span>
                      </div>
                    </div>

                    {/* Customer Message */}
                    {selectedEnquiry.message && (
                      <div className="p-4 rounded-xl bg-surface-light border border-white/5 text-xs text-ivory-muted">
                        <strong className="text-white block mb-1">Client Message:</strong>
                        {selectedEnquiry.message}
                      </div>
                    )}

                    {/* Admin Notes */}
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-semibold text-ivory-dim mb-2">
                        Studio Admin Notes
                      </label>
                      <textarea
                        rows={3}
                        defaultValue={selectedEnquiry.admin_notes || ''}
                        onBlur={(e) => handleUpdateEnquiry(selectedEnquiry.id, selectedEnquiry.status, e.target.value)}
                        placeholder="Add private discussion notes, quotes given, deposit status..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-surface-light border border-surface-border text-xs text-ivory focus:outline-none focus:border-wow resize-none"
                      />
                    </div>

                    {/* Status Action Buttons */}
                    <div className="pt-4 border-t border-surface-border flex flex-wrap gap-2">
                      <button
                        onClick={() => handleUpdateEnquiry(selectedEnquiry.id, 'CONTACTED')}
                        className="px-4 py-2 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 border border-purple-500/30 text-purple-400 text-xs font-semibold"
                      >
                        Mark Contacted
                      </button>
                      <button
                        onClick={() => {
                          handleUpdateEnquiry(selectedEnquiry.id, 'CONFIRMED');
                          adminService.setDateAvailability(selectedEnquiry.wedding_date, 'BOOKED', `Booked for ${selectedEnquiry.name}`);
                        }}
                        className="px-4 py-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-400 text-xs font-semibold"
                      >
                        Confirm & Lock Date
                      </button>
                      <button
                        onClick={() => handleUpdateEnquiry(selectedEnquiry.id, 'DECLINED')}
                        className="px-4 py-2 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-400 text-xs font-semibold"
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-12 text-center text-xs text-ivory-dim bg-surface rounded-3xl border border-surface-border">
                    Select an enquiry to view full details
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* MODULE 4: CONSULTATIONS MANAGER */}
        {activeTab === 'consultations' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="p-6 md:p-8 rounded-3xl bg-surface border border-surface-border">
              <h3 className="font-display font-bold text-xl text-ivory mb-6">
                Consultation Appointments (IST Asia/Kolkata)
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-ivory-muted min-w-[700px]">
                  <thead>
                    <tr className="border-b border-surface-border text-ivory uppercase tracking-wider">
                      <th className="py-3 px-3">Ref ID</th>
                      <th className="py-3 px-3">Date & Time (IST)</th>
                      <th className="py-3 px-3">Client</th>
                      <th className="py-3 px-3">Contact</th>
                      <th className="py-3 px-3">Package</th>
                      <th className="py-3 px-3">Status</th>
                      <th className="py-3 px-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {consultations.map((c) => (
                      <tr key={c.id}>
                        <td className="py-3 px-3 font-mono font-bold text-wow">{c.booking_number}</td>
                        <td className="py-3 px-3 text-white font-medium">
                          {c.date}<br />
                          <span className="text-[11px] text-ivory-dim font-mono">{c.time_slot}</span>
                        </td>
                        <td className="py-3 px-3 text-ivory font-semibold">{c.name}</td>
                        <td className="py-3 px-3">
                          <a
                            href={`https://wa.me/${c.whatsapp_number.replace(/\D/g, '')}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-emerald-400 hover:underline font-mono"
                          >
                            {c.whatsapp_number}
                          </a>
                        </td>
                        <td className="py-3 px-3 text-white">{c.preferred_package}</td>
                        <td className="py-3 px-3">
                          <Badge status={c.status} />
                        </td>
                        <td className="py-3 px-3 text-right space-x-2">
                          {c.status === 'PENDING' && (
                            <button
                              onClick={() => handleUpdateConsultation(c.id, 'CONFIRMED')}
                              className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-black font-semibold text-[10px] uppercase"
                            >
                              Confirm
                            </button>
                          )}
                          {c.status !== 'COMPLETED' && (
                            <button
                              onClick={() => handleUpdateConsultation(c.id, 'COMPLETED')}
                              className="px-2.5 py-1 rounded bg-surface-light text-ivory hover:text-white font-semibold text-[10px] uppercase"
                            >
                              Complete
                            </button>
                          )}
                          {c.status !== 'CANCELLED' && (
                            <button
                              onClick={() => handleUpdateConsultation(c.id, 'CANCELLED')}
                              className="px-2.5 py-1 rounded bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white font-semibold text-[10px] uppercase"
                            >
                              Cancel
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* MODULE 5: STUDIO SETTINGS */}
        {activeTab === 'settings' && settings && (
          <div className="max-w-3xl mx-auto p-8 rounded-3xl bg-surface border border-surface-border animate-in fade-in duration-300">
            <h3 className="font-display font-bold text-2xl text-ivory uppercase mb-2">
              Studio Configuration & Settings
            </h3>
            <p className="text-xs text-ivory-dim mb-8">
              Manage studio phone numbers, booking rules, and consultation operating hours.
            </p>

            <form onSubmit={handleSaveSettings} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-ivory-dim mb-2">
                    Primary Phone (Calls & WhatsApp)
                  </label>
                  <input
                    type="text"
                    value={settings.business_info.primary_phone}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        business_info: { ...settings.business_info, primary_phone: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-light border border-surface-border text-xs text-ivory focus:outline-none focus:border-wow"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-ivory-dim mb-2">
                    Secondary Phone (Alternate)
                  </label>
                  <input
                    type="text"
                    value={settings.business_info.secondary_phone}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        business_info: { ...settings.business_info, secondary_phone: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-light border border-surface-border text-xs text-ivory focus:outline-none focus:border-wow"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-ivory-dim mb-2">
                  Studio Location Address
                </label>
                <input
                  type="text"
                  value={settings.business_info.location}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      business_info: { ...settings.business_info, location: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-light border border-surface-border text-xs text-ivory focus:outline-none focus:border-wow"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-ivory-dim mb-2">
                    Consultation Duration (Minutes)
                  </label>
                  <select
                    value={settings.consultation_rules.slot_duration_minutes}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        consultation_rules: {
                          ...settings.consultation_rules,
                          slot_duration_minutes: Number(e.target.value),
                        },
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-light border border-surface-border text-xs text-ivory focus:outline-none focus:border-wow"
                  >
                    <option value={15}>15 Minutes</option>
                    <option value={30}>30 Minutes</option>
                    <option value={45}>45 Minutes</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-ivory-dim mb-2">
                    Timezone
                  </label>
                  <input
                    type="text"
                    disabled
                    value={settings.business_info.timezone}
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-light/40 border border-surface-border text-xs text-ivory-dim cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-surface-border flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-wow hover:bg-wow-hover text-white text-xs uppercase font-bold tracking-widest transition-all"
                >
                  Save Settings
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};
