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
  RefreshCw
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
  Bar 
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
          
          {/* Section 1: Live Operations */}
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
              Any-Location Predictor
            </button>
          </div>

          {/* Section 2: NISE Research Telemetry */}
          <div className="space-y-2">
            <div className="px-3 text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider">
              NISE Gurgaon Telemetry
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
              Plant KPIs & Overview
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
              AI Regressor Models
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
              Issue & Drop Monitor
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
              SHAP XAI & Techs
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
                        Solar Generation Forecast & Weather Outlook
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

                  {/* 4 KPI Metrics Cards with Proportional Numbers */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
                    
                    <div className="bg-zinc-50 border border-zinc-200/90 rounded-xl p-5 space-y-2 shadow-2xs">
                      <div className="flex items-center justify-between text-zinc-600 text-xs font-bold uppercase tracking-wider">
                        <span>Planned Capacity</span>
                        <Building className="w-4.5 h-4.5 text-zinc-500" />
                      </div>
                      <div className="text-2xl font-bold text-zinc-900">
                        {searchResult.weather.system_size_kw} <span className="text-xs font-semibold text-zinc-500">kWp</span>
                      </div>
                      <p className="text-xs text-zinc-500 font-medium">Specified PV System Size</p>
                    </div>

                    <div className="bg-white border border-amber-200/80 rounded-xl p-5 space-y-2 shadow-2xs border-t-4 border-t-amber-400">
                      <div className="flex items-center justify-between text-zinc-700 text-xs font-bold uppercase tracking-wider">
                        <span>Daily Generation</span>
                        <Zap className="w-4.5 h-4.5 text-amber-600" />
                      </div>
                      <div className="text-2xl font-bold text-zinc-900">
                        {searchResult.weather.expected_generation_kwh} <span className="text-xs font-semibold text-zinc-500">kWh</span>
                      </div>
                      <p className="text-xs text-zinc-500 font-medium">Estimated Daily Output</p>
                    </div>

                    <div className="bg-zinc-50 border border-zinc-200/90 rounded-xl p-5 space-y-2 shadow-2xs">
                      <div className="flex items-center justify-between text-zinc-600 text-xs font-bold uppercase tracking-wider">
                        <span>Peak Noon Power</span>
                        <Activity className="w-4.5 h-4.5 text-amber-600" />
                      </div>
                      <div className="text-2xl font-bold text-zinc-900">
                        {searchResult.weather.expected_peak_kw} <span className="text-xs font-semibold text-zinc-500">kW</span>
                      </div>
                      <p className="text-xs text-zinc-500 font-medium">Max Hourly Power Output</p>
                    </div>

                    <div className="bg-zinc-50 border border-zinc-200/90 rounded-xl p-5 space-y-2 shadow-2xs">
                      <div className="flex items-center justify-between text-zinc-600 text-xs font-bold uppercase tracking-wider">
                        <span>Solar Index</span>
                        <Sparkles className="w-4.5 h-4.5 text-amber-600" />
                      </div>
                      <div className="text-2xl font-bold text-zinc-900">
                        {searchResult.weather.solar_potential_pct}%
                      </div>
                      <p className="text-xs text-zinc-500 font-medium">Clear-Sky Efficiency Rating</p>
                    </div>

                  </div>
                </div>

                {/* Hourly Power Forecast Chart */}
                <div className="bg-white border border-zinc-200/90 rounded-2xl p-7 space-y-4 shadow-xs">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div>
                      <h3 className="text-lg font-bold text-zinc-900">Hourly Power Output Curve ({searchResult.weather.location_name})</h3>
                      <p className="text-xs text-zinc-500 mt-1 font-medium">Shortwave solar radiation (W/m²) mapped to plant capacity.</p>
                    </div>
                    <span className="text-xs font-mono font-bold px-3.5 py-1.5 rounded-lg bg-zinc-100 text-zinc-800 border border-zinc-200">
                      Daylight Window (06:00 – 18:00)
                    </span>
                  </div>

                  <div className="h-88 w-full pt-3">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={searchResult.weather.hourly || []} margin={{ top: 10, right: 15, left: -10, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" vertical={false} />
                        <XAxis dataKey="time" stroke="#71717a" tick={{ fontSize: 12 }} />
                        <YAxis stroke="#71717a" tick={{ fontSize: 12 }} />
                        <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e4e4e7', color: '#09090b', borderRadius: '10px', fontSize: '13px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.08)' }} />
                        <Legend wrapperStyle={{ fontSize: '13px', paddingTop: '14px' }} />
                        <Bar dataKey="expected_power_kw" name="Expected Power Output (kW)" fill="#d97706" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="raw_irradiance_w_m2" name="Solar Irradiance (W/m²)" fill="#a1a1aa" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

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

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {anomalies?.events?.slice(0, 6).map((ev: any) => (
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
