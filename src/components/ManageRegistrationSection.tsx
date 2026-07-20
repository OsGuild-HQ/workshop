import React, { useState, useEffect } from 'react';
import { createClient } from '../utils/supabase/client';
import { ArrowLeft, Search, CheckCircle, XCircle, LogOut, Download, Loader2, ShieldAlert, Sun, Moon } from 'lucide-react';
import Button from './ui/Button';

interface RegistrationRecord {
  ticket_id: number;
  created_at: string;
  full_name: string;
  email: string;
  github: string;
  phone_number: number | null;
  gender: string;
  occupation: string;
  Affiliation: string;
  bus: string;
  block_quest: string;
  Refreshment: string;
  checked_in: boolean;
}

interface ManageRegistrationProps {
  isDarkBg: boolean;
  toggleTheme: () => void;
}

const ManageRegistrationSection: React.FC<ManageRegistrationProps> = ({ isDarkBg, toggleTheme }) => {
  const supabase = createClient();

  // Auth & role state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userUniversity, setUserUniversity] = useState<string>('ADMIN');
  const [loginError, setLoginError] = useState('');
  const [authenticating, setAuthenticating] = useState(false);

  // Dashboard state
  const [records, setRecords] = useState<RegistrationRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'checked' | 'pending' | 'student' | 'professional'>('all');
  const [updatingTicket, setUpdatingTicket] = useState<number | null>(null);

  // Helper function to resolve university code to target institution name
  const getTargetInstitution = (code: string): string | null => {
    const normalized = (code || '').trim().toUpperCase();
    if (normalized === 'ADMIN' || normalized === 'ALL' || !normalized) return null;
    if (normalized === 'MDX' || normalized.includes('MIDDLESEX')) return 'Middlesex University';
    if (normalized === 'UOM' || normalized.includes('MAURITIUS')) return 'University of Mauritius';
    if (normalized === 'ALCHE') return 'ALCHE';
    if (normalized === 'CURTIN') return 'Curtin Mauritius';
    return code;
  };

  // Check login session on mount
  useEffect(() => {
    const session = localStorage.getItem('genesis-admin-session');
    if (session) {
      try {
        const parsed = JSON.parse(session);
        setUserUniversity(parsed.university || 'ADMIN');
      } catch (e) {
        setUserUniversity('ADMIN');
      }
      setIsLoggedIn(true);
      fetchRegistrations();
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setLoginError('Username and password are required');
      return;
    }

    setAuthenticating(true);
    setLoginError('');

    try {
      const { data, error } = await supabase
        .from('login')
        .select('*')
        .eq('username', username.trim())
        .eq('password', password.trim())
        .maybeSingle();

      if (error) {
        console.error('Login database error:', error);
        setLoginError('Database authentication error. Check RLS policies.');
      } else if (data) {
        setIsLoggedIn(true);
        const uni = data.university || 'ADMIN';
        setUserUniversity(uni);
        localStorage.setItem('genesis-admin-session', JSON.stringify({
          username: data.username,
          university: uni
        }));
        fetchRegistrations();
      } else {
        setLoginError('Invalid username or password');
      }
    } catch (err) {
      console.error('Unexpected auth error:', err);
      setLoginError('An unexpected error occurred during login');
    } finally {
      setAuthenticating(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('genesis-admin-session');
    setIsLoggedIn(false);
    setRecords([]);
  };

  const fetchRegistrations = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const { data, error } = await supabase
        .from('Registration')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Failed to load registrations:', error);
        setErrorMsg('Error reading Registration data. Make sure table RLS has select enabled.');
      } else if (data) {
        // Coerce checked_in to boolean, handling null values safely
        const sanitized: RegistrationRecord[] = data.map((item: any) => ({
          ...item,
          checked_in: !!item.checked_in
        }));
        setRecords(sanitized);
      }
    } catch (err) {
      console.error('Unexpected fetch error:', err);
      setErrorMsg('Failed to query Supabase database.');
    } finally {
      setLoading(false);
    }
  };

  const toggleCheckIn = async (ticketId: number, currentStatus: boolean) => {
    setUpdatingTicket(ticketId);
    try {
      const newStatus = !currentStatus;
      const { error } = await supabase
        .from('Registration')
        .update({ checked_in: newStatus })
        .eq('ticket_id', ticketId);

      if (error) {
        console.error('Check-in status update failed:', error);
        alert('Failed to update check-in status in database.');
      } else {
        setRecords(prev =>
          prev.map(rec => (rec.ticket_id === ticketId ? { ...rec, checked_in: newStatus } : rec))
        );
      }
    } catch (err) {
      console.error('Unexpected update error:', err);
    } finally {
      setUpdatingTicket(null);
    }
  };

  // CSV Export utility
  const exportToCSV = () => {
    if (scopedRecords.length === 0) return;
    
    const headers = ['Ticket ID', 'Registered On', 'Full Name', 'Email', 'GitHub', 'Phone', 'Gender', 'Affiliation', 'Occupation/Institution', 'Bus Pickup', 'Block Quest', 'Dietary Pref', 'Checked In'];
    const rows = scopedRecords.map(rec => [
      rec.ticket_id,
      new Date(rec.created_at).toLocaleString(),
      `"${rec.full_name.replace(/"/g, '""')}"`,
      rec.email,
      rec.github || '',
      rec.phone_number || '',
      rec.gender,
      rec.Affiliation,
      `"${rec.occupation.replace(/"/g, '""')}"`,
      rec.bus,
      rec.block_quest,
      `"${rec.Refreshment.replace(/"/g, '""')}"`,
      rec.checked_in ? 'Yes' : 'No'
    ]);

    const csvContent = [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `OSGuild_Genesis_Registrations_${userUniversity}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // University-scoped dataset (ADMIN sees all, MDX / UOM / ALCHE see their own institution)
  const targetInstitution = getTargetInstitution(userUniversity);

  const scopedRecords = records.filter(rec => {
    if (!targetInstitution) return true; // ADMIN
    return rec.occupation.toLowerCase().includes(targetInstitution.toLowerCase());
  });

  // Filtered dataset for active search and tabs
  const filteredRecords = scopedRecords.filter(rec => {
    // 1. Search term match
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
      rec.full_name.toLowerCase().includes(searchLower) ||
      rec.email.toLowerCase().includes(searchLower) ||
      (rec.github && rec.github.toLowerCase().includes(searchLower)) ||
      rec.ticket_id.toString().includes(searchLower);

    if (!matchesSearch) return false;

    // 2. Filter tabs match
    switch (filterType) {
      case 'checked': return rec.checked_in === true;
      case 'pending': return rec.checked_in === false;
      case 'student': return rec.Affiliation === 'Student';
      case 'professional': return rec.Affiliation === 'Professional';
      default: return true;
    }
  });

  // Calculate statistics based on scoped records
  const totalRegistered = scopedRecords.length;
  const totalCheckedIn = scopedRecords.filter(r => r.checked_in).length;
  const totalStudents = scopedRecords.filter(r => r.Affiliation === 'Student').length;
  const totalProfessionals = scopedRecords.filter(r => r.Affiliation === 'Professional').length;
  const checkInRate = totalRegistered > 0 ? Math.round((totalCheckedIn / totalRegistered) * 100) : 0;

  // Login view
  if (!isLoggedIn) {
    return (
      <section className="py-20 md:py-28 max-w-[480px] mx-auto px-4 relative overflow-hidden flex items-center justify-center min-h-[90vh]">
        <nav className="absolute left-0 top-0 z-50 flex w-full items-center justify-between p-4 md:p-8 font-mono">
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.location.hash = ''; }}
            className="flex items-center gap-2 border border-[var(--color-line)] bg-[var(--color-glass)] px-4 py-2 text-[var(--color-ink)] hover:bg-[var(--color-glass-strong)] transition-all duration-200 rounded-lg font-mono font-bold uppercase tracking-wider text-xs cursor-pointer shadow-[2px_2px_0_0_var(--color-ink)]"
          >
            <ArrowLeft className="h-4.5 w-4.5" />
            <span>back to home</span>
          </a>
          <button
            onClick={toggleTheme}
            className="p-2 border border-[var(--color-line)] bg-[var(--color-glass)] text-[var(--color-ink)] hover:bg-[var(--color-glass-strong)] transition-all duration-200 rounded-lg cursor-pointer shadow-[2px_2px_0_0_var(--color-ink)]"
            aria-label="Toggle theme"
          >
            {isDarkBg ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
          </button>
        </nav>

        <div className="w-full p-8 bg-[var(--color-glass)]">
          <h2 className="text-3xl font-black font-heading text-[var(--color-ink)] mb-6 text-center uppercase tracking-tight">
            login
          </h2>
          <p className="text-sm font-mono text-[var(--color-ink-dim)] mb-6 text-center leading-relaxed">
            Please log in with your dashboard credentials to view attendees and scan validation checks.
          </p>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase font-mono tracking-wider text-[var(--color-ink-dim)]">Username</label>
              <input
                type="text"
                autoFocus
                placeholder="Enter admin username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border border-[var(--color-line)] bg-[var(--color-bg-soft)] px-4 py-3 rounded-lg text-sm text-[var(--color-ink)] outline-none focus:border-[var(--color-orange)] font-mono"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase font-mono tracking-wider text-[var(--color-ink-dim)]">Password</label>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-[var(--color-line)] bg-[var(--color-bg-soft)] px-4 py-3 rounded-lg text-sm text-[var(--color-ink)] outline-none focus:border-[var(--color-orange)] font-mono"
              />
            </div>

            {loginError && (
              <p className="text-xs font-mono text-red-500 font-bold mt-2">
                ⚠️ {loginError}
              </p>
            )}

            <Button
              variant="primary"
              disabled={authenticating}
              className="w-full mt-4 flex items-center justify-center gap-2 py-3.5"
            >
              {authenticating ? <Loader2 className="w-4.5 h-4.5 animate-spin" /> : 'AUTHENTICATE ADMIN ✓'}
            </Button>
          </form>
        </div>
      </section>
    );
  }

  // Dashboard view
  return (
    <section 
      className="py-16 md:py-24 max-w-[1240px] mx-auto px-4 md:px-8 text-left"
      style={{
        '--color-ink': isDarkBg ? '#ffffff' : '#111827',
        '--color-ink-dim': isDarkBg ? '#8b949e' : '#4b5563',
        '--color-line': isDarkBg ? '#30363d' : '#e5e7eb',
        '--color-bg-soft': isDarkBg ? '#161b22' : '#f3f4f6',
        '--color-glass': isDarkBg ? '#000000' : '#ffffff',
        '--color-glass-strong': isDarkBg ? '#111111' : '#f3f4f6',
        color: isDarkBg ? '#ffffff' : '#111827'
      } as React.CSSProperties}
    >
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[var(--color-line)] pb-6 mb-8 gap-4 font-mono">
        <div>
          <h1 className="text-3xl font-black font-heading text-[var(--color-ink)] uppercase">
            OSGuild Registrations {targetInstitution ? `(${userUniversity.trim().toUpperCase()})` : '(ADMIN)'} 🛠️
          </h1>
          <p className="text-sm text-[var(--color-ink-dim)] mt-1">
            {targetInstitution 
              ? `Managing attendees for ${targetInstitution}` 
              : 'Manage all registrations, scan check-ins, and export attendee data.'}
          </p>
        </div>
        <div className="flex gap-3 items-center">
          <button
            onClick={toggleTheme}
            className="p-2.5 border border-[var(--color-line)] bg-[var(--color-bg-soft)] text-[var(--color-ink)] hover:bg-[var(--color-glass-strong)] transition-all duration-200 rounded-lg cursor-pointer"
            aria-label="Toggle theme"
          >
            {isDarkBg ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
          </button>
          <Button variant="ghost" onClick={fetchRegistrations} className="px-4 text-xs font-bold font-mono">
            REFRESH DATA ↻
          </Button>
          <Button onClick={handleLogout} className="px-4 py-2 bg-red-600/10 text-red-500 border border-red-500/20 hover:bg-red-600/20 flex items-center gap-1.5 text-xs font-bold font-mono">
            <LogOut size={14} /> LOGOUT
          </Button>
        </div>
      </div>

      {/* Metrics Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 font-mono">
        <div className="border border-[var(--color-line)] bg-[var(--color-bg-soft)] p-5 rounded-xl">
          <span className="text-xs uppercase tracking-wider text-[var(--color-ink-dim)] font-bold">TOTAL REGISTERED</span>
          <h2 className="text-3xl font-black mt-2 text-[var(--color-ink)]">{totalRegistered}</h2>
        </div>
        <div className="border border-[var(--color-line)] bg-[var(--color-bg-soft)] p-5 rounded-xl">
          <span className="text-xs uppercase tracking-wider text-[var(--color-ink-dim)] font-bold">CHECKED IN ATTENDEES</span>
          <h2 className="text-3xl font-black mt-2 text-[var(--color-orange)]">
            {totalCheckedIn} <span className="text-xs text-[var(--color-ink-dim)]">({checkInRate}%)</span>
          </h2>
        </div>
        <div className="border border-[var(--color-line)] bg-[var(--color-bg-soft)] p-5 rounded-xl">
          <span className="text-xs uppercase tracking-wider text-[var(--color-ink-dim)] font-bold">STUDENTS RSVP</span>
          <h2 className="text-3xl font-black mt-2 text-[var(--color-ink)]">{totalStudents}</h2>
        </div>
        <div className="border border-[var(--color-line)] bg-[var(--color-bg-soft)] p-5 rounded-xl">
          <span className="text-xs uppercase tracking-wider text-[var(--color-ink-dim)] font-bold">PROFESSIONALS RSVP</span>
          <h2 className="text-3xl font-black mt-2 text-[var(--color-ink)]">{totalProfessionals}</h2>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-4 mb-6">
        {/* Search */}
        <div className="relative flex-grow max-w-lg">
          <input
            type="text"
            placeholder="Search by name, email, github username, or ticket ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-[var(--color-line)] bg-[var(--color-bg-soft)] rounded-xl outline-none focus:border-[var(--color-orange)] text-sm text-[var(--color-ink)] font-mono"
          />
          <Search className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-[var(--color-ink-dim)]" />
        </div>

        {/* Tab filters & export */}
        <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
          <div className="flex border border-[var(--color-line)] rounded-lg overflow-hidden bg-[var(--color-glass)]">
            {(['all', 'checked', 'pending', 'student', 'professional'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilterType(tab)}
                className={`px-4 py-2.5 font-bold uppercase transition-colors cursor-pointer border-r border-[var(--color-line)] last:border-r-0 ${
                  filterType === tab 
                    ? 'bg-[var(--color-orange)] text-[var(--color-bg-soft)]' 
                    : 'text-[var(--color-ink-dim)] hover:text-[var(--color-ink)] hover:bg-[var(--color-glass-strong)]'
                }`}
              >
                {tab === 'checked' ? 'Checked In' : tab === 'pending' ? 'Pending' : tab}
              </button>
            ))}
          </div>

          <Button 
            onClick={exportToCSV}
            disabled={filteredRecords.length === 0}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-[var(--color-bg-soft)] text-xs font-bold border border-[var(--color-line)] rounded-lg font-mono hover:bg-[var(--color-glass-strong)] cursor-pointer"
          >
            <Download size={14} /> EXPORT CSV
          </Button>
        </div>
      </div>

      {/* Main Registrations Area */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 font-mono text-sm text-[var(--color-ink-dim)]">
          <Loader2 className="w-8 h-8 animate-spin text-[var(--color-orange)] mb-4" />
          <span>Syncing with Supabase datastore...</span>
        </div>
      ) : errorMsg ? (
        <div className="border border-red-500/20 bg-red-500/5 p-6 rounded-xl flex items-start gap-4 max-w-xl font-mono text-sm">
          <ShieldAlert className="text-red-500 shrink-0 mt-0.5" size={24} />
          <div>
            <h4 className="font-bold text-red-500">Database Query Failed</h4>
            <p className="text-xs text-[var(--color-ink-dim)] mt-1.5 leading-relaxed">
              {errorMsg}
            </p>
            <Button variant="ghost" onClick={fetchRegistrations} className="mt-4 border border-red-500/20 text-red-500 hover:bg-red-500/10 text-xs px-4">
              TRY AGAIN
            </Button>
          </div>
        </div>
      ) : filteredRecords.length === 0 ? (
        <div className="border-dashed border-2 border-[var(--color-line)] bg-[var(--color-glass)] rounded-xl py-16 text-center font-mono text-sm text-[var(--color-ink-dim)]">
          No attendee records found matching your filters.
        </div>
      ) : (
        <div className="w-full border border-[var(--color-line)] rounded-xl overflow-hidden bg-[var(--color-glass)] backdrop-blur-sm">
          {/* Scrollable table container */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse font-mono text-xs">
              <thead>
                <tr className="bg-[var(--color-bg-soft)] border-b border-[var(--color-line)] text-[var(--color-ink-dim)] font-bold">
                  <th className="py-4 px-6">Ticket ID</th>
                  <th className="py-4 px-6">Full Name</th>
                  <th className="py-4 px-6">Email / GitHub</th>
                  <th className="py-4 px-6">Phone Number</th>
                  <th className="py-4 px-6">Affiliation / Inst.</th>
                  <th className="py-4 px-6 text-center">Check-In Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-line)]">
                {filteredRecords.map((rec) => (
                  <tr key={rec.ticket_id} className="hover:bg-[var(--color-bg-soft)]/40 transition-colors">
                    <td className="py-4 px-6 font-bold text-[var(--color-orange)]">
                      {rec.ticket_id}
                    </td>
                    <td className="py-4 px-6 font-bold text-[var(--color-ink)]">
                      {rec.full_name}
                      <span className="text-[10px] block text-[var(--color-ink-dim)] mt-0.5">
                        {rec.gender}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-[var(--color-ink-dim)] max-w-[200px] truncate">
                      <div>{rec.email}</div>
                      {rec.github && (
                        <div className="text-[10px] text-[var(--color-orange)] mt-0.5">
                          git: @{rec.github}
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-6 text-[var(--color-ink-dim)]">
                      {rec.phone_number || '—'}
                    </td>
                    <td className="py-4 px-6 text-[var(--color-ink-dim)]">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        rec.Affiliation === 'Student' 
                          ? 'bg-blue-500/10 text-blue-500' 
                          : 'bg-purple-500/10 text-purple-500'
                      }`}>
                        {rec.Affiliation}
                      </span>
                      {rec.occupation && (
                        <div className="text-[10px] truncate text-[var(--color-ink-dim)] mt-1.5" title={rec.occupation}>
                          {rec.occupation}
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        {rec.checked_in ? (
                          <>
                            <CheckCircle className="text-[var(--color-orange)]" size={16} />
                            <span className="text-[10px] text-[var(--color-orange)] font-bold">ATTENDED</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="text-[var(--color-ink-dim)] opacity-40" size={16} />
                            <span className="text-[10px] text-[var(--color-ink-dim)]">PENDING</span>
                          </>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <Button
                        onClick={() => toggleCheckIn(rec.ticket_id, rec.checked_in)}
                        disabled={updatingTicket === rec.ticket_id}
                        className={`px-3 py-1.5 text-[10px] font-bold tracking-wider rounded-md transition-all ${
                          rec.checked_in
                            ? 'bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20'
                            : 'bg-[var(--color-orange)] text-[var(--color-bg-soft)] border border-[var(--color-ink)] hover:opacity-90'
                        }`}
                      >
                        {updatingTicket === rec.ticket_id ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin mx-auto" />
                        ) : rec.checked_in ? (
                          'CANCEL ✓'
                        ) : (
                          'CHECK IN ✓'
                        )}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
};

export default ManageRegistrationSection;
