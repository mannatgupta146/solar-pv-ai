import React, { useState, useEffect } from 'react';
import { 
  Sun, 
  Activity, 
  AlertTriangle, 
  IndianRupee, 
  Zap, 
  LineChart as LineChartIcon, 
  Layers, 
  BrainCircuit, 
  CheckCircle2,
  Clock,
  ChevronRight,
  Gauge,
  Sliders,
  CloudSun,
  Search,
  MapPin,
  Compass,
  Database,
  Building,
  ArrowRight,
  Sparkles,
  RefreshCw,
  Calendar,
  TrendingUp,
  Coins,
  LayoutGrid,
  Table as TableIcon
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  BarChart, 
  Bar,
  ComposedChart
} from 'recharts';

const API_BASE = 'http://localhost:8000/api';

const POPULAR_CITIES = ['Gurgaon', 'Pune', 'Jaipur', 'Bengaluru', 'Kochi', 'Shimla', 'Ahmedabad', 'Patna'];

export default function App() {
  // Main route sections: 'predictor' (Any Location Search) vs 'nise_hub' (NISE Historical Research Engine)
  const [activeSection, setActiveSection] = useState<'predictor' | 'nise_hub'>('predictor');
  const [niseTab, setNiseTab] = useState<'overview' | 'performance' | 'anomaly' | 'explainability'>('overview');
  
  // Dynamic Search Predictor State
  const [searchQuery, setSearchQuery] = useState<string>('Gurgaon');
  const [customCapacity, setCustomCapacity] = useState<number>(100);
  const [searchResult, setSearchResult] = useState<any>(null);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [predictorTab, setPredictorTab] = useState<'weekly' | 'today'>('weekly');
  const [weeklySubView, setWeeklySubView] = useState<'grid' | 'table'>('grid');
  
  // NISE Research Data States
  const [forecastData, setForecastData] = useState<any>(null);
  const [systemHealthData, setSystemHealthData] = useState<any>(null);
  const [overview, setOverview] = useState<any>(null);
  const [performance, setPerformance] = useState<any>(null);
  const [anomalies, setAnomalies] = useState<any>(null);
  const [explainability, setExplainability] = useState<any>(null);
  const [technologies, setTechnologies] = useState<any>(null);
  const [selectedModel, setSelectedModel] = useState<string>('XGBoost');

  // Trigger search on mount and query submission
  const executeSearch = (city: string, cap: number) => {
    setIsSearching(true);
    fetch(`${API_BASE}/search-location?query=${encodeURIComponent(city)}&capacity_kw=${cap}`)
      .then(res => res.json())
      .then(data => {
        setSearchResult(data);
        setIsSearching(false);
      })
      .catch(err => {
        console.error(err);
        setIsSearching(false);
      });
  };

  useEffect(() => {
    executeSearch('Gurgaon', 100);

    fetch(`${API_BASE}/forecast`).then(res => res.json()).then(data => setForecastData(data)).catch(console.error);
    fetch(`${API_BASE}/system-health`).then(res => res.json()).then(data => setSystemHealthData(data)).catch(console.error);
    fetch(`${API_BASE}/overview`).then(res => res.json()).then(data => setOverview(data)).catch(console.error);
    fetch(`${API_BASE}/anomalies`).then(res => res.json()).then(data => setAnomalies(data)).catch(console.error);
    fetch(`${API_BASE}/explainability`).then(res => res.json()).then(data => setExplainability(data)).catch(console.error);
    fetch(`${API_BASE}/technologies`).then(res => res.json()).then(data => setTechnologies(data)).catch(console.error);
  }, []);

  useEffect(() => {
    fetch(`${API_BASE}/performance?model=${encodeURIComponent(selectedModel)}`)
      .then(res => res.json())
      .then(data => setPerformance(data))
      .catch(console.error);
  }, [selectedModel]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      executeSearch(searchQuery, customCapacity);
    }
  };

  const handlePresetClick = (city: string) => {
    setSearchQuery(city);
    executeSearch(city, customCapacity);
  };

  return (
    <div className="h-screen w-full flex bg-zinc-50 font-sans selection:bg-amber-100 overflow-hidden">
      
      {/* LEFT SIDEBAR NAVIGATION - FIXED ROCK SOLID HEIGHT */}
      <aside className="w-72 bg-white text-zinc-800 flex flex-col shrink-0 border-r border-zinc-200 h-full z-50 shadow-2xs">
        
        {/* Brand Header with Comfortable Spacing */}
        <div className="p-6 border-b border-zinc-100 flex items-center gap-4 shrink-0">
          <div className="w-11 h-11 bg-amber-50/80 border border-amber-200/80 rounded-xl flex items-center justify-center text-amber-600 shadow-2xs shrink-0">
            <Sun className="w-6 h-6" />
          </div>
          <div className="pl-0.5">
            <h1 className="text-base font-bold text-zinc-900 tracking-tight flex items-center gap-2.5">
              SolarPV AI
              <span className="text-[10px] font-mono font-bold bg-amber-100/80 text-amber-900 px-2 py-0.5 rounded border border-amber-200">v2.0</span>
            </h1>
            <p className="text-xs text-zinc-500 font-medium mt-1">Operations & Decision Suite</p>
          </div>
        </div>

        {/* Sidebar Navigation */}
        <div className="flex-1 px-4 py-6 space-y-7 overflow-y-auto">
          
          {/* Section 1: Operations */}
          <div className="space-y-2">
            <div className="px-3 text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider">
              Live Operations
            </div>
            
            <button
              onClick={() => setActiveSection('predictor')}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm transition-all ${
                activeSection === 'predictor' 
                  ? 'bg-amber-400 text-zinc-950 font-bold shadow-xs hover:bg-amber-300' 
                  : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 font-medium'
              }`}
            >
              <Compass className={`w-5 h-5 ${activeSection === 'predictor' ? 'text-zinc-950' : 'text-zinc-500'}`} />
              Solar Forecast
            </button>
          </div>

          {/* Section 2: Plant Analytics */}
          <div className="space-y-2">
            <div className="px-3 text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider">
              Plant Analytics (Gurgaon)
            </div>
            
            <button
              onClick={() => { setActiveSection('nise_hub'); setNiseTab('overview'); }}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm transition-all ${
                activeSection === 'nise_hub' && niseTab === 'overview' 
                  ? 'bg-amber-400 text-zinc-950 font-bold shadow-xs hover:bg-amber-300' 
                  : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 font-medium'
              }`}
            >
              <Gauge className={`w-5 h-5 ${activeSection === 'nise_hub' && niseTab === 'overview' ? 'text-zinc-950' : 'text-zinc-500'}`} />
              Plant Overview
            </button>

            <button
              onClick={() => { setActiveSection('nise_hub'); setNiseTab('performance'); }}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm transition-all ${
                activeSection === 'nise_hub' && niseTab === 'performance' 
                  ? 'bg-amber-400 text-zinc-950 font-bold shadow-xs hover:bg-amber-300' 
                  : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 font-medium'
              }`}
            >
              <LineChartIcon className={`w-5 h-5 ${activeSection === 'nise_hub' && niseTab === 'performance' ? 'text-zinc-950' : 'text-zinc-500'}`} />
              AI Predictions & Models
            </button>

            <button
              onClick={() => { setActiveSection('nise_hub'); setNiseTab('anomaly'); }}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm transition-all ${
                activeSection === 'nise_hub' && niseTab === 'anomaly' 
                  ? 'bg-amber-400 text-zinc-950 font-bold shadow-xs hover:bg-amber-300' 
                  : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 font-medium'
              }`}
            >
              <AlertTriangle className={`w-5 h-5 ${activeSection === 'nise_hub' && niseTab === 'anomaly' ? 'text-zinc-950' : 'text-zinc-500'}`} />
              Alerts & Issues
            </button>

            <button
              onClick={() => { setActiveSection('nise_hub'); setNiseTab('explainability'); }}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm transition-all ${
                activeSection === 'nise_hub' && niseTab === 'explainability' 
                  ? 'bg-amber-400 text-zinc-950 font-bold shadow-xs hover:bg-amber-300' 
                  : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 font-medium'
              }`}
            >
              <BrainCircuit className={`w-5 h-5 ${activeSection === 'nise_hub' && niseTab === 'explainability' ? 'text-zinc-950' : 'text-zinc-500'}`} />
              AI Insights & Tech Specs
            </button>
          </div>
        </div>

        {/* Footer info card */}
        <div className="p-5 border-t border-zinc-100 bg-zinc-50/50 text-xs text-zinc-600 space-y-2 shrink-0">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-zinc-900 font-semibold">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Engine Connected
            </span>
            <span className="font-mono text-xs text-amber-950 bg-amber-100/90 px-2 py-0.5 rounded border border-amber-200/90 font-bold">Active</span>
          </div>
          <div className="text-xs text-zinc-500 font-mono">
            Open-Meteo Weather + XGBoost ML
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT WORKSPACE WITH SMOOTH DEDICATED SCROLLBAR */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-y-auto">
        
        {/* TOP BAR / BREADCRUMB HEADER */}
        <header className="bg-white border-b border-zinc-200 px-8 py-5 flex items-center justify-between sticky top-0 z-40 shadow-2xs shrink-0">
          <div className="flex items-center gap-3.5 text-sm text-zinc-600 font-medium">
            <span className="text-zinc-900 font-bold text-base flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-50/80 border border-amber-200/80 flex items-center justify-center">
                <Sun className="w-5 h-5 text-amber-600" />
              </div>
              <span>SolarPV Operations</span>
            </span>
            <ChevronRight className="w-4 h-4 text-zinc-400" />
            <span className="text-zinc-800 font-semibold">
              {activeSection === 'predictor' ? 'Live Any-Location Search & Forecast' : `NISE Gurgaon Dataset (${niseTab})`}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2.5 bg-zinc-50 border border-zinc-200 px-4 py-2 rounded-xl text-xs text-zinc-700 font-semibold">
              <CloudSun className="w-4.5 h-4.5 text-amber-600" />
              <span>Real-time Shortwave Irradiance Sync</span>
            </div>
          </div>
        </header>

        {/* SECTION 1: LIVE ANY-LOCATION SOLAR PREDICTOR */}
        {activeSection === 'predictor' && (
          <main className="flex-1 max-w-7xl w-full mx-auto px-8 py-8 space-y-7">
            
            {/* Search Header Card */}
            <div className="bg-white border border-zinc-200/90 rounded-2xl p-7 shadow-xs space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-mono font-bold uppercase px-3 py-1 rounded-md bg-zinc-100 text-zinc-800 border border-zinc-200">
                      Dynamic Weather & Radiation
                    </span>
                    <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">Solar Power Predictor for Any Location in India</h2>
                  </div>
                  <p className="text-sm text-zinc-600 font-medium mt-1.5">
                    Search any Indian town or city to pull live Open-Meteo solar radiation metrics and estimate daily energy production.
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono bg-zinc-50 px-3.5 py-2 rounded-xl border border-zinc-200 text-zinc-700 font-semibold">
                  <MapPin className="w-4 h-4 text-zinc-600" />
                  <span>Open-Meteo Geocoding API</span>
                </div>
              </div>

              {/* Form Input */}
              <form onSubmit={handleSearchSubmit} className="flex flex-wrap items-center gap-4">
                <div className="flex-1 min-w-72 relative">
                  <Search className="w-5 h-5 text-zinc-400 absolute left-4 top-3.5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Enter Indian city (e.g. Pune, Jaipur, Patna, Shimla, Kochi, Ahmedabad)..."
                    className="w-full bg-zinc-50 border border-zinc-200 text-zinc-900 text-base font-semibold rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-amber-400 focus:bg-white transition-all shadow-xs"
                  />
                </div>

                <div className="flex items-center gap-3 bg-zinc-50 border border-zinc-200 px-4 py-3 rounded-xl shadow-xs">
                  <Building className="w-5 h-5 text-zinc-500" />
                  <label className="text-sm font-bold text-zinc-700">Size (kWp):</label>
                  <input
                    type="number"
                    value={customCapacity}
                    onChange={e => setCustomCapacity(Number(e.target.value))}
                    min={10}
                    max={10000}
                    className="w-24 bg-white border border-zinc-200 text-zinc-900 text-sm font-bold rounded-lg px-3 py-1.5 focus:outline-none text-center"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSearching}
                  className="bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-sm px-7 py-3.5 rounded-xl shadow-xs transition-all flex items-center gap-2.5 cursor-pointer disabled:opacity-50"
                >
                  {isSearching ? (
                    <>
                      <RefreshCw className="w-4.5 h-4.5 animate-spin text-zinc-950" />
                      <span>Fetching Radiation...</span>
                    </>
                  ) : (
                    <>
                      <span>Predict Generation</span>
                      <ArrowRight className="w-4.5 h-4.5 text-zinc-950" />
                    </>
                  )}
                </button>
              </form>

              {/* City Presets */}
              <div className="flex items-center gap-2.5 pt-2 border-t border-zinc-100 flex-wrap">
                <span className="text-xs font-semibold text-zinc-500">Popular presets:</span>
                {POPULAR_CITIES.map(city => (
                  <button
                    key={city}
                    type="button"
                    onClick={() => handlePresetClick(city)}
                    className={`text-xs px-3.5 py-1.5 rounded-lg transition-all font-semibold border ${
                      searchQuery.toLowerCase() === city.toLowerCase()
                        ? 'bg-amber-400 text-zinc-950 border-amber-400 font-bold shadow-xs'
                        : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700 border-zinc-200'
                    }`}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>

            {/* Prediction Result Display */}
            {searchResult?.weather && (
              <div className="space-y-7">
                
                {/* Result Card */}
                <div className="bg-white border border-zinc-200/90 rounded-2xl p-7 shadow-xs space-y-6">
                  
                  {/* Result Header */}
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-100 pb-5">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-mono text-zinc-600 font-bold">
                        <MapPin className="w-4.5 h-4.5 text-zinc-600" />
                        {searchResult.weather.location_name}, {searchResult.weather.state}, India
                      </div>
                      <h2 className="text-2xl font-bold text-zinc-900 mt-1 flex items-center gap-2">
                        Solar Power & Weather Forecast
                      </h2>
                    </div>

                    <div className="flex items-center gap-3.5 bg-zinc-50 px-5 py-3 rounded-xl border border-zinc-200">
                      <CloudSun className="w-6 h-6 text-amber-600" />
                      <div>
                        <div className="text-xs text-zinc-500 uppercase font-semibold">Current Weather</div>
                        <div className="text-base font-bold text-zinc-900">{searchResult.weather.current_temp_c}°C • {searchResult.weather.condition}</div>
                      </div>
                    </div>
                  </div>

                  {/* 4 KPI Metrics Cards including 7-Day Revenue & Total Yield */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
                    
                    <div className="bg-zinc-50 border border-zinc-200/90 rounded-xl p-5 space-y-2 shadow-2xs">
                      <div className="flex items-center justify-between text-zinc-600 text-xs font-bold uppercase tracking-wider">
                        <span>System Capacity</span>
                        <Building className="w-4.5 h-4.5 text-zinc-500" />
                      </div>
                      <div className="text-2xl font-bold text-zinc-900">
                        {searchResult.weather.system_size_kw} <span className="text-xs font-semibold text-zinc-500">kWp</span>
                      </div>
                      <p className="text-xs text-zinc-500 font-medium">Total Plant Capacity</p>
                    </div>

                    <div className="bg-white border border-amber-200/80 rounded-xl p-5 space-y-2 shadow-2xs border-t-4 border-t-amber-400">
                      <div className="flex items-center justify-between text-zinc-700 text-xs font-bold uppercase tracking-wider">
                        <span>Today's Output</span>
                        <Zap className="w-4.5 h-4.5 text-amber-600" />
                      </div>
                      <div className="text-2xl font-bold text-zinc-900">
                        {searchResult.weather.expected_generation_kwh} <span className="text-xs font-semibold text-zinc-500">kWh</span>
                      </div>
                      <p className="text-xs text-zinc-500 font-medium">Expected Daily Generation</p>
                    </div>

                    <div className="bg-zinc-50 border border-zinc-200/90 rounded-xl p-5 space-y-2 shadow-2xs">
                      <div className="flex items-center justify-between text-zinc-600 text-xs font-bold uppercase tracking-wider">
                        <span>7-Day Output</span>
                        <TrendingUp className="w-4.5 h-4.5 text-amber-600" />
                      </div>
                      <div className="text-2xl font-bold text-zinc-900">
                        {searchResult.weather.weekly_summary?.total_7day_kwh?.toLocaleString() || (searchResult.weather.expected_generation_kwh * 7).toFixed(1)} <span className="text-xs font-semibold text-zinc-500">kWh</span>
                      </div>
                      <p className="text-xs text-zinc-500 font-medium">Total 7-Day Yield</p>
                    </div>

                    <div className="bg-zinc-50 border border-zinc-200/90 rounded-xl p-5 space-y-2 shadow-2xs">
                      <div className="flex items-center justify-between text-zinc-600 text-xs font-bold uppercase tracking-wider">
                        <span>7-Day Revenue</span>
                        <IndianRupee className="w-4.5 h-4.5 text-zinc-600" />
                      </div>
                      <div className="text-2xl font-bold text-zinc-900">
                        ₹{searchResult.weather.weekly_summary?.total_7day_revenue_inr?.toLocaleString() || (searchResult.weather.expected_generation_kwh * 7 * 8).toFixed(0)}
                      </div>
                      <p className="text-xs text-zinc-500 font-medium">Rate: ₹8.0 / kWh</p>
                    </div>

                  </div>

                  {/* View Selector Toggle Bar */}
                  <div className="pt-2 border-t border-zinc-100 flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-2 bg-zinc-100 p-1.5 rounded-xl border border-zinc-200">
                      <button
                        onClick={() => setPredictorTab('weekly')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                          predictorTab === 'weekly' 
                            ? 'bg-white text-zinc-900 shadow-xs border border-zinc-200' 
                            : 'text-zinc-600 hover:text-zinc-900'
                        }`}
                      >
                        <Calendar className="w-4 h-4 text-amber-600" />
                        <span>7-Day Forecast</span>
                      </button>
                      <button
                        onClick={() => setPredictorTab('today')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                          predictorTab === 'today' 
                            ? 'bg-white text-zinc-900 shadow-xs border border-zinc-200' 
                            : 'text-zinc-600 hover:text-zinc-900'
                        }`}
                      >
                        <Clock className="w-4 h-4 text-amber-600" />
                        <span>Today's Hourly View</span>
                      </button>
                    </div>

                    <div className="text-xs font-mono text-zinc-600 font-semibold bg-zinc-50 px-3.5 py-2 rounded-xl border border-zinc-200 flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      <span>Best Yield Day: <strong className="text-zinc-900">{searchResult.weather.weekly_summary?.best_day_label || 'Tomorrow'} ({searchResult.weather.weekly_summary?.best_day_kwh || searchResult.weather.expected_generation_kwh} kWh)</strong></span>
                    </div>
                  </div>
                </div>

                {/* VIEW 1: 7-DAY WEEKLY FORECAST & OUTLOOK */}
                {predictorTab === 'weekly' && (
                  <div className="space-y-7">
                    
                    {/* Weekly Generation & Peak Power Bar Chart */}
                    <div className="bg-white border border-zinc-200/90 rounded-2xl p-6 sm:p-7 space-y-4 shadow-xs">
                      <div className="flex items-center justify-between flex-wrap gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-bold text-zinc-900">7-Day Solar Yield & Power Outlook</h3>
                            <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold font-mono">
                              {searchResult.weather.location_name}
                            </span>
                          </div>
                          <p className="text-xs text-zinc-500 mt-1 font-medium">Daily expected energy production (kWh), peak noon capacity (kW), and cloud attenuation forecast.</p>
                        </div>
                        
                        <div className="flex items-center gap-2 bg-zinc-100/80 p-1 rounded-xl border border-zinc-200">
                          <button
                            onClick={() => setWeeklySubView('grid')}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                              weeklySubView === 'grid'
                                ? 'bg-white text-zinc-900 shadow-xs border border-zinc-200/80'
                                : 'text-zinc-500 hover:text-zinc-800'
                            }`}
                          >
                            <LayoutGrid className="w-3.5 h-3.5 text-amber-600" />
                            <span>Cards View</span>
                          </button>
                          <button
                            onClick={() => setWeeklySubView('table')}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                              weeklySubView === 'table'
                                ? 'bg-white text-zinc-900 shadow-xs border border-zinc-200/80'
                                : 'text-zinc-500 hover:text-zinc-800'
                            }`}
                          >
                            <TableIcon className="w-3.5 h-3.5 text-amber-600" />
                            <span>Table Matrix</span>
                          </button>
                        </div>
                      </div>

                      <div className="h-80 w-full pt-2">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={searchResult.weather.daily_forecast || []} margin={{ top: 10, right: 15, left: -10, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f4f4f5" vertical={false} />
                            <XAxis dataKey="day_label" stroke="#71717a" tick={{ fontSize: 12, fontWeight: 600 }} />
                            <YAxis stroke="#71717a" tick={{ fontSize: 12 }} />
                            <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e4e4e7', color: '#09090b', borderRadius: '12px', fontSize: '13px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.08)' }} />
                            <Legend wrapperStyle={{ fontSize: '13px', paddingTop: '10px' }} />
                            <Bar dataKey="expected_generation_kwh" name="Daily Generation (kWh)" fill="#fbbf24" radius={[6, 6, 0, 0]} />
                            <Bar dataKey="expected_peak_kw" name="Peak Noon Power (kW)" fill="#18181b" radius={[6, 6, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* 7-DAY FORECAST SUB-VIEW 1: MODERN RESPONSIVE CARD DECK */}
                    {weeklySubView === 'grid' && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-bold text-zinc-800 uppercase tracking-wider flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-amber-600" />
                            <span>Daily Solar Forecast Deck (7 Days)</span>
                          </h4>
                          <span className="text-xs text-zinc-500 font-medium">Click card for details</span>
                        </div>

                        <div className="flex gap-3.5 overflow-x-auto pb-3 pt-1 scrollbar-thin scroll-smooth">
                          {searchResult.weather.daily_forecast?.map((day: any, idx: number) => {
                            const isToday = idx === 0;
                            const maxGen = Math.max(...(searchResult.weather.daily_forecast?.map((d: any) => d.expected_generation_kwh) || [500]));
                            const yieldPct = Math.min(100, Math.round((day.expected_generation_kwh / maxGen) * 100));
                            const isHighYield = day.solar_potential_pct >= 90;
                            const isModYield = day.solar_potential_pct >= 75;

                            return (
                              <div
                                key={idx}
                                className={`relative rounded-2xl p-4 transition-all duration-200 flex flex-col justify-between space-y-3.5 min-w-48 flex-1 shrink-0 ${
                                  isToday
                                    ? 'bg-linear-to-b from-amber-500/10 via-amber-50/50 to-white border-2 border-amber-400 shadow-md ring-4 ring-amber-400/10'
                                    : yieldPct === 100
                                      ? 'bg-linear-to-b from-amber-100/40 to-white border border-amber-300 shadow-xs hover:shadow-md'
                                      : 'bg-white border border-zinc-200/90 hover:border-amber-300 hover:shadow-md'
                                }`}
                              >
                                {/* Top Header Badge */}
                                <div className="space-y-1.5">
                                  <div className="flex items-center justify-between gap-1">
                                    <span className="font-bold text-zinc-900 text-sm font-sans tracking-tight whitespace-nowrap">
                                      {day.day_label}
                                    </span>
                                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-md bg-zinc-100 text-zinc-500 shrink-0 whitespace-nowrap">
                                      {day.date ? day.date.split('-').slice(1).join('/') : ''}
                                    </span>
                                  </div>

                                  <div className="flex items-center gap-1.5 text-xs text-zinc-600 pt-0.5">
                                    <div className="w-6 h-6 rounded-lg bg-amber-100/70 flex items-center justify-center shrink-0">
                                      {day.condition.includes('Clear') ? (
                                        <Sun className="w-3.5 h-3.5 text-amber-600" />
                                      ) : (
                                        <CloudSun className="w-3.5 h-3.5 text-amber-700" />
                                      )}
                                    </div>
                                    <span className="font-semibold text-[11px] text-zinc-700 leading-tight whitespace-nowrap truncate">
                                      {day.condition}
                                    </span>
                                  </div>
                                </div>

                                {/* Main Metric Box: kWh Generation */}
                                <div className="bg-zinc-50/90 rounded-xl p-3 border border-zinc-100/80 space-y-1">
                                  <div className="flex items-center justify-between text-[10px] uppercase font-bold tracking-wider text-zinc-400">
                                    <span className="whitespace-nowrap">Generation</span>
                                    <Zap className="w-3 h-3 text-amber-500 shrink-0" />
                                  </div>
                                  <div className="text-xl font-bold font-mono text-zinc-900 leading-tight whitespace-nowrap">
                                    {day.expected_generation_kwh}
                                    <span className="text-xs font-semibold text-zinc-500 font-sans ml-1">kWh</span>
                                  </div>
                                  
                                  {/* Progress bar */}
                                  <div className="w-full bg-zinc-200/90 rounded-full h-1.5 mt-2 overflow-hidden">
                                    <div
                                      className={`h-1.5 rounded-full transition-all duration-500 ${
                                        isHighYield ? 'bg-amber-500' : isModYield ? 'bg-amber-400' : 'bg-zinc-400'
                                      }`}
                                      style={{ width: `${yieldPct}%` }}
                                    ></div>
                                  </div>
                                </div>

                                {/* Sub-metrics: Peak kW & Revenue */}
                                <div className="space-y-1.5 text-xs font-mono border-t border-zinc-100 pt-2">
                                  <div className="flex items-center justify-between text-zinc-600 gap-1">
                                    <span className="text-[10px] text-zinc-400 font-sans uppercase font-medium whitespace-nowrap">Peak kW</span>
                                    <span className="font-bold text-zinc-800 whitespace-nowrap">{day.expected_peak_kw} kW</span>
                                  </div>
                                  <div className="flex items-center justify-between text-zinc-600 gap-1">
                                    <span className="text-[10px] text-zinc-400 font-sans uppercase font-medium whitespace-nowrap">Est. Revenue</span>
                                    <span className="font-bold text-amber-950 whitespace-nowrap">₹{day.estimated_revenue_inr?.toLocaleString()}</span>
                                  </div>
                                </div>

                                {/* Solar Potential Efficiency Badge */}
                                <div className="pt-0.5">
                                  <span className={`w-full py-1.5 px-2 rounded-xl text-[11px] font-bold flex items-center justify-center gap-1.5 border shadow-2xs whitespace-nowrap ${
                                    isHighYield
                                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200/80'
                                      : isModYield
                                        ? 'bg-amber-50 text-amber-900 border-amber-200/80'
                                        : 'bg-zinc-100 text-zinc-700 border-zinc-200/80'
                                  }`}>
                                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${isHighYield ? 'bg-emerald-500 animate-pulse' : isModYield ? 'bg-amber-500' : 'bg-zinc-400'}`}></span>
                                    {day.solar_potential_pct}% Potential
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* 7-DAY FORECAST SUB-VIEW 2: HIGH-DENSITY TABLE MATRIX */}
                    {weeklySubView === 'table' && (
                      <div className="bg-white border border-zinc-200/90 rounded-2xl p-6 sm:p-7 space-y-5 shadow-xs">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <div>
                            <h3 className="text-lg font-bold text-zinc-900">7-Day Detailed Forecast & Revenue Matrix</h3>
                            <p className="text-xs text-zinc-500 mt-1 font-medium">Tabular view of generation, relative yield percentages, peak power, and tariff revenue.</p>
                          </div>
                          <span className="text-xs font-mono font-bold px-3 py-1 rounded-lg bg-zinc-100 text-zinc-800 border border-zinc-200">
                            Tariff: ₹8.0 / kWh
                          </span>
                        </div>

                        <div className="overflow-x-auto scrollbar-thin">
                          <table className="w-full text-left text-sm border-collapse min-w-180">
                            <thead>
                              <tr className="border-b border-zinc-200 text-zinc-500 font-bold text-xs uppercase tracking-wider bg-zinc-50/70">
                                <th className="py-3.5 px-4 whitespace-nowrap">Day & Date</th>
                                <th className="py-3.5 px-4 whitespace-nowrap">Condition</th>
                                <th className="py-3.5 px-4 whitespace-nowrap">Generation (kWh)</th>
                                <th className="py-3.5 px-4 whitespace-nowrap">Relative Yield</th>
                                <th className="py-3.5 px-4 whitespace-nowrap">Peak Noon Power</th>
                                <th className="py-3.5 px-4 whitespace-nowrap">Est. Revenue (₹)</th>
                                <th className="py-3.5 px-4 whitespace-nowrap">Solar Potential</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-100">
                              {searchResult.weather.daily_forecast?.map((day: any, idx: number) => {
                                const isToday = idx === 0;
                                const maxGen = Math.max(...(searchResult.weather.daily_forecast?.map((d: any) => d.expected_generation_kwh) || [500]));
                                const yieldPct = Math.min(100, Math.round((day.expected_generation_kwh / maxGen) * 100));
                                const isHighYield = day.solar_potential_pct >= 90;
                                const isModYield = day.solar_potential_pct >= 75;

                                return (
                                  <tr key={idx} className={`transition ${isToday ? 'bg-amber-50/60 font-semibold' : 'hover:bg-zinc-50/80'}`}>
                                    <td className="py-4 px-4 font-bold text-zinc-900 text-sm font-sans whitespace-nowrap">
                                      <div className="flex items-center gap-2">
                                        {isToday && <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse shrink-0"></span>}
                                        <span>{day.day_label}</span>
                                        <span className="text-xs font-mono text-zinc-400 font-semibold">{day.date ? day.date.split('-').slice(1).join('/') : ''}</span>
                                      </div>
                                    </td>
                                    <td className="py-4 px-4 text-zinc-700 text-sm whitespace-nowrap">
                                      <span className="flex items-center gap-2">
                                        {day.condition.includes('Clear') ? (
                                          <Sun className="w-4 h-4 text-amber-500 shrink-0" />
                                        ) : (
                                          <CloudSun className="w-4 h-4 text-amber-600 shrink-0" />
                                        )}
                                        <span className="whitespace-nowrap">{day.condition}</span>
                                      </span>
                                    </td>
                                    <td className="py-4 px-4 font-mono font-bold text-zinc-900 text-base whitespace-nowrap">
                                      {day.expected_generation_kwh} <span className="text-xs font-normal text-zinc-500 font-sans ml-0.5">kWh</span>
                                    </td>
                                    <td className="py-4 px-4 min-w-36 whitespace-nowrap">
                                      <div className="w-full bg-zinc-100 rounded-full h-2 overflow-hidden">
                                        <div className="bg-amber-400 h-2 rounded-full" style={{ width: `${yieldPct}%` }}></div>
                                      </div>
                                      <span className="text-[10px] text-zinc-400 font-mono font-semibold whitespace-nowrap">{yieldPct}% of peak</span>
                                    </td>
                                    <td className="py-4 px-4 font-mono text-zinc-800 text-sm font-bold whitespace-nowrap">{day.expected_peak_kw} kW</td>
                                    <td className="py-4 px-4 font-mono font-bold text-zinc-900 text-sm whitespace-nowrap">₹{day.estimated_revenue_inr?.toLocaleString()}</td>
                                    <td className="py-4 px-4 whitespace-nowrap">
                                      <span className={`text-xs font-bold px-3 py-1 rounded-lg border inline-flex items-center gap-1.5 whitespace-nowrap ${
                                        isHighYield
                                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200/90'
                                          : isModYield
                                            ? 'bg-amber-50 text-amber-900 border-amber-200/90'
                                            : 'bg-zinc-100 text-zinc-700 border-zinc-200'
                                      }`}>
                                        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${isHighYield ? 'bg-emerald-500 animate-pulse' : isModYield ? 'bg-amber-500' : 'bg-zinc-400'}`}></span>
                                        {day.solar_potential_pct}% Efficiency
                                      </span>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {/* 7-DAY SUMMARY CUMULATIVE FOOTER BAR */}
                    <div className="bg-linear-to-r from-amber-500/10 via-amber-400/5 to-amber-500/10 border border-amber-300/80 rounded-2xl p-5 shadow-2xs flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-900 flex items-center justify-center shrink-0">
                          <Sparkles className="w-5 h-5 text-amber-600" />
                        </div>
                        <div>
                          <div className="text-xs font-bold uppercase tracking-wider text-amber-900 whitespace-nowrap">7-Day Cumulative Summary</div>
                          <div className="text-sm text-zinc-600 font-medium">Estimated 7-day generation & financial yields across {searchResult.weather.location_name}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 flex-wrap">
                        <div className="space-y-0.5">
                          <div className="text-[11px] font-semibold text-zinc-500 uppercase font-sans whitespace-nowrap">Total 7-Day Energy</div>
                          <div className="text-lg font-bold font-mono text-zinc-900 whitespace-nowrap">
                            {searchResult.weather.weekly_summary?.total_7day_kwh?.toLocaleString() || (searchResult.weather.expected_generation_kwh * 7).toFixed(1)} kWh
                          </div>
                        </div>

                        <div className="h-8 w-px bg-amber-200 hidden sm:block"></div>

                        <div className="space-y-0.5">
                          <div className="text-[11px] font-semibold text-zinc-500 uppercase font-sans whitespace-nowrap">Avg Daily Yield</div>
                          <div className="text-lg font-bold font-mono text-zinc-900 whitespace-nowrap">
                            {searchResult.weather.weekly_summary?.avg_daily_kwh || searchResult.weather.expected_generation_kwh} kWh/d
                          </div>
                        </div>

                        <div className="h-8 w-px bg-amber-200 hidden sm:block"></div>

                        <div className="space-y-0.5">
                          <div className="text-[11px] font-bold text-amber-900 uppercase font-sans whitespace-nowrap">Est. Total Revenue</div>
                          <div className="text-xl font-bold font-mono text-amber-950 whitespace-nowrap">
                            ₹{searchResult.weather.weekly_summary?.total_7day_revenue_inr?.toLocaleString() || (searchResult.weather.expected_generation_kwh * 7 * 8).toFixed(0)}
                          </div>
                        </div>

                        <div className="pl-2">
                          <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-amber-500 text-white shadow-xs inline-block whitespace-nowrap">
                            Best Day: {searchResult.weather.weekly_summary?.best_day_label || 'Tomorrow'}
                          </span>
                        </div>
                      </div>
                    </div>

                  </div>
                )}

                {/* VIEW 2: TODAY INTRADAY HOURLY CURVE & TELEMETRY */}
                {predictorTab === 'today' && (
                  <div className="space-y-7">
                    
                    {/* 4 Intraday Quick Metric Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                      <div className="bg-white border border-zinc-200/90 rounded-2xl p-5 space-y-2 shadow-2xs">
                        <div className="flex items-center justify-between text-zinc-500 text-xs font-bold uppercase tracking-wider">
                          <span className="whitespace-nowrap">Peak Irradiance</span>
                          <Sun className="w-4.5 h-4.5 text-amber-500 shrink-0" />
                        </div>
                        <div className="text-2xl font-bold text-zinc-900 font-mono">
                          {Math.max(...(searchResult.weather.hourly?.map((h: any) => h.raw_irradiance_w_m2) || [700]))} <span className="text-xs font-semibold text-zinc-400 font-sans">W/m²</span>
                        </div>
                        <p className="text-xs text-zinc-500 font-medium whitespace-nowrap truncate">Max Noon Solar Irradiance</p>
                      </div>

                      <div className="bg-white border border-zinc-200/90 rounded-2xl p-5 space-y-2 shadow-2xs">
                        <div className="flex items-center justify-between text-zinc-500 text-xs font-bold uppercase tracking-wider">
                          <span className="whitespace-nowrap">Peak Window</span>
                          <Clock className="w-4.5 h-4.5 text-amber-600 shrink-0" />
                        </div>
                        <div className="text-lg font-bold text-zinc-900 whitespace-nowrap">
                          {searchResult.weather.best_window || '10:30 AM – 2:30 PM'}
                        </div>
                        <p className="text-xs text-zinc-500 font-medium whitespace-nowrap truncate">Optimal Solar Window</p>
                      </div>

                      <div className="bg-white border border-zinc-200/90 rounded-2xl p-5 space-y-2 shadow-2xs">
                        <div className="flex items-center justify-between text-zinc-500 text-xs font-bold uppercase tracking-wider">
                          <span className="whitespace-nowrap">Avg Daytime Temp</span>
                          <CloudSun className="w-4.5 h-4.5 text-amber-600 shrink-0" />
                        </div>
                        <div className="text-2xl font-bold text-zinc-900 font-mono">
                          {searchResult.weather.current_temp_c || 31}°C
                        </div>
                        <p className="text-xs text-zinc-500 font-medium whitespace-nowrap truncate">Ambient Daylight Temp</p>
                      </div>

                      <div className="bg-white border border-zinc-200/90 rounded-2xl p-5 space-y-2 shadow-2xs">
                        <div className="flex items-center justify-between text-zinc-500 text-xs font-bold uppercase tracking-wider">
                          <span className="whitespace-nowrap">Cloud Cover</span>
                          <Activity className="w-4.5 h-4.5 text-amber-600 shrink-0" />
                        </div>
                        <div className="text-2xl font-bold text-zinc-900 font-mono">
                          {searchResult.weather.avg_cloud_cover_pct || 15}% <span className="text-xs font-semibold text-zinc-400 font-sans">Cloudiness</span>
                        </div>
                        <p className="text-xs text-zinc-500 font-medium whitespace-nowrap truncate">Daytime Cloud Cover</p>
                      </div>
                    </div>

                    {/* Dual-Axis Intraday Power & Weather Chart */}
                    <div className="bg-white border border-zinc-200/90 rounded-2xl p-7 space-y-4 shadow-xs">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div>
                          <h3 className="text-lg font-bold text-zinc-900">Today's Hourly Power & Weather ({searchResult.weather.location_name})</h3>
                          <p className="text-xs text-zinc-500 mt-1 font-medium">Hourly solar sunlight (W/m²), power output (kW), and cloud cover (%) from 6 AM to 6 PM.</p>
                        </div>
                        <span className="text-xs font-mono font-bold px-3.5 py-1.5 rounded-lg bg-zinc-100 text-zinc-800 border border-zinc-200">
                          6 AM – 6 PM
                        </span>
                      </div>

                      <div className="h-96 w-full pt-3">
                        <ResponsiveContainer width="100%" height="100%">
                          <ComposedChart data={searchResult.weather.hourly || []} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" vertical={false} />
                            <XAxis dataKey="time" stroke="#71717a" tick={{ fontSize: 12 }} />
                            <YAxis yAxisId="left" stroke="#71717a" tick={{ fontSize: 12 }} />
                            <YAxis yAxisId="right" orientation="right" domain={[0, 100]} stroke="#ef4444" tick={{ fontSize: 12 }} unit="%" />
                            <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e4e4e7', color: '#09090b', borderRadius: '10px', fontSize: '13px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.08)' }} />
                            <Legend wrapperStyle={{ fontSize: '13px', paddingTop: '14px' }} />
                            <Bar yAxisId="left" dataKey="expected_power_kw" name="Expected Power Output (kW)" fill="#fbbf24" radius={[4, 4, 0, 0]} />
                            <Bar yAxisId="left" dataKey="raw_irradiance_w_m2" name="Solar Irradiance (W/m²)" fill="#a1a1aa" radius={[4, 4, 0, 0]} />
                            <Line yAxisId="right" type="monotone" dataKey="cloud_cover_pct" name="Cloud Cover (%)" stroke="#ef4444" strokeWidth={2.2} dot={false} />
                          </ComposedChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* Hourly Operations & Telemetry Matrix Table */}
                    <div className="bg-white border border-zinc-200/90 rounded-2xl p-7 space-y-4 shadow-xs">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-bold text-zinc-900">Today's Hourly Power Breakdown</h3>
                          <p className="text-xs text-zinc-500 mt-1 font-medium">Hourly breakdown of sunlight, expected power generation, temperature, and cloud cover.</p>
                        </div>
                        <span className="text-xs font-mono font-bold px-3 py-1 rounded-md bg-zinc-100 text-zinc-700 border border-zinc-200">
                          100 kW System
                        </span>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm border-collapse">
                          <thead>
                            <tr className="border-b border-zinc-200 text-zinc-600 font-bold text-xs uppercase tracking-wider">
                              <th className="py-3.5 px-4">Time Window</th>
                              <th className="py-3.5 px-4">Irradiance (W/m²)</th>
                              <th className="py-3.5 px-4">Cloud Cover (%)</th>
                              <th className="py-3.5 px-4">Temp (°C)</th>
                              <th className="py-3.5 px-4">Expected Power (kW)</th>
                              <th className="py-3.5 px-4">Operational Phase</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-zinc-100 font-mono text-xs">
                            {searchResult.weather.hourly?.map((h: any, idx: number) => {
                              const isPeak = h.hour >= 11 && h.hour <= 14;
                              const isRamp = (h.hour >= 8 && h.hour <= 10) || (h.hour >= 15 && h.hour <= 16);
                              return (
                                <tr key={idx} className={`transition ${isPeak ? 'bg-amber-50/50 font-semibold' : 'hover:bg-zinc-50/80'}`}>
                                  <td className="py-3.5 px-4 font-bold text-zinc-900 text-sm font-sans flex items-center gap-2">
                                    <Clock className={`w-4 h-4 ${isPeak ? 'text-amber-600' : 'text-zinc-400'}`} />
                                    {h.time}
                                  </td>
                                  <td className="py-3.5 px-4 text-zinc-700 font-bold">{h.raw_irradiance_w_m2} W/m²</td>
                                  <td className="py-3.5 px-4 text-zinc-600">{h.cloud_cover_pct}%</td>
                                  <td className="py-3.5 px-4 text-zinc-600">{h.temperature_c}°C</td>
                                  <td className="py-3.5 px-4 text-zinc-900 font-bold text-sm">{h.expected_power_kw} kW</td>
                                  <td className="py-3.5 px-4 font-sans">
                                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border inline-flex items-center gap-1.5 ${
                                      isPeak 
                                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                                        : isRamp 
                                          ? 'bg-amber-50 text-amber-900 border-amber-200' 
                                          : 'bg-zinc-100 text-zinc-600 border-zinc-200'
                                    }`}>
                                      <span className={`w-1.5 h-1.5 rounded-full ${isPeak ? 'bg-emerald-500' : isRamp ? 'bg-amber-500' : 'bg-zinc-400'}`}></span>
                                      {isPeak ? 'Peak Solar Window' : isRamp ? 'Optimal Ramping' : 'Low Sun Elevation'}
                                    </span>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>

                  </div>
                )}

              </div>
            )}
          </main>
        )}

        {/* SECTION 2: NISE GURGAON HISTORICAL RESEARCH HUB */}
        {activeSection === 'nise_hub' && (
          <main className="flex-1 max-w-7xl w-full mx-auto px-8 py-8 space-y-7">
            
            {/* NISE Header */}
            <div className="bg-white border border-zinc-200/90 rounded-2xl p-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs">
              <div className="space-y-1.5 max-w-3xl">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold uppercase px-3 py-1 rounded-md bg-zinc-100 text-zinc-800 border border-zinc-200">
                    NISE Gurgaon Research Site
                  </span>
                </div>
                <h3 className="text-xl font-bold text-zinc-900">
                  National Institute of Solar Energy Telemetry Analysis
                </h3>
                <p className="text-sm text-zinc-600 leading-relaxed font-medium">
                  Evaluating 10-minute sensor telemetry across 14 distinct PV panel technologies in Gurgaon, Haryana, India.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-xs font-mono font-semibold text-zinc-700 bg-zinc-50 px-4 py-3 rounded-xl border border-zinc-200">
                <span>10-Min Telemetry</span>
                <span className="text-zinc-300">|</span>
                <span>14 Tech Systems</span>
                <span className="text-zinc-300">|</span>
                <span>500 kW Pyranometer</span>
              </div>
            </div>

            {/* NISE Tab 1: Overview */}
            {niseTab === 'overview' && (
              <div className="space-y-7">
                
                {/* 5 KPI Metric Cards with Proportional Numbers */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
                  
                  <div className="bg-white border border-amber-200/80 rounded-xl p-5 space-y-2 shadow-xs border-t-4 border-t-amber-400">
                    <div className="flex items-center justify-between text-zinc-700 text-xs font-bold uppercase tracking-wider">
                      <span>Performance Ratio</span>
                      <Activity className="w-4.5 h-4.5 text-amber-600" />
                    </div>
                    <div className="text-2xl font-bold text-zinc-900">{overview?.performance_ratio_pct || '65.9'}%</div>
                    <p className="text-xs text-zinc-500 font-medium">Actual vs Expected Yield</p>
                  </div>

                  <div className="bg-white border border-zinc-200/90 rounded-xl p-5 space-y-2 shadow-xs">
                    <div className="flex items-center justify-between text-zinc-500 text-xs font-bold uppercase tracking-wider">
                      <span>Avg Power Output</span>
                      <Zap className="w-4.5 h-4.5 text-zinc-600" />
                    </div>
                    <div className="text-2xl font-bold text-zinc-900">{overview?.avg_actual_power_kw || '143.04'} <span className="text-xs font-semibold text-zinc-500">kW</span></div>
                    <p className="text-xs text-zinc-500 font-medium">Average per 10-min slot</p>
                  </div>

                  <div className="bg-white border border-zinc-200/90 rounded-xl p-5 space-y-2 shadow-xs">
                    <div className="flex items-center justify-between text-zinc-500 text-xs font-bold uppercase tracking-wider">
                      <span>Confirmed Issues</span>
                      <AlertTriangle className="w-4.5 h-4.5 text-amber-600" />
                    </div>
                    <div className="text-2xl font-bold text-zinc-900">{overview?.persistent_anomalies_count || '14'}</div>
                    <p className="text-xs text-zinc-500 font-medium">Drops lasting &gt;40 mins</p>
                  </div>

                  <div className="bg-white border border-zinc-200/90 rounded-xl p-5 space-y-2 shadow-xs">
                    <div className="flex items-center justify-between text-zinc-500 text-xs font-bold uppercase tracking-wider">
                      <span>Total Energy Lost</span>
                      <Clock className="w-4.5 h-4.5 text-zinc-500" />
                    </div>
                    <div className="text-2xl font-bold text-zinc-900">{overview?.total_energy_loss_kwh || '1041.01'} <span className="text-xs font-semibold text-zinc-500">kWh</span></div>
                    <p className="text-xs text-zinc-500 font-medium">Cumulative drop loss</p>
                  </div>

                  <div className="bg-white border border-zinc-200/90 rounded-xl p-5 space-y-2 shadow-xs">
                    <div className="flex items-center justify-between text-zinc-500 text-xs font-bold uppercase tracking-wider">
                      <span>Financial Loss</span>
                      <IndianRupee className="w-4.5 h-4.5 text-zinc-600" />
                    </div>
                    <div className="text-2xl font-bold text-zinc-900">₹{overview?.total_financial_loss_inr?.toLocaleString() || '8,328.08'}</div>
                    <p className="text-xs text-zinc-500 font-medium">Estimated @ ₹8.0 / kWh</p>
                  </div>
                </div>

                <div className="bg-white border border-zinc-200/90 rounded-2xl p-7 space-y-4 shadow-xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-zinc-900">NISE Telemetry: Real Power Output vs AI Baseline</h3>
                      <p className="text-xs text-zinc-500 mt-1 font-medium">Comparing real power output (kW) against XGBoost AI model baseline.</p>
                    </div>
                    <span className="text-xs font-mono font-bold px-3.5 py-1.5 rounded-lg bg-zinc-50 text-zinc-700 border border-zinc-200">10-Minute Intervals</span>
                  </div>
                  <div className="h-88 w-full pt-3">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={performance?.timeseries || []} margin={{ top: 10, right: 15, left: -10, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" vertical={false} />
                        <XAxis dataKey="timestamp" stroke="#71717a" tick={{ fontSize: 12 }} tickFormatter={t => t.split(' ')[1]} />
                        <YAxis stroke="#71717a" tick={{ fontSize: 12 }} />
                        <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e4e4e7', color: '#09090b', borderRadius: '10px', fontSize: '13px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.08)' }} />
                        <Legend wrapperStyle={{ fontSize: '13px', paddingTop: '14px' }} />
                        <Line type="monotone" dataKey="actual_power_kw" name="Real Output (kW)" stroke="#09090b" strokeWidth={2.2} dot={false} />
                        <Line type="monotone" dataKey="expected_power_kw" name="AI Expected Power (kW)" stroke="#d97706" strokeWidth={2} strokeDasharray="4 4" dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}

            {/* NISE Tab 2: Performance Models */}
            {niseTab === 'performance' && (
              <div className="space-y-7">
                <div className="bg-white border border-zinc-200/90 rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4 shadow-xs">
                  <div className="flex items-center gap-3.5">
                    <Sliders className="w-5 h-5 text-zinc-600" />
                    <label className="text-sm font-bold text-zinc-800">Select AI Regressor Model:</label>
                    <select
                      value={selectedModel}
                      onChange={e => setSelectedModel(e.target.value)}
                      className="bg-zinc-50 border border-zinc-200 text-zinc-900 text-sm font-semibold rounded-xl px-4 py-2.5 focus:outline-none focus:border-amber-500"
                    >
                      <option value="XGBoost">XGBoost Regressor (Tuned)</option>
                      <option value="Random Forest">Random Forest Regressor (Baseline)</option>
                    </select>
                  </div>
                  <div className="text-sm text-zinc-600 font-mono font-medium">
                    Validation Split: <span className="text-zinc-900 font-bold font-sans">80% Train / 20% Test</span>
                  </div>
                </div>

                <div className="bg-white border border-zinc-200/90 rounded-2xl p-7 space-y-4 shadow-xs">
                  <h3 className="text-lg font-bold text-zinc-900">AI Model Benchmark Matrix</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm border-collapse">
                      <thead>
                        <tr className="border-b border-zinc-200 text-zinc-600 font-bold text-xs uppercase tracking-wider">
                          <th className="py-4 px-4">AI Model</th>
                          <th className="py-4 px-4">Mean Absolute Error (MAE)</th>
                          <th className="py-4 px-4">Root Mean Squared Error (RMSE)</th>
                          <th className="py-4 px-4">R² Accuracy Score</th>
                          <th className="py-4 px-4">State</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-100">
                        {performance?.metrics?.map((m: any, idx: number) => {
                          const isSelected = (selectedModel === 'XGBoost' && m.Model.includes('XGBoost')) || 
                                             (selectedModel === 'Random Forest' && m.Model.includes('Random Forest'));
                          return (
                            <tr key={idx} className={`transition ${isSelected ? 'bg-amber-50/70 font-semibold' : 'hover:bg-zinc-50/80'}`}>
                              <td className="py-4 px-4 font-bold text-zinc-900 text-sm flex items-center gap-2.5">
                                <Layers className={`w-5 h-5 ${isSelected ? 'text-amber-600' : 'text-zinc-400'}`} />
                                {m.Model}
                              </td>
                              <td className="py-4 px-4 font-mono text-zinc-700 text-sm">{m.MAE} kW</td>
                              <td className="py-4 px-4 font-mono text-zinc-700 text-sm">{m.RMSE} kW</td>
                              <td className="py-4 px-4 font-mono font-bold text-zinc-900 text-base">{m.R2}</td>
                              <td className="py-4 px-4">
                                <span className={`text-xs font-bold px-3 py-1.5 rounded-lg border ${
                                  isSelected 
                                    ? 'bg-amber-100/80 text-amber-900 border-amber-200/90' 
                                    : 'bg-zinc-100 text-zinc-600 border-zinc-200'
                                }`}>
                                  {isSelected ? 'Active Model' : 'Comparison'}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* NISE Tab 3: Anomaly Monitor */}
            {niseTab === 'anomaly' && (
              <div className="space-y-7">
                
                {/* Pipeline Step Boxes with Soft Golden Warm Accent */}
                <div className="bg-white border border-zinc-200/90 rounded-2xl p-7 space-y-5 shadow-xs">
                  <h3 className="text-lg font-bold text-zinc-900">Anomaly Pipeline Architecture</h3>
                  
                  <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
                    
                    {/* Step 1 */}
                    <div className="flex-1 bg-zinc-50 border border-zinc-200 px-6 py-4 rounded-xl text-center shadow-2xs">
                      <div className="text-zinc-400 text-xs font-mono uppercase font-semibold">Step 1</div>
                      <div className="font-bold mt-1 text-sm text-zinc-900">Telemetry Stream</div>
                    </div>
                    
                    <ChevronRight className="w-5 h-5 mx-auto text-zinc-400 shrink-0 hidden md:block" />
                    
                    {/* Step 2 */}
                    <div className="flex-1 bg-zinc-50 border border-zinc-200 px-6 py-4 rounded-xl text-center shadow-2xs">
                      <div className="text-zinc-400 text-xs font-mono uppercase font-semibold">Step 2</div>
                      <div className="font-bold mt-1 text-sm text-zinc-900">XGBoost Baseline</div>
                    </div>
                    
                    <ChevronRight className="w-5 h-5 mx-auto text-zinc-400 shrink-0 hidden md:block" />
                    
                    {/* Step 3 */}
                    <div className="flex-1 bg-zinc-50 border border-zinc-200 px-6 py-4 rounded-xl text-center shadow-2xs">
                      <div className="text-zinc-400 text-xs font-mono uppercase font-semibold">Step 3</div>
                      <div className="font-bold mt-1 text-sm text-zinc-900">Power Drop Delta</div>
                    </div>
                    
                    <ChevronRight className="w-5 h-5 mx-auto text-zinc-400 shrink-0 hidden md:block" />
                    
                    {/* Step 4 */}
                    <div className="flex-1 bg-amber-50/70 border border-amber-200/80 px-5 py-4 rounded-xl text-center shadow-2xs">
                      <div className="text-amber-800 text-xs font-mono uppercase font-bold">Step 4</div>
                      <div className="font-bold mt-1 text-sm text-amber-950 whitespace-nowrap">40-Min Persistence</div>
                    </div>
                    
                  </div>
                </div>

                <div className="bg-white border border-zinc-200/90 rounded-2xl p-7 space-y-6 shadow-xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-zinc-900">Confirmed Persistent Power Drops</h3>
                      <p className="text-xs text-zinc-500 mt-1 font-medium">Filtering out transient cloud passing by requiring 40+ minute drop windows.</p>
                    </div>
                    <span className="text-xs font-bold px-3.5 py-1.5 rounded-lg bg-amber-50/80 text-amber-900 border border-amber-200/80">
                      {anomalies?.total_persistent_events || 14} Confirmed Anomalies
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {anomalies?.events?.map((ev: any) => (
                      <div key={ev.id} className="bg-zinc-50 border border-zinc-200/90 rounded-xl p-5 space-y-3.5 shadow-2xs">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-mono text-zinc-700 font-bold">{ev.timestamp}</span>
                          <span className="px-2.5 py-1 rounded-md bg-amber-100/80 text-amber-900 font-bold text-xs border border-amber-200/60">
                            {ev.duration_mins} Mins
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-3 py-3 border-y border-zinc-200 text-xs">
                          <div>
                            <span className="text-zinc-500 block text-xs font-semibold uppercase">Expected</span>
                            <span className="font-bold text-zinc-900 text-base">{ev.expected_power_kw} kW</span>
                          </div>
                          <div>
                            <span className="text-slate-500 block text-xs font-semibold uppercase">Actual Output</span>
                            <span className="font-bold text-amber-700 text-base">{ev.actual_power_kw} kW</span>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                          <div>
                            <span className="text-zinc-500 block text-xs font-medium">Energy Loss</span>
                            <span className="font-bold text-zinc-800 text-sm">{ev.energy_loss_kwh} kWh</span>
                          </div>
                          <div>
                            <span className="text-zinc-500 block text-xs font-medium">Financial Impact</span>
                            <span className="font-bold text-zinc-900 text-sm">₹{ev.financial_loss_inr}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* NISE Tab 4: SHAP XAI & 14 Technologies */}
            {niseTab === 'explainability' && (
              <div className="space-y-7">
                <div className="bg-white border border-zinc-200/90 rounded-2xl p-7 space-y-4 shadow-xs">
                  <div>
                    <h3 className="text-lg font-bold text-zinc-900">SHAP Feature Importance (Environmental Impacts)</h3>
                    <p className="text-xs text-zinc-500 mt-1 font-medium">Measuring relative influence of meteorological features on XGBoost output.</p>
                  </div>
                  <div className="h-88 w-full pt-3">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={explainability?.feature_importance || []} layout="vertical" margin={{ top: 5, right: 25, left: 170, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" horizontal={false} />
                        <XAxis type="number" stroke="#71717a" tick={{ fontSize: 12 }} />
                        <YAxis dataKey="feature" type="category" stroke="#18181b" tick={{ fontSize: 12, fontWeight: 600 }} width={165} />
                        <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e4e4e7', color: '#09090b', borderRadius: '10px', fontSize: '13px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.08)' }} />
                        <Bar dataKey="importance" fill="#09090b" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-white border border-zinc-200/90 rounded-2xl p-7 space-y-4 shadow-xs">
                  <div>
                    <h3 className="text-lg font-bold text-zinc-900">14 Solar Panel Technologies Comparison Table</h3>
                    <p className="text-xs text-zinc-500 mt-1 font-medium">Efficiency & inverter specifications across all NISE sub-arrays.</p>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm border-collapse">
                      <thead>
                        <tr className="border-b border-zinc-200 text-zinc-600 font-bold text-xs uppercase tracking-wider">
                          <th className="py-4 px-4">Solar Subsystem</th>
                          <th className="py-4 px-4">Technology Type</th>
                          <th className="py-4 px-4">Inverter Model</th>
                          <th className="py-4 px-4">Capacity (kWp)</th>
                          <th className="py-4 px-4">Performance Ratio (%)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-100">
                        {technologies?.technologies?.map((tech: any, idx: number) => (
                          <tr key={idx} className="hover:bg-zinc-50/80 transition">
                            <td className="py-4 px-4 font-bold text-zinc-900 text-sm">{tech.technology}</td>
                            <td className="py-4 px-4 text-zinc-600 text-sm">{tech.category}</td>
                            <td className="py-4 px-4 font-mono text-zinc-700 text-sm">{tech.inverters}</td>
                            <td className="py-4 px-4 font-mono font-semibold text-zinc-800 text-sm">{tech.capacity_kw} kW</td>
                            <td className="py-4 px-4 font-mono font-bold text-zinc-900 text-base">{tech.performance_ratio_pct}%</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

          </main>
        )}

      </div>
    </div>
  );
}
