
import React, { useState, useEffect } from 'react';
import { SpinnerIcon } from './icons/SpinnerIcon';
import type { ReportData, ParsedReport, UserInput, MedicalFacility } from '../types';
import { MicroscopeIcon } from './icons/MicroscopeIcon';
import { FirstAidIcon } from './icons/FirstAidIcon';
import { ShieldIcon } from './icons/ShieldIcon';
import { DownloadIcon } from './icons/DownloadIcon';
import { ShareIcon } from './icons/ShareIcon';
import { PdfIcon } from './icons/PdfIcon';
import { MapIcon } from './icons/MapIcon';
import { JsonIcon } from './icons/JsonIcon';
import { ExternalLinkIcon } from './icons/ExternalLinkIcon';
import { ThumbsUpIcon } from './icons/ThumbsUpIcon';
import { ThumbsDownIcon } from './icons/ThumbsDownIcon';
import { DiagnosisChart, RiskGauge, FacilityPriorityChart } from './Visualizations';

const Placeholder: React.FC = () => (
    <div className="text-center p-8 border-2 border-dashed border-slate-600 rounded-lg h-full flex flex-col justify-center items-center min-h-[400px]">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-slate-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h3 className="text-lg font-medium text-slate-300">Awaiting Analysis</h3>
        <p className="text-slate-500 mt-1">Submit case details to generate the risk assessment report.</p>
    </div>
);

const FormattedReport: React.FC<{ 
  report: ParsedReport; 
  locationContext: string; 
  patientName?: string;
  gender?: string;
  environmentalFactors?: string[];
}> = ({ report, locationContext, patientName, gender, environmentalFactors }) => {
  const getRiskColor = (level: string) => {
    switch (level) {
      case 'CRITICAL': return 'bg-red-500';
      case 'HIGH': return 'bg-orange-500';
      case 'MODERATE': return 'bg-yellow-500';
      default: return 'bg-green-500';
    }
  };

  const generateResourceLink = (query: string) => {
    return `https://www.google.com/search?q=${encodeURIComponent(query + ' guidelines WHO NCDC Nigeria')}`;
  };

  const [facilitySearch, setFacilitySearch] = useState('');
  const [selectedFacility, setSelectedFacility] = useState<MedicalFacility | null>(null);
  const [showChart, setShowChart] = useState(true);
  const [isMapLoading, setIsMapLoading] = useState(true);

  const filteredFacilities = report.facilities.filter(f => 
    f["Facility Name"].toLowerCase().includes(facilitySearch.toLowerCase()) ||
    f["Location / Address"].toLowerCase().includes(facilitySearch.toLowerCase())
  );

  // Dynamic map query: if a facility is selected, show it specifically. Otherwise show general context.
  const mapQuery = selectedFacility 
    ? `${selectedFacility["Facility Name"]}, ${selectedFacility["Location / Address"]}`
    : `Hospitals in ${locationContext}`;

  // Only force info window (iwloc=A) if a specific facility is selected. 
  // Otherwise, let the map show multiple clickable pins for exploration.
  const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&t=&z=${selectedFacility ? '15' : '13'}&ie=UTF8&output=embed${selectedFacility ? '&iwloc=A' : ''}`;

  useEffect(() => {
    setIsMapLoading(true);
  }, [mapQuery]);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-700 pb-4">
          <div>
             <h3 className="text-slate-400 text-xs uppercase tracking-wider font-semibold">Assessment For</h3>
             <div className="flex items-baseline gap-2">
                <p className="text-xl font-bold text-white">{patientName || 'Anonymous Patient'}</p>
                {gender && <span className="text-sm text-cyan-400 font-medium px-2 py-0.5 rounded bg-cyan-900/30 border border-cyan-800">{gender}</span>}
             </div>
          </div>
          <div className="text-right">
             <h3 className="text-slate-400 text-xs uppercase tracking-wider font-semibold">Location Context</h3>
             <p className="text-slate-300 text-sm">{locationContext}</p>
          </div>
      </div>

      {/* Risk Score Card */}
      <div className={`p-4 rounded-lg ${getRiskColor(report.riskLevel)} bg-opacity-10 border border-${getRiskColor(report.riskLevel).replace('bg-', '')}/30 flex flex-col sm:flex-row items-center gap-4`}>
        <div className="flex-shrink-0">
             <RiskGauge level={report.riskLevel} />
        </div>
        <div className="flex-1 text-center sm:text-left">
            <h3 className="text-sm uppercase tracking-wider font-semibold text-slate-400">Overall Risk Level</h3>
            <p className={`text-3xl font-bold ${getRiskColor(report.riskLevel).replace('bg-', 'text-')}`}>
              {report.riskLevel}
            </p>
            <p className="text-xs text-slate-400 mt-1 max-w-md">
                Based on symptom severity, environmental factors, and active local alerts.
            </p>
        </div>
      </div>

      {/* Environmental Context Section */}
      {environmentalFactors && environmentalFactors.length > 0 && (
        <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-4">
           <div className="flex items-center gap-2 mb-3">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
             </svg>
             <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Environmental Context</h3>
           </div>
           <div className="flex flex-wrap gap-2">
             {environmentalFactors.map((factor, i) => (
               <span key={i} className="px-3 py-1 rounded-full bg-slate-700 text-cyan-300 text-xs font-medium border border-slate-600 shadow-sm flex items-center gap-1">
                 <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                 {factor}
               </span>
             ))}
           </div>
        </div>
      )}

      {/* Diagnoses Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <MicroscopeIcon className="w-5 h-5 text-cyan-400" />
            <h3 className="text-lg font-semibold text-white">Likely Diagnoses</h3>
          </div>
          <button 
            onClick={() => setShowChart(!showChart)}
            className="text-xs text-cyan-400 hover:text-cyan-300 underline"
          >
            {showChart ? 'Hide Chart' : 'Show Chart'}
          </button>
        </div>
        
        {/* Chart Container */}
        {showChart && (
            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 mb-4">
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Confidence Analysis</h4>
                <DiagnosisChart data={report.diagnoses} />
            </div>
        )}

        <div className="space-y-3">
          {report.diagnoses.map((d, i) => (
            <div key={i} className="bg-slate-800 p-3 rounded border-l-4 border-cyan-500">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-200">{d.name}</span>
                  <a 
                    href={generateResourceLink(d.name + ' diagnosis treatment')} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-cyan-500 hover:text-cyan-300 transition-colors opacity-70 hover:opacity-100"
                    title={`External resources for ${d.name}`}
                    aria-label={`Search for ${d.name} treatment guidelines`}
                  >
                    <ExternalLinkIcon className="w-4 h-4" />
                  </a>
                </div>
                <span className="text-xs font-mono bg-slate-700 px-2 py-0.5 rounded text-cyan-300">{(d.confidence * 100).toFixed(0)}% Conf.</span>
              </div>
              <p className="text-sm text-slate-400 mt-1">{d.rationale}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Action Plan Section */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <ShieldIcon className="w-5 h-5 text-emerald-400" />
          <h3 className="text-lg font-semibold text-white">Action Plan</h3>
        </div>
        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 text-slate-300 text-sm leading-relaxed">
          {report.urgentActionPlan}
        </div>
        
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-800 p-4 rounded-lg">
                <h4 className="text-emerald-400 font-medium mb-2 text-sm uppercase">Immediate First Aid</h4>
                <ul className="space-y-2">
                    {report.firstAid.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                        <span className="text-emerald-500 mt-1">•</span>
                        <span className="flex-1">{item}</span>
                        <a 
                          href={generateResourceLink(item + ' first aid')} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-slate-500 hover:text-emerald-400 transition-colors mt-0.5 flex-shrink-0 opacity-70 hover:opacity-100"
                          title="First Aid Guidelines"
                          aria-label={`Search first aid guidelines for ${item}`}
                        >
                          <ExternalLinkIcon className="w-3 h-3" />
                        </a>
                      </li>
                    ))}
                </ul>
            </div>
            <div className="bg-slate-800 p-4 rounded-lg">
                <h4 className="text-blue-400 font-medium mb-2 text-sm uppercase">Prevention</h4>
                <ul className="space-y-2">
                    {report.preventiveMeasures.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                        <span className="text-blue-500 mt-1">•</span>
                        <span className="flex-1">{item}</span>
                        <a 
                          href={generateResourceLink(item)} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-slate-500 hover:text-blue-400 transition-colors mt-0.5 flex-shrink-0 opacity-70 hover:opacity-100"
                          title="Prevention Guidelines (WHO/NCDC)"
                          aria-label={`Search prevention guidelines for ${item} on WHO or NCDC`}
                        >
                          <ExternalLinkIcon className="w-3 h-3" />
                        </a>
                      </li>
                    ))}
                </ul>
            </div>
        </div>
      </div>

      {/* Facilities Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
                <FirstAidIcon className="w-5 h-5 text-red-400" />
                <h3 className="text-lg font-semibold text-white">Recommended Facilities</h3>
            </div>
        </div>

        {/* Facility Stats Chart */}
        <div className="mb-4">
            <FacilityPriorityChart facilities={report.facilities} />
        </div>

        <div className="mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search facilities by name or location..."
              value={facilitySearch}
              onChange={(e) => setFacilitySearch(e.target.value)}
              className="w-full bg-slate-800 border border-slate-600 text-slate-200 text-sm rounded-md py-2 pl-10 pr-4 focus:ring-2 focus:ring-cyan-500 focus:outline-none placeholder-slate-500"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
               <svg className="h-4 w-4 text-slate-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
               </svg>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto rounded-t-lg border border-slate-700 max-h-64 overflow-y-auto custom-scrollbar">
            <table className="w-full text-left text-sm text-slate-400">
                <thead className="bg-slate-800 text-slate-200 uppercase font-medium text-xs sticky top-0 z-10">
                    <tr>
                        <th className="px-4 py-2 bg-slate-800">Facility</th>
                        <th className="px-4 py-2 bg-slate-800">Location</th>
                        <th className="px-4 py-2 bg-slate-800">Priority</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-700 bg-slate-900/30">
                    {filteredFacilities.length > 0 ? (
                      filteredFacilities.map((f, i) => (
                        <tr 
                          key={i} 
                          onClick={() => setSelectedFacility(f === selectedFacility ? null : f)}
                          className={`cursor-pointer transition-colors ${
                            f === selectedFacility 
                              ? 'bg-cyan-900/30 border-l-2 border-cyan-500' 
                              : 'hover:bg-slate-800/50 border-l-2 border-transparent'
                          }`}
                          title={f["Location / Address"]}
                        >
                            <td className="px-4 py-3 font-medium text-slate-300">{f["Facility Name"]}</td>
                            <td className="px-4 py-3">{f["Location / Address"]}</td>
                            <td className="px-4 py-3">
                                <span className={`px-2 py-0.5 rounded text-xs ${f["Priority Level"] === 'High' ? 'bg-red-900/30 text-red-400' : 'bg-slate-700 text-slate-300'}`}>
                                    {f["Priority Level"]}
                                </span>
                            </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={3} className="px-4 py-8 text-center text-slate-500">
                          No facilities found matching "{facilitySearch}"
                        </td>
                      </tr>
                    )}
                </tbody>
            </table>
        </div>
        <p className="text-[10px] text-slate-500 mt-1 text-right italic">Click a row to locate facility on map</p>

        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-slate-400 text-sm">
                <MapIcon className="w-4 h-4 text-slate-500" />
                <span>{selectedFacility ? `Locating: ${selectedFacility["Facility Name"]}` : 'Nearby Healthcare Map'}</span>
            </div>
            {selectedFacility && (
                <button 
                    onClick={() => setSelectedFacility(null)}
                    className="text-xs text-cyan-400 hover:text-cyan-300 underline"
                >
                    Reset View
                </button>
            )}
          </div>
          
          <div className={`rounded-lg overflow-hidden border h-64 w-full bg-slate-800 relative group transition-all duration-300 ${selectedFacility ? 'border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.15)]' : 'border-slate-700'}`}>
            
            {isMapLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-800 z-20">
                    <SpinnerIcon className="w-8 h-8 text-cyan-500 animate-spin mb-2" />
                    <span className="text-xs text-slate-500">Loading map view...</span>
                </div>
            )}

            <iframe
                key={mapQuery}
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                marginHeight={0}
                marginWidth={0}
                src={mapUrl}
                title="Facility Map"
                loading="lazy"
                onLoad={() => setIsMapLoading(false)}
                className={`w-full h-full transition-opacity duration-500 ${isMapLoading ? 'opacity-0' : (selectedFacility ? 'opacity-100' : 'opacity-80 hover:opacity-100')}`}
                style={{ filter: 'invert(90%) hue-rotate(180deg)' }}
            ></iframe>

            {!selectedFacility && !isMapLoading && (
                <a 
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-2 right-2 bg-slate-900/80 hover:bg-cyan-900/80 text-slate-200 hover:text-white text-[10px] font-medium px-2 py-1 rounded border border-slate-600 shadow-lg flex items-center gap-1 transition-all z-10"
                    title="Open in Google Maps for reviews and details"
                >
                    <ExternalLinkIcon className="w-3 h-3" />
                    Open Full Map
                </a>
            )}
            
            {!isMapLoading && (selectedFacility ? (
              <div className="absolute bottom-2 left-2 right-2 bg-slate-900/95 backdrop-blur-md border border-slate-600 p-3 rounded shadow-2xl z-10 animate-in slide-in-from-bottom-2">
                 <div className="flex justify-between items-start gap-3">
                    <div>
                        <h4 className="font-bold text-cyan-400 text-sm">{selectedFacility["Facility Name"]}</h4>
                        <p className="text-xs text-slate-300 mt-0.5">{selectedFacility["Location / Address"]}</p>
                        <span className="inline-block mt-1.5 text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                          Priority: {selectedFacility["Priority Level"]}
                        </span>
                    </div>
                    <a 
                        href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(selectedFacility["Facility Name"] + ' ' + selectedFacility["Location / Address"])}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-cyan-600 hover:bg-cyan-700 text-white px-3 py-1.5 rounded text-xs font-medium flex items-center gap-1.5 transition-colors shadow-lg"
                    >
                        <MapIcon className="w-3 h-3" /> 
                        <span>Directions</span>
                    </a>
                 </div>
              </div>
            ) : (
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-[10px] text-slate-400 p-1 text-center pointer-events-none transition-opacity opacity-100 group-hover:opacity-0">
                  Map view showing facilities near {locationContext}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

interface ReportDisplayProps {
  report: ReportData | null;
  isLoading: boolean;
  error: string | null;
  userInput: UserInput;
}

export const ReportDisplay: React.FC<ReportDisplayProps> = ({ report, isLoading, error, userInput }) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-slate-400">
        <SpinnerIcon className="w-12 h-12 text-cyan-500 animate-spin mb-4" />
        <p className="text-lg font-medium text-slate-300">Analyzing Health Data...</p>
        <p className="text-sm mt-2 opacity-75">Cross-referencing symptoms with local alerts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-red-400 p-8 text-center border-2 border-dashed border-red-900/50 rounded-lg bg-red-900/10">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <h3 className="text-xl font-bold mb-2">Analysis Failed</h3>
        <p className="text-slate-300 mb-4 max-w-md">{error}</p>
        <p className="text-xs text-slate-500">Please check your connection and try again.</p>
      </div>
    );
  }

  if (!report || !report.parsedReport) {
    return <Placeholder />;
  }

  const locationContext = userInput.lga === 'All' 
    ? `${userInput.state} State` 
    : `${userInput.lga}, ${userInput.state}`;

  return (
    <div className="bg-slate-900 h-full overflow-y-auto custom-scrollbar rounded-lg border border-slate-800 shadow-2xl">
      <div className="p-6 bg-slate-800/50 min-h-full">
         <div className="flex justify-end gap-2 mb-4 no-print">
            <button className="p-2 rounded hover:bg-slate-700 text-slate-400 hover:text-white transition-colors" title="Print Report" onClick={() => window.print()}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
            </button>
            <button className="p-2 rounded hover:bg-slate-700 text-slate-400 hover:text-white transition-colors" title="Share" onClick={() => {
                const data = btoa(unescape(encodeURIComponent(JSON.stringify(userInput))));
                const url = `${window.location.origin}${window.location.pathname}?share=${data}`;
                navigator.clipboard.writeText(url).then(() => alert('Link copied to clipboard!'));
            }}>
                <ShareIcon className="w-5 h-5" />
            </button>
         </div>

         <FormattedReport 
            report={report.parsedReport} 
            locationContext={locationContext}
            patientName={userInput.patientName}
            gender={userInput.gender}
            environmentalFactors={userInput.context.factors}
         />
      </div>
    </div>
  );
};
