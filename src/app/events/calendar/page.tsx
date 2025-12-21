// app/events/calendar/page.tsx
"use client"

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Download, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Footer from '@/components/Footer';

interface Event {
    id: string;
    title: string;
    date: Date;
    startTime: string;
    endTime: string;
    location: string;
    category: 'workshop' | 'ctf' | 'talk' | 'meetup';
    attendees: number;
    maxAttendees?: number;
    slug: string;
}

// Mock events data
const mockEvents: Event[] = [
    {
        id: '1',
        title: 'Web Security Workshop',
        date: new Date(2024, 11, 15),
        startTime: '10:00',
        endTime: '12:00',
        location: 'Virtual',
        category: 'workshop',
        attendees: 45,
        maxAttendees: 50,
        slug: 'web-security-workshop'
    },
    {
        id: '2',
        title: 'Beginner CTF Challenge',
        date: new Date(2024, 11, 20),
        startTime: '14:00',
        endTime: '18:00',
        location: 'Online',
        category: 'ctf',
        attendees: 120,
        maxAttendees: 150,
        slug: 'beginner-ctf-challenge'
    },
    {
        id: '3',
        title: 'Network Security Talk',
        date: new Date(2024, 11, 22),
        startTime: '16:00',
        endTime: '17:30',
        location: 'Virtual',
        category: 'talk',
        attendees: 80,
        slug: 'network-security-talk'
    },
    {
        id: '4',
        title: 'Bug Bounty Meetup',
        date: new Date(2024, 11, 28),
        startTime: '18:00',
        endTime: '20:00',
        location: 'San Francisco',
        category: 'meetup',
        attendees: 30,
        maxAttendees: 40,
        slug: 'bug-bounty-meetup'
    },
    {
        id: '5',
        title: 'OSINT Techniques Workshop',
        date: new Date(2025, 0, 5),
        startTime: '11:00',
        endTime: '13:00',
        location: 'Virtual',
        category: 'workshop',
        attendees: 35,
        maxAttendees: 50,
        slug: 'osint-techniques-workshop'
    },
];

const EventsCalendarPage = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [view, setView] = useState<'month' | 'week'>('month');

    const categoryColors = {
        workshop: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
        ctf: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
        talk: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
        meetup: 'bg-green-500/20 text-green-400 border-green-500/30',
    };

    // Calendar navigation
    const goToPreviousMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const goToNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const goToToday = () => {
        setCurrentDate(new Date());
    };

    // Get calendar data
    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        const days = [];
        
        // Previous month's days
        const prevMonthLastDay = new Date(year, month, 0).getDate();
        for (let i = startingDayOfWeek - 1; i >= 0; i--) {
            days.push({
                day: prevMonthLastDay - i,
                isCurrentMonth: false,
                date: new Date(year, month - 1, prevMonthLastDay - i)
            });
        }

        // Current month's days
        for (let i = 1; i <= daysInMonth; i++) {
            days.push({
                day: i,
                isCurrentMonth: true,
                date: new Date(year, month, i)
            });
        }

        // Next month's days
        const remainingDays = 42 - days.length;
        for (let i = 1; i <= remainingDays; i++) {
            days.push({
                day: i,
                isCurrentMonth: false,
                date: new Date(year, month + 1, i)
            });
        }

        return days;
    };

    const getEventsForDate = (date: Date) => {
        return mockEvents.filter(event => 
            event.date.getDate() === date.getDate() &&
            event.date.getMonth() === date.getMonth() &&
            event.date.getFullYear() === date.getFullYear()
        );
    };

    const isToday = (date: Date) => {
        const today = new Date();
        return date.getDate() === today.getDate() &&
               date.getMonth() === today.getMonth() &&
               date.getFullYear() === today.getFullYear();
    };

    const monthYear = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    const calendarDays = getDaysInMonth(currentDate);

    // ICS Export function
    const exportToICS = () => {
        const icsContent = generateICS(mockEvents);
        const blob = new Blob([icsContent], { type: 'text/calendar' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'thecyberhub-events.ics';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const generateICS = (events: Event[]) => {
        const icsEvents = events.map(event => {
            const start = new Date(event.date);
            const [startHour, startMin] = event.startTime.split(':');
            start.setHours(parseInt(startHour), parseInt(startMin));
            
            const end = new Date(event.date);
            const [endHour, endMin] = event.endTime.split(':');
            end.setHours(parseInt(endHour), parseInt(endMin));

            const formatDate = (date: Date) => {
                return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
            };

            return `BEGIN:VEVENT
UID:${event.id}@thecyberhub.org
DTSTAMP:${formatDate(new Date())}
DTSTART:${formatDate(start)}
DTEND:${formatDate(end)}
SUMMARY:${event.title}
LOCATION:${event.location}
DESCRIPTION:${event.title} - ${event.category}
URL:https://thecyberhub.org/events/${event.slug}
END:VEVENT`;
        }).join('\n');

        return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//TheCyberHub//Events//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
${icsEvents}
END:VCALENDAR`;
    };

    return (
        <div className="min-h-screen bg-black">
            {/* Header */}
            <section className="relative pt-32 pb-8 px-4 sm:px-6">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />
                
                <div className="relative max-w-7xl mx-auto">
                    <Link 
                        href="/events"
                        className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Events
                    </Link>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-4xl font-bold text-white mb-2">
                                Events <span className="gradient-text">Calendar</span>
                            </h1>
                            <p className="text-gray-400">
                                View all upcoming events in calendar format
                            </p>
                        </div>

                        <button
                            onClick={exportToICS}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
                        >
                            <Download className="w-4 h-4" />
                            Export to Calendar
                        </button>
                    </div>

                    {/* View Toggle & Navigation */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={goToPreviousMonth}
                                className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors"
                            >
                                <ChevronLeft className="w-5 h-5 text-white" />
                            </button>
                            
                            <h2 className="text-xl font-semibold text-white min-w-[200px] text-center">
                                {monthYear}
                            </h2>
                            
                            <button
                                onClick={goToNextMonth}
                                className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors"
                            >
                                <ChevronRight className="w-5 h-5 text-white" />
                            </button>

                            <button
                                onClick={goToToday}
                                className="ml-2 px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-gray-400 hover:text-white transition-colors"
                            >
                                Today
                            </button>
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={() => setView('month')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                    view === 'month' 
                                        ? 'bg-orange-500 text-white' 
                                        : 'bg-white/5 text-gray-400 hover:text-white border border-white/10'
                                }`}
                            >
                                Month
                            </button>
                            <button
                                onClick={() => setView('week')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                    view === 'week' 
                                        ? 'bg-orange-500 text-white' 
                                        : 'bg-white/5 text-gray-400 hover:text-white border border-white/10'
                                }`}
                            >
                                Week
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Calendar */}
            <section className="px-4 sm:px-6 pb-20">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                        {/* Day headers */}
                        <div className="grid grid-cols-7 gap-2 mb-4">
                            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                <div key={day} className="text-center text-sm font-medium text-gray-400 py-2">
                                    {day}
                                </div>
                            ))}
                        </div>

                        {/* Calendar grid */}
                        <div className="grid grid-cols-7 gap-2">
                            {calendarDays.map((dayData, index) => {
                                const events = getEventsForDate(dayData.date);
                                const isTodayDate = isToday(dayData.date);

                                return (
                                    <div
                                        key={index}
                                        className={`min-h-[120px] p-3 rounded-lg border transition-all ${
                                            dayData.isCurrentMonth
                                                ? 'bg-white/5 border-white/10 hover:border-orange-500/30'
                                                : 'bg-transparent border-white/5'
                                        }`}
                                    >
                                        <div className={`text-sm font-medium mb-2 ${
                                            isTodayDate
                                                ? 'w-7 h-7 rounded-full bg-orange-500 text-white flex items-center justify-center'
                                                : dayData.isCurrentMonth
                                                ? 'text-white'
                                                : 'text-gray-600'
                                        }`}>
                                            {dayData.day}
                                        </div>

                                        <div className="space-y-1">
                                            {events.map(event => (
                                                <Link
                                                    key={event.id}
                                                    href={`/events/${event.slug}`}
                                                    className={`block text-xs px-2 py-1 rounded border ${categoryColors[event.category]} hover:opacity-80 transition-opacity`}
                                                >
                                                    <div className="font-medium truncate">{event.title}</div>
                                                    <div className="text-[10px] opacity-70">{event.startTime}</div>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Legend */}
                    <div className="mt-8 flex flex-wrap gap-4 justify-center">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                            <span className="text-sm text-gray-400">Workshop</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                            <span className="text-sm text-gray-400">CTF</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                            <span className="text-sm text-gray-400">Talk</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            <span className="text-sm text-gray-400">Meetup</span>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default EventsCalendarPage;
