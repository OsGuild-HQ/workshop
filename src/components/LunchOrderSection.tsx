import React, { useState, useEffect } from 'react';
import { createClient } from '../utils/supabase/client';
import { ArrowLeft, Search, Sun, Moon, Loader2, Utensils, Ticket, AlertCircle } from 'lucide-react';
import Button from './ui/Button';
import osguildLogo from '../assets/osguild.png';
import bitdevsLogoBlack from '../assets/bitdevs-black.png';
import bitdevsLogoWhite from '../assets/bitdevs-white.png';
import btrustLogoBlack from '../assets/Btrust-black.png';
import btrustLogoWhite from '../assets/Btrust-white.png';

interface LunchOrderSectionProps {
  isDarkBg?: boolean;
  toggleTheme?: () => void;
}

export interface MenuItem {
  id: string;
  name: string;
  categoryGroup: 'wraps-baguettes' | 'burgers-salads' | 'specialty' | 'dessert';
  categoryLabel: string;
  tag: string;
  desc: string;
  emoji: string;
  totalQty: number;
}

export const MENU_ITEMS: MenuItem[] = [
  // Wraps & Baguettes
  {
    id: 'tokyo-twist-wrap',
    name: 'Tokyo Twist Wrap',
    categoryGroup: 'wraps-baguettes',
    categoryLabel: 'Wraps & Baguettes',
    tag: 'Chicken Tenders',
    desc: 'Golden-fried chicken tenders glazed in rich teriyaki sauce, wrapped with fresh lettuce, crunchy slaw, and a touch of Kewpie mayo in a soft tortilla.',
    emoji: '🌯',
    totalQty: 12
  },
  {
    id: 'spicy-chicken-wrap',
    name: 'Spicy Chicken Wrap',
    categoryGroup: 'wraps-baguettes',
    categoryLabel: 'Wraps & Baguettes',
    tag: 'Spicy Chicken',
    desc: 'A toasted wrap filled with tender spiced chicken, fresh salad, and fiery jalapeños for an extra kick.',
    emoji: '🌶️',
    totalQty: 5
  },
  {
    id: 'teriyaki-baguette',
    name: 'Chicken Teriyaki Baguette',
    categoryGroup: 'wraps-baguettes',
    categoryLabel: 'Wraps & Baguettes',
    tag: 'Crusty Baguette',
    desc: 'Tender chicken coated in teriyaki sauce, served in a fresh crusty baguette.',
    emoji: '🥖',
    totalQty: 8
  },
  {
    id: 'roast-veg-wrap',
    name: 'Roast Veg Wrap (Vegetarian)',
    categoryGroup: 'wraps-baguettes',
    categoryLabel: 'Wraps & Baguettes',
    tag: 'Vegetarian',
    desc: 'A warm toasted wrap filled with roasted seasonal vegetables and a light dressing.',
    emoji: '🥬',
    totalQty: 1
  },
  // Burgers & Salads
  {
    id: 'samurai-burger',
    name: 'The Last Samurai Burger',
    categoryGroup: 'burgers-salads',
    categoryLabel: 'Burgers & Salads',
    tag: 'Crispy Schnitzel',
    desc: 'Crispy chicken schnitzel topped with Asian slaw, Kewpie mayo, pickled ginger, and jalapeños, served with a choice of fries or side salad.',
    emoji: '🍔',
    totalQty: 4
  },
  {
    id: 'caesar-salad',
    name: 'Chicken Caesar Salad',
    categoryGroup: 'burgers-salads',
    categoryLabel: 'Burgers & Salads',
    tag: 'Fresh Greens',
    desc: 'Grilled chicken served on crisp greens, topped with Parmesan cheese and herbed croutons, accompanied by a whipped anchovy dressing.',
    emoji: '🥗',
    totalQty: 3
  },
  // Specialty / Custom Request
  {
    id: 'gluten-free-meal',
    name: 'Gluten-Free Meal (Custom Request)',
    categoryGroup: 'specialty',
    categoryLabel: 'Special Dietary Request',
    tag: 'Gluten-Free',
    desc: 'A customized gluten-free meal prepared specially by the kitchen to accommodate dietary requirements.',
    emoji: '🌾',
    totalQty: 1
  },
  // Waffle & Dessert
  {
    id: 'waffle-build',
    name: 'Build Your Own Waffle',
    categoryGroup: 'dessert',
    categoryLabel: 'Waffles & Desserts',
    tag: 'Sweet Waffle',
    desc: 'Freshly baked waffle served plain, with optional toppings available separately (e.g., chocolate sauce, honey, Nutella, whipped cream, berries).',
    emoji: '🧇',
    totalQty: 3
  }
];

const supabase = createClient();

const LunchOrderSection: React.FC<LunchOrderSectionProps> = ({ isDarkBg = false, toggleTheme }) => {
  const [emailInput, setEmailInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [lookupError, setLookupError] = useState('');
  const [attendee, setAttendee] = useState<any>(null);

  // Stock inventory tracking state
  const [itemCounts, setItemCounts] = useState<Record<string, number>>({});
  
  // Order selection state
  const [selectedMeal, setSelectedMeal] = useState<string>('tokyo-twist-wrap');
  const [savingOrder, setSavingOrder] = useState(false);
  const [claimedVoucher, setClaimedVoucher] = useState<any>(null);
  const [orderError, setOrderError] = useState('');

  // Fetch claimed stock counts from Supabase 'lunch' table
  const fetchStockCounts = async () => {
    try {
      const { data, error } = await supabase
        .from('lunch')
        .select('item');

      if (!error && data) {
        const counts: Record<string, number> = {};
        data.forEach((row: { item: string }) => {
          if (row.item) {
            counts[row.item] = (counts[row.item] || 0) + 1;
          }
        });
        setItemCounts(counts);
      }
    } catch (err) {
      console.warn('Could not fetch stock counts:', err);
    }
  };

  useEffect(() => {
    fetchStockCounts();
  }, []);

  // Check saved order on attendee load
  useEffect(() => {
    if (attendee) {
      const savedKey = `genesis-lunch-voucher-${attendee.ticket_id}`;
      const existing = localStorage.getItem(savedKey);
      if (existing) {
        try {
          setClaimedVoucher(JSON.parse(existing));
        } catch (e) {
          // ignore
        }
      }
    }
  }, [attendee]);

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) {
      setLookupError('Please enter your registered email address');
      return;
    }

    setLoading(true);
    setLookupError('');
    setAttendee(null);
    setClaimedVoucher(null);

    try {
      const searchEmail = emailInput.trim().toLowerCase();
      
      // Query Supabase Registration table
      const { data, error } = await supabase
        .from('Registration')
        .select('*')
        .ilike('email', searchEmail)
        .maybeSingle();

      if (error) {
        console.error('Supabase lookup error:', error);
      }

      if (data) {
        setAttendee(data);

        // Check if 'lunch' table already has orders for this email
        try {
          const { data: existingLunch } = await supabase
            .from('lunch')
            .select('*')
            .ilike('email', searchEmail);

          if (existingLunch && existingLunch.length > 0) {
            const mealRow = existingLunch[0];
            const matchedItem = MENU_ITEMS.find(m => m.name === mealRow.item);
            setClaimedVoucher({
              voucherCode: `LV-${data.ticket_id}`,
              ticketId: data.ticket_id,
              name: data.full_name,
              email: data.email,
              mealName: mealRow.item,
              mealEmoji: matchedItem?.emoji || '🍱',
              mealTag: matchedItem?.tag || 'Lunch Item',
              timestamp: mealRow.created_at || new Date().toISOString()
            });
          }
        } catch (e) {
          console.warn('Could not query lunch table:', e);
        }

        setLoading(false);
        return;
      }

      // Fallback to localStorage registered list
      const saved = localStorage.getItem('genesis-registrations');
      if (saved) {
        const list = JSON.parse(saved);
        const match = list.find((item: any) => item.email && item.email.toLowerCase() === searchEmail);
        if (match) {
          setAttendee({
            ticket_id: match.id,
            full_name: match.name,
            email: match.email,
            Affiliation: match.affiliation,
            Refreshment: match.dietary || 'No preference'
          });
          setLoading(false);
          return;
        }
      }

      setLookupError('No registration found with this email. Please check your email or complete your registration first.');
    } catch (err) {
      console.error('Unexpected lookup error:', err);
      setLookupError('An error occurred during lookup. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmOrder = async () => {
    if (!attendee) return;
    setOrderError('');
    setSavingOrder(true);

    const mealObj = MENU_ITEMS.find(m => m.id === selectedMeal) || MENU_ITEMS[0];
    
    // Check remaining stock
    const claimedCount = itemCounts[mealObj.name] || 0;
    const remaining = mealObj.totalQty - claimedCount;

    if (remaining <= 0) {
      setOrderError(`Sorry, "${mealObj.name}" is now sold out! Please select another option.`);
      setSavingOrder(false);
      return;
    }

    // Check if an order already exists for this email in Supabase
    try {
      const { data: existingOrders } = await supabase
        .from('lunch')
        .select('*')
        .ilike('email', attendee.email);

      if (existingOrders && existingOrders.length > 0) {
        setOrderError(`An order has already been claimed for ${attendee.email}. Each attendee is limited to 1 order.`);
        setSavingOrder(false);
        return;
      }
    } catch (e) {
      console.warn('Could not verify existing lunch order:', e);
    }

    const voucherCode = `LV-${attendee.ticket_id}`;
    const voucherData = {
      voucherCode,
      ticketId: attendee.ticket_id,
      name: attendee.full_name,
      email: attendee.email,
      mealName: mealObj.name,
      mealEmoji: mealObj.emoji,
      mealTag: mealObj.tag,
      timestamp: new Date().toISOString()
    };

    // Save locally
    const savedKey = `genesis-lunch-voucher-${attendee.ticket_id}`;
    localStorage.setItem(savedKey, JSON.stringify(voucherData));

    // Save to Supabase 'lunch' table (id, email, item, quantity)
    try {
      const { error: mealErr } = await supabase
        .from('lunch')
        .insert({
          id: attendee.ticket_id,
          email: attendee.email,
          item: mealObj.name,
          quantity: 1
        });

      if (mealErr) {
        console.error('Error inserting into lunch table:', mealErr);
        setOrderError(`Failed to save order: ${mealErr.message}`);
        setSavingOrder(false);
        return;
      }

      // Update Registration table for compatibility
      await supabase
        .from('Registration')
        .update({ Refreshment: mealObj.name })
        .eq('ticket_id', attendee.ticket_id);

      // Refresh live inventory stock counts
      await fetchStockCounts();
    } catch (err: any) {
      console.error('Could not sync lunch order to Supabase:', err);
      setOrderError(`Error saving order: ${err?.message || 'Network error'}`);
      setSavingOrder(false);
      return;
    }

    setClaimedVoucher(voucherData);
    setSavingOrder(false);
  };

  const renderSectionCategory = (
    title: string, 
    group: 'wraps-baguettes' | 'burgers-salads' | 'specialty' | 'dessert', 
    iconEmoji: string
  ) => {
    const items = MENU_ITEMS.filter(m => m.categoryGroup === group);
    if (items.length === 0) return null;

    return (
      <div className="space-y-4 pt-2">
        <h4 className="text-lg font-bold font-heading text-[var(--color-ink)] flex items-center gap-2 border-b border-[var(--color-line)] pb-2">
          <span>{iconEmoji}</span>
          <span>{title}</span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((item) => {
            const isSelected = selectedMeal === item.id;
            const claimed = itemCounts[item.name] || 0;
            const remaining = Math.max(0, item.totalQty - claimed);
            const isSoldOut = remaining <= 0;

            return (
              <div
                key={item.id}
                onClick={() => {
                  if (!isSoldOut) {
                    setSelectedMeal(item.id);
                  }
                }}
                className={`p-5 rounded-2xl border-2 transition-all duration-200 flex flex-col justify-between ${
                  isSoldOut
                    ? 'bg-[var(--color-bg-soft)] border-[var(--color-line)] opacity-50 cursor-not-allowed'
                    : isSelected
                    ? 'bg-[var(--color-glass)] border-[var(--color-orange)] shadow-[4px_4px_0_0_var(--color-orange)] -translate-x-[1px] -translate-y-[1px] cursor-pointer'
                    : 'bg-[var(--color-bg-soft)] border-[var(--color-line)] hover:border-[var(--color-ink-dim)] cursor-pointer'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-3xl select-none">{item.emoji}</span>
                    
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                        isSoldOut
                          ? 'bg-red-500/10 text-red-500 border border-red-500/20'
                          : remaining === 1
                          ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                          : 'bg-green-500/10 text-green-500 border border-green-500/20'
                      }`}>
                        {isSoldOut ? 'SOLD OUT (0 left)' : `${remaining} left`}
                      </span>

                      <span className="px-2 py-0.5 rounded border border-[var(--color-line)] text-[10px] font-mono text-[var(--color-ink-dim)]">
                        {item.tag}
                      </span>
                    </div>
                  </div>

                  <h5 className="font-bold text-base font-heading text-[var(--color-ink)] mb-1">
                    {item.name}
                  </h5>

                  <p className="text-xs text-[var(--color-ink-dim)] font-mono leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <section 
      className="py-16 md:py-24 max-w-[1000px] mx-auto px-4 md:px-8 text-left min-h-[90vh]"
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
      {/* Navigation */}
      <nav className="flex items-center justify-between pb-8 border-b border-[var(--color-line)] mb-8 font-mono">
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.location.hash = ''; }}
          className="flex items-center gap-2 border border-[var(--color-line)] bg-[var(--color-glass)] px-4 py-2 text-[var(--color-ink)] hover:bg-[var(--color-glass-strong)] transition-all duration-200 rounded-lg font-mono font-bold uppercase tracking-wider text-xs cursor-pointer shadow-[2px_2px_0_0_var(--color-ink)]"
        >
          <ArrowLeft className="h-4.5 w-4.5" />
          <span>back to home</span>
        </a>

        {toggleTheme && (
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-lg border border-[var(--color-line)] bg-[var(--color-glass)] text-[var(--color-ink)] hover:bg-[var(--color-glass-strong)] transition-all duration-200 cursor-pointer shadow-[2px_2px_0_0_var(--color-ink)]"
            aria-label="Toggle theme"
          >
            {isDarkBg ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
          </button>
        )}
      </nav>

      {/* Title Header */}
      <div className="mb-10 text-left">
        <div className="flex items-center gap-3 text-[var(--color-orange)] mb-3 font-mono text-sm font-semibold uppercase tracking-wider">
          <Utensils size={24} />
          <span>Genesis Workshop Catering 🍱</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-black font-heading tracking-tight mb-3">
          Lunch Order & Voucher Portal
        </h1>
        <p className="text-sm md:text-base text-[var(--color-ink-dim)] font-mono leading-relaxed max-w-[60ch]">
          Enter your registered email to access your attendee profile, select 1 lunch item from the menu, and generate your digital voucher pass.
        </p>
      </div>

      {/* Step 1: Email Lookup Form */}
      {!attendee && (
        <div className="max-w-xl brutal-card p-8 bg-[var(--color-glass)] border-2 border-[var(--color-ink)] shadow-[6px_6px_0_0_var(--color-orange)] rounded-2xl">
          <h2 className="text-xl font-bold font-heading mb-4 text-[var(--color-ink)] flex items-center gap-2">
            <Ticket className="text-[var(--color-orange)]" size={20} />
            Lookup Attendee Profile
          </h2>
          <form onSubmit={handleLookup} className="space-y-4">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-mono uppercase font-bold tracking-wider text-[var(--color-ink-dim)]">
                Registered Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  autoFocus
                  placeholder="you@example.com"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-[var(--color-line)] bg-[var(--color-bg-soft)] rounded-xl outline-none focus:border-[var(--color-orange)] text-sm text-[var(--color-ink)] font-mono"
                />
                <Search className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-[var(--color-ink-dim)]" />
              </div>
            </div>

            {lookupError && (
              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-mono">
                <AlertCircle size={16} className="shrink-0 mt-0.5" />
                <span>{lookupError}</span>
              </div>
            )}

            <Button
              variant="primary"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'FIND MY PROFILE & VOUCHER →'}
            </Button>
          </form>
        </div>
      )}

      {/* Step 2: Profile & Order Form */}
      {attendee && (
        <div className="space-y-10">
          {/* Profile Card Banner */}
          <div className="p-6 rounded-2xl bg-[var(--color-bg-soft)] border border-[var(--color-line)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 font-mono">
            <div>
              <span className="text-xs text-[var(--color-orange)] font-bold uppercase tracking-widest block mb-1">
                ATTENDEE VERIFIED ✓
              </span>
              <h3 className="text-2xl font-bold font-heading text-[var(--color-ink)]">
                {attendee.full_name}
              </h3>
              <p className="text-xs text-[var(--color-ink-dim)] mt-1">
                {attendee.email} · Ticket #{attendee.ticket_id}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[var(--color-glass-strong)] border border-[var(--color-line)] text-[var(--color-ink)]">
                {attendee.Affiliation || 'Attendee'}
              </span>
              <button
                onClick={() => { setAttendee(null); setEmailInput(''); setClaimedVoucher(null); }}
                className="text-xs text-[var(--color-ink-dim)] underline hover:text-[var(--color-orange)] cursor-pointer"
              >
                Change Email
              </button>
            </div>
          </div>

          {/* If Voucher Already Claimed */}
          {claimedVoucher ? (
            <div className="max-w-xl mx-auto flex flex-col items-center">
              <div className={`w-full max-w-[420px] border-y-0 border-x-[16px] border-[var(--color-orange)] ${isDarkBg ? 'bg-black text-white' : 'bg-white text-black'} p-8 rounded-2xl shadow-xl flex flex-col gap-6 font-sans text-left border border-[var(--color-line)] relative overflow-hidden`}>
                {/* Header */}
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h1 className="font-heading font-black text-xl tracking-tighter uppercase italic text-[var(--color-orange)]">
                      LUNCH VOUCHER 🍱
                    </h1>
                    <h2 className="font-semibold text-xs mt-1 leading-snug">
                      The Genesis Workshop Catering Pass
                    </h2>
                    <p className="text-[10px] text-gray-500 mt-1">Voucher Code: {claimedVoucher.voucherCode}</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold bg-green-500/10 text-green-500 border border-green-500/20 uppercase">
                    CLAIMED ✓
                  </span>
                </div>

                {/* Selected Meal Details */}
                <div className="p-4 rounded-xl bg-[var(--color-bg-soft)] border border-[var(--color-line)] font-mono space-y-2">
                  <span className="text-[10px] uppercase font-bold text-gray-400 block">SELECTED MENU ITEM (QTY: 1)</span>
                  <div className="text-base font-bold text-[var(--color-ink)] flex items-center gap-2">
                    <span>{claimedVoucher.mealEmoji}</span>
                    <span>{claimedVoucher.mealName}</span>
                  </div>
                  {claimedVoucher.mealTag && (
                    <span className="inline-block px-2 py-0.5 rounded bg-[var(--color-line)] text-[10px] font-bold text-gray-500">
                      {claimedVoucher.mealTag}
                    </span>
                  )}
                </div>

                {/* QR Code */}
                <div className="flex justify-center my-1">
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(`Genesis Lunch Voucher: ${claimedVoucher.voucherCode} - ${claimedVoucher.name} - ${claimedVoucher.mealName}`)}&color=${isDarkBg ? 'ffffff' : '000000'}&bgcolor=${isDarkBg ? '000000' : 'ffffff'}`}
                    alt="Voucher QR Code"
                    className="w-[160px] h-[160px] border border-[var(--color-line)] p-2 bg-white dark:bg-black rounded-lg"
                  />
                </div>

                {/* Instructions */}
                <div className="text-[10px] space-y-1 text-gray-500 font-mono">
                  <p>Present this voucher pass at the catering counter during lunch break (1:00 PM MUT).</p>
                  <p className="text-gray-400 mt-3">&lt;3 the OSGuild team</p>
                </div>

                {/* Logos */}
                <div className="flex items-center justify-between border-t border-[var(--color-line)] pt-3 h-8">
                  <img src={isDarkBg ? btrustLogoWhite : btrustLogoBlack} alt="Btrust" className="h-5 w-auto object-contain" />
                  <img src={isDarkBg ? bitdevsLogoWhite : bitdevsLogoBlack} alt="Bitdevs" className="h-5 w-auto object-contain" />
                  <img src={osguildLogo} alt="OSGuild" className="h-5 w-auto object-contain" />
                </div>
              </div>

              <div className="mt-6 flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--color-bg-soft)] border border-[var(--color-line)] text-xs font-mono text-[var(--color-ink-dim)]">
                <span>🔒</span>
                <span>Voucher Issued & Order Locked (Limit: 1 Order Per Email)</span>
              </div>
            </div>
          ) : (
            /* Order Selection Form */
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold font-heading mb-1 text-[var(--color-ink)]">
                  Select 1 Workshop Lunch Option
                </h3>
                <p className="text-xs font-mono text-[var(--color-ink-dim)] mb-6">
                  Each attendee is entitled to 1 lunch order. Real-time stock counts update automatically.
                </p>

                {orderError && (
                  <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-mono flex items-center gap-2">
                    <AlertCircle size={16} />
                    <span>{orderError}</span>
                  </div>
                )}

                {/* Group 1: Wraps & Baguettes */}
                {renderSectionCategory('Wraps & Baguettes', 'wraps-baguettes', '🌯')}

                {/* Group 2: Burgers & Salads */}
                {renderSectionCategory('Burgers & Salads', 'burgers-salads', '🍔')}

                {/* Group 3: Specialty Custom Request */}
                {renderSectionCategory('Special Dietary Request', 'specialty', '🌾')}

                {/* Group 4: Desserts & Waffles */}
                {renderSectionCategory('Waffles & Desserts', 'dessert', '🧇')}
              </div>

              {/* Confirm Action Button */}
              <div className="pt-4 flex justify-end">
                <Button
                  onClick={handleConfirmOrder}
                  disabled={savingOrder}
                  variant="primary"
                  className="px-8 py-3.5 text-sm flex items-center gap-2"
                >
                  {savingOrder ? <Loader2 className="w-4 h-4 animate-spin" /> : 'CONFIRM LUNCH VOUCHER & ORDER 🍱'}
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default LunchOrderSection;
