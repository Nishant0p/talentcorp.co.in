import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, Search, Sparkles, CheckCircle, ArrowRight } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { extractMediaUrl, fetchNews } from '../../utils/strapi';
import localNews from '../../data/localNews';

const defaultUpcomingEvents = [
  {
    id: 'national-skill-development-conference-2026',
    date: '15',
    month: 'APR',
    year: '2026',
    title: 'National Skill Development Conference 2026',
    loc: 'Pune Convention Center',
    desc: 'Bringing together 500+ vocational institutes, HR leaders, and policymakers to discuss NAPS and NATS 2.0 implementation.',
    type: 'Upcoming',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'campus-recruitment-drive-2026',
    date: '22',
    month: 'APR',
    year: '2026',
    title: 'Campus Recruitment Drive - Engineering & Technical College',
    loc: 'Multiple Locations, Maharashtra',
    desc: 'Mass hiring drive for engineering graduates across manufacturing, IT, and automation industries.',
    type: 'Upcoming',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'women-empowerment-skilling-2026',
    date: '01',
    month: 'MAY',
    year: '2026',
    title: 'Women Empowerment & Skill Development Workshop Series',
    loc: 'Mumbai Training Center',
    desc: 'Special skilling initiative empowering young female candidates with industrial apprentice opportunities.',
    type: 'Upcoming',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600',
  },
];

const defaultPastEvents = [
  {
    id: 'outstanding-performance-awards-2026',
    date: '21',
    month: 'JUN',
    year: '2026',
    title: 'Half-Year Outstanding Performance Awards 2026',
    loc: 'TSPL GROUP Head Office, Chakan',
    desc: 'Celebrating top achievements across Compliance, Accounts, Operations, HR, Recruitment, and Digital Marketing teams.',
    type: 'Past',
    image: 'https://images.prismic.io/alphas/aj9_6VbRV8_Qf7oY_IMG_0905.HEIC?auto=format,compress',
  },
  {
    id: 'industry-academia-conclave-2026',
    date: '10',
    month: 'MAR',
    year: '2026',
    title: 'Industry-Academia Conclave 2026',
    loc: 'Hyderabad',
    desc: 'Fostering partnerships between premier universities and manufacturing conglomerates for flexi-MoU programs.',
    type: 'Past',
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'skill-india-partnership-summit',
    date: '25',
    month: 'FEB',
    year: '2026',
    title: 'Skill India Mission Partnership Summit',
    loc: 'New Delhi',
    desc: 'National conference on accelerating skill certification and apprentice stipends across rural sectors.',
    type: 'Past',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'annual-employee-awards-2026',
    date: '14',
    month: 'FEB',
    year: '2026',
    title: 'Annual Employee Awards & Leadership Ceremony',
    loc: 'Pune Headquarters',
    desc: 'Honoring outstanding leadership, 5-year tenure milestones, and top-performing recruiters of TSPL Group.',
    type: 'Past',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=600',
  },
];

const AllEventsPage = () => {
  const [fetchedEvents, setFetchedEvents] = useState([]);
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadEvents = async () => {
      const data = await fetchNews();
      const eventItems = (data || []).filter((item) => item.tag === 'Events' || item.tag === 'Event');
      const localEvents = localNews.filter((item) => item.tag === 'Events' || item.tag === 'Event');

      const normalizedStrapiEvents = [...eventItems, ...localEvents].map((item) => {
        const itemDate = new Date(item.date || Date.now());
        const day = isNaN(itemDate.getDate()) ? '15' : String(itemDate.getDate()).padStart(2, '0');
        const monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        const month = isNaN(itemDate.getMonth()) ? 'JUN' : monthNames[itemDate.getMonth()];
        const year = isNaN(itemDate.getFullYear()) ? '2026' : String(itemDate.getFullYear());

        return {
          id: item.documentId || item.id,
          date: day,
          month: month,
          year: year,
          title: item.title,
          loc: 'TSPL Group Center',
          desc: (item.description || '').replace(/<[^>]*>/g, ' ').slice(0, 140) + '...',
          type: itemDate > new Date() ? 'Upcoming' : 'Past',
          image: item.image ? extractMediaUrl(item.image) : 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600',
        };
      });

      setFetchedEvents(normalizedStrapiEvents);
    };

    loadEvents();
  }, []);

  const allEventList = useMemo(() => {
    const combined = [...fetchedEvents, ...defaultUpcomingEvents, ...defaultPastEvents];
    const unique = [];
    const seen = new Set();
    combined.forEach((item) => {
      const key = item.title.trim().toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        unique.push(item);
      }
    });
    return unique;
  }, [fetchedEvents]);

  const filteredEvents = useMemo(() => {
    return allEventList.filter((event) => {
      const matchesTab = activeTab === 'All' || event.type === activeTab;
      const matchesSearch =
        searchQuery === '' ||
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (event.loc || '').toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [allEventList, activeTab, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 sm:px-8 py-28 sm:py-32">
        {/* Navigation Header */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <Link
            to="/news-events"
            className="inline-flex items-center gap-2 font-semibold text-[#006bb8] hover:text-orange-500 transition-colors"
          >
            <ArrowLeft size={18} />
            Back to News &amp; Events
          </Link>
          <span className="rounded-full bg-orange-100 px-4 py-1 text-xs font-bold uppercase tracking-wider text-orange-600">
            Events Directory • {filteredEvents.length} Events
          </span>
        </div>

        {/* Hero Section */}
        <div className="mb-12 rounded-3xl bg-[#0d1236] p-8 sm:p-12 text-white shadow-xl">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#f7d54b] mb-4">
            <Sparkles size={16} /> All TSPL Events &amp; Conclaves
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-4">
            Upcoming &amp; Past Events
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
            Stay informed about TSPL Group’s upcoming conferences, campus recruitment melas, awards ceremonies, and past summit highlights.
          </p>

          {/* Search & Category Tabs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 bg-white/10 p-1.5 rounded-2xl w-full sm:w-auto">
              {['All', 'Upcoming', 'Past'].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-xl px-6 py-2.5 text-xs font-bold transition-all cursor-pointer ${
                    activeTab === tab
                      ? 'bg-orange-500 text-white shadow-md'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {tab} Events
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-80">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search events or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-2xl bg-white pl-11 pr-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-400 shadow-inner"
              />
            </div>
          </div>
        </div>

        {/* Events Cards Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event, idx) => (
              <Link
                key={`${event.title}-${idx}`}
                to={`/news-events/${event.id}`}
                className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
              >
                <div>
                  {/* Event Thumbnail with Date & Type Overlay */}
                  <div className="relative h-52 overflow-hidden bg-slate-100">
                    <img
                      src={event.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600'}
                      alt={event.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Date Badge Overlay */}
                    <div className="absolute top-4 left-4 flex flex-col items-center justify-center rounded-2xl bg-[#006bb8]/90 backdrop-blur-md px-3.5 py-2 text-white shadow-lg">
                      <span className="text-xl font-black leading-none">{event.date}</span>
                      <span className="text-[10px] font-bold uppercase tracking-wider">{event.month}</span>
                    </div>

                    {/* Type Badge Overlay */}
                    <div className="absolute top-4 right-4">
                      <span className={`rounded-xl px-3 py-1 text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-md ${
                        event.type === 'Upcoming' ? 'bg-emerald-500 text-white' : 'bg-slate-900/80 text-slate-200'
                      }`}>
                        {event.type}
                      </span>
                    </div>
                  </div>

                  {/* Content Container */}
                  <div className="p-6">
                    <div className="mb-2 flex items-center gap-1.5 text-xs font-bold text-slate-400">
                      <MapPin size={14} className="text-orange-500" />
                      <span>{event.loc}</span>
                    </div>
                    <h3 className="text-xl font-bold leading-snug text-slate-900 group-hover:text-orange-500 transition-colors line-clamp-2">
                      {event.title}
                    </h3>
                    {event.desc && (
                      <p className="mt-3 text-xs leading-relaxed text-slate-500 line-clamp-3">
                        {event.desc}
                      </p>
                    )}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="border-t border-slate-100 p-6 pt-4 flex items-center justify-between text-xs font-bold text-[#006bb8] group-hover:text-orange-500">
                  <span>View Event Details</span>
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border-2 border-dashed border-slate-200 bg-white p-12 text-center shadow-sm">
            <p className="text-lg font-semibold text-slate-600">No events found matching your search.</p>
            <button
              onClick={() => {
                setActiveTab('All');
                setSearchQuery('');
              }}
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-2.5 font-bold text-white transition-all hover:bg-orange-600"
            >
              Reset Filters
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default AllEventsPage;
