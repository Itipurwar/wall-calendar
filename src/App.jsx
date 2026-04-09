import React, { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, isWithinInterval, addMonths, subMonths } from 'date-fns';
import { ChevronLeft, ChevronRight, NotebookPen } from 'lucide-react';

const CalendarApp = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedRange, setSelectedRange] = useState({ start: null, end: null });
  const [note, setNote] = useState('');

  useEffect(() => {
    const savedNote = localStorage.getItem(`note-${format(currentMonth, 'MMM-yyyy')}`);
    setNote(savedNote || '');
  }, [currentMonth]);

  const saveNote = (val) => {
    setNote(val);
    localStorage.setItem(`note-${format(currentMonth, 'MMM-yyyy')}`, val);
  };

  const onDateClick = (day) => {
    if (!selectedRange.start || (selectedRange.start && selectedRange.end)) {
      setSelectedRange({ start: day, end: null });
    } else if (day < selectedRange.start) {
      setSelectedRange({ start: day, end: null });
    } else {
      setSelectedRange({ ...selectedRange, end: day });
    }
  };

  const years = [];
for (let i = 2020; i <= 2035; i++) {
  years.push(i);
}

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });

  return (
  <div className="min-h-screen bg-[#f3f4f6] p-4 flex justify-center items-center font-sans text-sm"> {/* text-sm se font chota ho jayega */}
    
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-lg overflow-hidden border-t-[8px] border-zinc-800 relative">
  
      <div className="absolute -top-3 left-0 right-0 flex justify-around px-4 z-20">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="flex flex-col items-center">
            {/* Ye hai Metal Ring (Spiral) */}
            <div className="w-2 h-6 bg-gradient-to-b from-gray-400 to-gray-600 rounded-full border border-gray-500 shadow-sm"></div>
            {/* Ye hai Calendar ka Hole */}
            <div className="w-3 h-3 bg-zinc-800 rounded-full -mt-1"></div>
          </div>
        ))}
      </div>
      {/* Header Image - Size Chota Kiya */}
      <div className="h-40 bg-cover bg-center relative" 
           style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80")' }}>
        <div className="absolute inset-0 bg-black/20 flex items-end p-4">
          <div className="flex gap-3">
          {/* Month Selection */}
          <select 
            value={format(currentMonth, 'MMMM')}
            onChange={(e) => {
              const monthIndex = months.indexOf(e.target.value);
              setCurrentMonth(new Date(currentMonth.getFullYear(), monthIndex, 1));
            }}
            className="bg-transparent text-white text-xl font-serif font-bold uppercase outline-none cursor-pointer border-b-2 border-white/20 hover:border-white transition-all appearance-none pr-2"
          >
            {months.map(m => (
              <option key={m} value={m} className="text-black uppercase text-xs font-sans font-normal">{m}</option>
            ))}
          </select>

          {/* Year Selection */}
          <select 
            value={currentMonth.getFullYear()}
            onChange={(e) => {
              setCurrentMonth(new Date(parseInt(e.target.value), currentMonth.getMonth(), 1));
            }}
            className="bg-transparent text-white text-xl font-serif font-bold uppercase outline-none cursor-pointer border-b-2 border-white/20 hover:border-white transition-all appearance-none pr-2"
          >
            {years.map(y => (
              <option key={y} value={y} className="text-black font-sans font-normal">{y}</option>
            ))}
          </select>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Grid Section */}
        <div className="flex-1 p-4">
          <div className="flex justify-between items-center mb-4 text-xs font-bold">
            <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="p-1 hover:bg-gray-100 rounded-full"><ChevronLeft size={16}/></button>
            <div className="grid grid-cols-7 w-full text-center text-gray-400">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => <span key={d}>{d}</span>)}
            </div>
            <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="p-1 hover:bg-gray-100 rounded-full"><ChevronRight size={16}/></button>
          </div>

          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, i) => {
              const isSelected = isSameDay(day, selectedRange.start) || isSameDay(day, selectedRange.end);
              const inRange = selectedRange.start && selectedRange.end && isWithinInterval(day, { start: selectedRange.start, end: selectedRange.end });
              return (
                <div key={i} onClick={() => onDateClick(day)}
                  className={`h-10 flex items-center justify-center cursor-pointer text-xs transition-all rounded
                    ${!isSameMonth(day, monthStart) ? 'text-gray-200' : 'text-gray-800'}
                    ${isSelected ? 'bg-zinc-800 text-white shadow-md' : 'hover:bg-gray-50'}
                    ${inRange && !isSelected ? 'bg-zinc-100' : ''}`}>
                  {format(day, 'd')}
                </div>
              );
            })}
          </div>
        </div>

        {/* Notes Sidebar - Size Chota Kiya */}
        <div className="w-full md:w-56 bg-gray-50 p-4 border-l border-gray-100">
          <div className="flex items-center gap-2 mb-2 font-bold text-gray-700 uppercase text-[10px] tracking-widest">
            <NotebookPen size={14} /> <span>Notes</span>
          </div>
          <textarea
            className="w-full h-32 md:h-48 bg-white border border-gray-200 rounded p-2 focus:outline-none text-xs italic text-gray-600 shadow-sm"
            placeholder="Notes..."
            value={note}
            onChange={(e) => saveNote(e.target.value)}
          />
        </div>
      </div>
    </div>
  </div>
);
}
export default CalendarApp;