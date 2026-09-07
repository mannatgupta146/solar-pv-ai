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
  Sliders
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

export default function App() {
  const [activeTab, setActiveTab] = useState<'overview' | 'performance' | 'anomaly' | 'explainability'>('overview');
  const [overview, setOverview] = useState<any>(null);
  const [performance, setPerformance] = useState<any>(null);
  const [anomalies, setAnomalies] = useState<any>(null);
  const [explainability, setExplainability] = useState<any>(null);
  const [technologies, setTechnologies] = useState<any>(null);
  const [selectedModel, setSelectedModel] = useState<string>('XGBoost');

  useEffect(() => {
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

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-slate-900 flex flex-col font-sans selection:bg-amber-100">
      {/* Header Bar */}
      <header className="border-b border-slate-200/80 bg-white/90 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex flex-wrap items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-3.5">
          <div className="bg-amber-500 text-white p-2.5 rounded-xl shadow-xs flex items-center justify-center">
            <Sun className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200/80 tracking-wider">NISE INDIA</span>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">Solar PV Research Analytics</h1>
            </div>
            <p className="text-sm text-slate-600 font-medium">Explainable ML Framework for Performance Monitoring & Anomaly Detection</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex bg-slate-100/80 border border-slate-200 rounded-xl p-1 gap-1.5">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-2.5 px-4.5 py-2.5 text-sm font-bold rounded-lg transition-all ${
              activeTab === 'overview' ? 'bg-white text-slate-900 shadow-xs border border-slate-200' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Gauge className="w-4.5 h-4.5 text-amber-600" />
            Overview
          </button>

          <button
            onClick={() => setActiveTab('performance')}
            className={`flex items-center gap-2.5 px-4.5 py-2.5 text-sm font-bold rounded-lg transition-all ${
              activeTab === 'performance' ? 'bg-white text-slate-900 shadow-xs border border-slate-200' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <LineChartIcon className="w-4.5 h-4.5 text-blue-600" />
            Performance & Models
          </button>

          <button
            onClick={() => setActiveTab('anomaly')}
            className={`flex items-center gap-2.5 px-4.5 py-2.5 text-sm font-bold rounded-lg transition-all ${
              activeTab === 'anomaly' ? 'bg-white text-slate-900 shadow-xs border border-slate-200' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <AlertTriangle className="w-4.5 h-4.5 text-amber-600" />
            Anomaly Monitor
          </button>

          <button
            onClick={() => setActiveTab('explainability')}
            className={`flex items-center gap-2.5 px-4.5 py-2.5 text-sm font-bold rounded-lg transition-all ${
              activeTab === 'explainability' ? 'bg-white text-slate-900 shadow-xs border border-slate-200' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BrainCircuit className="w-4.5 h-4.5 text-indigo-600" />
            XAI & Tech Benchmark
          </button>
        </nav>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8 space-y-6">

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="bg-white border border-slate-200/90 rounded-xl p-5 space-y-2 shadow-xs hover:shadow-md transition-all border-t-2 border-t-emerald-500">
                <div className="flex items-center justify-between text-slate-500 text-xs font-semibold uppercase tracking-wider">
                  <span>Performance Ratio</span>
                  <Activity className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-3xl font-extrabold text-slate-900 tracking-tight">{overview?.performance_ratio_pct || '65.9'}%</div>
                <p className="text-xs text-slate-500 font-medium">Actual vs Expected Power</p>
              </div>

              <div className="bg-white border border-slate-200/90 rounded-xl p-5 space-y-2 shadow-xs hover:shadow-md transition-all border-t-2 border-t-amber-500">
                <div className="flex items-center justify-between text-slate-500 text-xs font-semibold uppercase tracking-wider">
                  <span>Avg Actual Power</span>
                  <Zap className="w-4 h-4 text-amber-600" />
                </div>
                <div className="text-3xl font-extrabold text-slate-900 tracking-tight">{overview?.avg_actual_power_kw || '143.04'} <span className="text-xs font-semibold text-slate-500">kW</span></div>
                <p className="text-xs text-slate-500 font-medium">Mean 10-min AC Output</p>
              </div>

              <div className="bg-white border border-slate-200/90 rounded-xl p-5 space-y-2 shadow-xs hover:shadow-md transition-all border-t-2 border-t-amber-600">
                <div className="flex items-center justify-between text-slate-500 text-xs font-semibold uppercase tracking-wider">
                  <span>Persistent Events</span>
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                </div>
                <div className="text-3xl font-extrabold text-slate-900 tracking-tight">{overview?.persistent_anomalies_count || '14'}</div>
                <p className="text-xs text-slate-500 font-medium">40-min rolling anomalies</p>
              </div>

              <div className="bg-white border border-slate-200/90 rounded-xl p-5 space-y-2 shadow-xs hover:shadow-md transition-all border-t-2 border-t-slate-700">
                <div className="flex items-center justify-between text-slate-500 text-xs font-semibold uppercase tracking-wider">
                  <span>Energy Deficit</span>
                  <Clock className="w-4 h-4 text-slate-600" />
                </div>
                <div className="text-3xl font-extrabold text-slate-900 tracking-tight">{overview?.total_energy_loss_kwh || '1,041.01'} <span className="text-xs font-semibold text-slate-500">kWh</span></div>
                <p className="text-xs text-slate-500 font-medium">Cumulative energy loss</p>
              </div>

              <div className="bg-white border border-slate-200/90 rounded-xl p-5 space-y-2 shadow-xs hover:shadow-md transition-all border-t-2 border-t-blue-600">
                <div className="flex items-center justify-between text-slate-500 text-xs font-semibold uppercase tracking-wider">
                  <span>Financial Impact</span>
                  <IndianRupee className="w-4 h-4 text-blue-600" />
                </div>
                <div className="text-3xl font-extrabold text-slate-900 tracking-tight">₹{overview?.total_financial_loss_inr?.toLocaleString() || '8,328.08'}</div>
                <p className="text-xs text-slate-500 font-medium">Tariff @ ₹8.0/kWh</p>
              </div>
            </div>

            {/* Dataset Metadata Box */}
            <div className="bg-white border border-slate-200/90 rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs">
              <div className="space-y-1.5 max-w-3xl">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  Primary Dataset: National Institute of Solar Energy (NISE), India
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                  Real operational telemetry from 14 photovoltaic technologies and string inverter blocks in Gurgaon, Haryana, India. Analyzed across 1,028 timesteps at 10-minute intervals (June 21–27, 2026).
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3.5 text-sm font-mono text-slate-700 bg-slate-50 px-4.5 py-3 rounded-lg border border-slate-200">
                <span>Frequency: <strong className="text-slate-900 font-sans font-bold">10-Min</strong></span>
                <span className="text-slate-300">|</span>
                <span>Technologies: <strong className="text-slate-900 font-sans font-bold">14 Systems</strong></span>
                <span className="text-slate-300">|</span>
                <span>Irradiance: <strong className="text-slate-900 font-sans font-bold">500 kW Sensor</strong></span>
              </div>
            </div>

            {/* Time Series Chart */}
            <div className="bg-white border border-slate-200/90 rounded-xl p-6 space-y-4 shadow-xs">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Actual vs. ML Expected Solar Power Output</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Time-series power generation telemetry (kW) on NISE plant</p>
                </div>
                <span className="text-xs font-mono font-medium px-3 py-1 rounded bg-slate-50 text-slate-700 border border-slate-200">10-Minute Intervals</span>
              </div>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performance?.timeseries || []} margin={{ top: 10, right: 15, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.8} />
                    <XAxis dataKey="timestamp" stroke="#64748b" tick={{ fontSize: 11 }} tickFormatter={t => t.split(' ')[1]} />
                    <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
                    <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', color: '#0f172a', borderRadius: '8px', fontSize: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.08)' }} />
                    <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                    <Line type="monotone" dataKey="actual_power_kw" name="Actual AC Power (kW)" stroke="#0f172a" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="expected_power_kw" name="Model Expected Power (kW)" stroke="#d97706" strokeWidth={1.8} strokeDasharray="4 4" dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PERFORMANCE & MODELS */}
        {activeTab === 'performance' && (
          <div className="space-y-6">
            {/* Filters */}
            <div className="bg-white border border-slate-200/90 rounded-xl p-5 flex flex-wrap items-center justify-between gap-4 shadow-xs">
              <div className="flex items-center gap-3">
                <Sliders className="w-4.5 h-4.5 text-slate-600" />
                <label className="text-sm font-bold text-slate-800">Model Selector:</label>
                <select
                  value={selectedModel}
                  onChange={e => setSelectedModel(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-slate-900 text-sm font-semibold rounded-md px-3.5 py-2 focus:outline-none focus:border-amber-500"
                >
                  <option value="XGBoost">XGBoost Regressor (Tuned)</option>
                  <option value="Random Forest">Random Forest Regressor (Baseline)</option>
                </select>
              </div>

              <div className="text-sm text-slate-600 font-mono font-medium">
                Dataset Split: <span className="text-slate-900 font-bold font-sans">Chronological 80/20 Time-Series</span>
              </div>
            </div>

            {/* Metrics Table */}
            <div className="bg-white border border-slate-200/90 rounded-xl p-6 space-y-4 shadow-xs">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900">Model Evaluation Metrics Comparison</h3>
                <span className="text-xs font-mono font-semibold px-3 py-1 rounded bg-amber-50 text-amber-800 border border-amber-200">
                  Active Model: {selectedModel}
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-600 font-bold text-xs uppercase tracking-wider">
                      <th className="py-3.5 px-4">Regression Model</th>
                      <th className="py-3.5 px-4">MAE (kW)</th>
                      <th className="py-3.5 px-4">RMSE (kW)</th>
                      <th className="py-3.5 px-4">R² Score</th>
                      <th className="py-3.5 px-4">Selection Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {performance?.metrics?.map((m: any, idx: number) => {
                      const isSelected = (selectedModel === 'XGBoost' && m.Model.includes('XGBoost')) || 
                                         (selectedModel === 'Random Forest' && m.Model.includes('Random Forest'));
                      return (
                        <tr key={idx} className={`transition ${isSelected ? 'bg-amber-50/70 border-l-4 border-l-amber-500 font-bold' : 'hover:bg-slate-50/80'}`}>
                          <td className="py-4 px-4 font-bold text-slate-900 text-sm flex items-center gap-2">
                            <Layers className={`w-4.5 h-4.5 ${isSelected ? 'text-amber-600' : 'text-slate-400'}`} />
                            {m.Model}
                          </td>
                          <td className="py-4 px-4 font-mono text-slate-700 text-sm">{m.MAE}</td>
                          <td className="py-4 px-4 font-mono text-slate-700 text-sm">{m.RMSE}</td>
                          <td className="py-4 px-4 font-mono font-extrabold text-slate-900 text-base">{m.R2}</td>
                          <td className="py-4 px-4">
                            <span className={`text-xs font-bold px-3 py-1 rounded-md border ${
                              isSelected 
                                ? 'bg-amber-100 text-amber-900 border-amber-300 shadow-2xs' 
                                : 'bg-slate-100 text-slate-600 border-slate-200'
                            }`}>
                              {isSelected ? 'Active Model' : 'Baseline'}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Chart */}
            <div className="bg-white border border-slate-200/90 rounded-xl p-6 space-y-4 shadow-xs">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Actual vs. Model Predicted Generation Curve</h3>
                  <p className="text-xs text-slate-500 mt-0.5 font-medium">Time-series power generation telemetry (kW) vs. {selectedModel} Expected Model Curve</p>
                </div>
                <span className="text-xs font-mono font-semibold px-3 py-1 rounded bg-slate-50 text-slate-700 border border-slate-200">10-Minute Telemetry</span>
              </div>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performance?.timeseries || []} margin={{ top: 10, right: 15, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.8} />
                    <XAxis dataKey="timestamp" stroke="#64748b" tick={{ fontSize: 11 }} tickFormatter={t => t.split(' ')[1]} />
                    <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
                    <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', color: '#0f172a', borderRadius: '8px', fontSize: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.08)' }} />
                    <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                    <Line type="monotone" dataKey="actual_power_kw" name="Actual Power (kW)" stroke="#0f172a" strokeWidth={2} dot={false} />
                    <Line 
                      type="monotone" 
                      dataKey="expected_power_kw" 
                      name={`Expected Power (${selectedModel})`} 
                      stroke={selectedModel === 'Random Forest' ? "#2563eb" : "#d97706"} 
                      strokeWidth={2.2} 
                      strokeDasharray="4 4" 
                      dot={false} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ANOMALY MONITOR */}
        {activeTab === 'anomaly' && (
          <div className="space-y-6">
            {/* Flowchart Architecture */}
            <div className="bg-white border border-slate-200/90 rounded-xl p-6 space-y-4 shadow-xs">
              <h3 className="text-base font-bold text-slate-900">Physics-Informed Anomaly Detection Pipeline</h3>
              <div className="grid grid-cols-1 md:grid-cols-7 gap-2 items-center text-center text-xs font-medium">
                <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl text-slate-800 shadow-2xs">
                  <div className="text-slate-500 text-[10px] font-mono font-semibold uppercase">Step 1</div>
                  <div className="font-bold mt-1 text-sm text-slate-900">Actual Telemetry</div>
                </div>
                <ChevronRight className="w-4 h-4 mx-auto text-slate-400 hidden md:block" />
                <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl text-slate-800 shadow-2xs">
                  <div className="text-slate-500 text-[10px] font-mono font-semibold uppercase">Step 2</div>
                  <div className="font-bold mt-1 text-sm text-slate-900">XGBoost Model</div>
                </div>
                <ChevronRight className="w-4 h-4 mx-auto text-slate-400 hidden md:block" />
                <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl text-slate-800 shadow-2xs">
                  <div className="text-slate-500 text-[10px] font-mono font-semibold uppercase">Step 3</div>
                  <div className="font-bold mt-1 text-sm text-slate-900">Expected Power</div>
                </div>
                <ChevronRight className="w-4 h-4 mx-auto text-slate-400 hidden md:block" />
                <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-xl text-amber-900 shadow-2xs">
                  <div className="text-amber-700 text-[10px] font-mono font-semibold uppercase">Step 4</div>
                  <div className="font-bold mt-1 text-sm text-amber-950">40-Min Persistence</div>
                </div>
              </div>
            </div>

            {/* Anomaly Cards Section */}
            <div className="bg-white border border-slate-200/90 rounded-xl p-6 space-y-5 shadow-xs">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Persistent Anomalous Periods</h3>
                  <p className="text-xs text-slate-500 mt-0.5 font-medium">40-minute window filtering (suppresses transient cloud flags by 50%)</p>
                </div>
                <span className="text-xs font-bold px-3.5 py-1 rounded-lg bg-amber-50 text-amber-900 border border-amber-200/80">
                  {anomalies?.total_persistent_events || 14} Events Detected
                </span>
              </div>

              {/* 3-Column Grid Layout */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {anomalies?.events?.slice(0, 6).map((ev: any) => (
                  <div key={ev.id} className="bg-slate-50/70 border border-slate-200 rounded-xl p-5 space-y-4 hover:border-amber-300 hover:shadow-xs transition-all border-l-4 border-l-amber-500">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono text-slate-600 font-semibold">{ev.timestamp}</span>
                      <span className="px-2.5 py-0.5 rounded-md bg-amber-100/80 text-amber-900 font-bold border border-amber-200 text-[11px]">
                        {ev.duration_mins} Min Event
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 py-3 border-y border-slate-200/80 text-xs">
                      <div className="space-y-1">
                        <span className="text-slate-500 block text-[11px] font-semibold uppercase tracking-wider">Expected Power</span>
                        <span className="font-extrabold text-slate-900 text-base">{ev.expected_power_kw} kW</span>
                      </div>
                      <div className="space-y-1">
                        <span className="text-slate-500 block text-[11px] font-semibold uppercase tracking-wider">Actual Output</span>
                        <span className="font-extrabold text-amber-800 text-base">{ev.actual_power_kw} kW</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs pt-0.5">
                      <div>
                        <span className="text-slate-500 block text-[11px] font-medium">Deficit</span>
                        <span className="font-bold text-slate-800">{ev.energy_loss_kwh} kWh</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[11px] font-medium">Financial Impact</span>
                        <span className="font-bold text-slate-900">₹{ev.financial_loss_inr}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: EXPLAINABILITY & TECH BENCHMARK */}
        {activeTab === 'explainability' && (
          <div className="space-y-6">
            {/* SHAP Feature Importance Chart */}
            <div className="bg-white border border-slate-200/90 rounded-xl p-6 space-y-4 shadow-xs">
              <div>
                <h3 className="text-lg font-bold text-slate-900">TreeSHAP Feature Attributions</h3>
                <p className="text-sm text-slate-600 mt-0.5 font-medium">Quantifies feature influence on expected solar AC power generation</p>
              </div>

              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={explainability?.feature_importance || []} layout="vertical" margin={{ top: 5, right: 25, left: 170, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.8} />
                    <XAxis type="number" stroke="#64748b" tick={{ fontSize: 12 }} />
                    <YAxis dataKey="feature" type="category" stroke="#334155" tick={{ fontSize: 12, fontWeight: 600 }} width={165} />
                    <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', color: '#0f172a', borderRadius: '8px', fontSize: '13px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.08)' }} />
                    <Bar dataKey="importance" fill="#475569" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* NISE 14 Technology Benchmark Table */}
            <div className="bg-white border border-slate-200/90 rounded-xl p-6 space-y-4 shadow-xs">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Technology Performance Benchmark (14 NISE Subsystems)</h3>
                <p className="text-sm text-slate-600 mt-0.5 font-medium">Comparative Performance Ratio across Solar Photovoltaic Technologies under Indian Operating Conditions</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-600 font-bold text-xs uppercase tracking-wider">
                      <th className="py-3.5 px-4">PV Technology</th>
                      <th className="py-3.5 px-4">Category</th>
                      <th className="py-3.5 px-4">Inverter Specs</th>
                      <th className="py-3.5 px-4">Capacity (kWp)</th>
                      <th className="py-3.5 px-4">Performance Ratio %</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {technologies?.technologies?.map((tech: any, idx: number) => (
                      <tr key={idx} className="hover:bg-slate-50/80 transition">
                        <td className="py-4 px-4 font-bold text-slate-900 text-sm">{tech.technology}</td>
                        <td className="py-4 px-4 text-slate-600 font-sans text-sm">{tech.category}</td>
                        <td className="py-4 px-4 font-mono text-slate-700 text-sm">{tech.inverters}</td>
                        <td className="py-4 px-4 font-mono text-slate-800 font-semibold text-sm">{tech.capacity_kw} kW</td>
                        <td className="py-4 px-4 font-mono font-extrabold text-slate-900 text-base">{tech.performance_ratio_pct}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}



