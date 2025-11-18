
import React, { useState } from 'react';
import { SpinnerIcon } from './icons/SpinnerIcon';
import type { ReportData, ParsedReport } from '../types';
import { MicroscopeIcon } from './icons/MicroscopeIcon';
import { FirstAidIcon } from './icons/FirstAidIcon';
import { ShieldIcon } from './icons/ShieldIcon';

const Placeholder: React.FC = () => (
    <div className="text-center p-8 border-2 border-dashed border-slate-600 rounded-lg h-full flex flex-col justify-center items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-slate-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h3 className="text-lg font-medium text-slate-300">Awaiting Analysis</h3>
        <p className="text-slate-500 mt-1">Submit case details to generate the risk assessment report.</p>
    </div>
);


const FormattedReport: React.FC<{ report: string }> = ({ report }) => {
    // This is now a fallback component
    const riskLevelMatch = report.match(/SYNTHESIZED RISK LEVEL: (\w+)/);
    const riskLevel = riskLevelMatch ? riskLevelMatch[1].toUpperCase() : 'UNKNOWN';

    let riskColorClass = 'text-slate-300';
    if (riskLevel === 'CRITICAL') riskColorClass = 'text-red-400';
    else if (riskLevel === 'HIGH') riskColorClass = 'text-orange-400';
    else if (riskLevel === 'MODERATE') riskColorClass = 'text-yellow-400';
    else if (riskLevel === 'LOW') riskColorClass = 'text-green-400';
    
    const styledReport = report.replace(
        /SYNTHESIZED RISK LEVEL: \w+/, 
        `SYNTHESIZED RISK LEVEL: <span class="font-black ${riskColorClass}">${riskLevel}</span>`
    );

    return <pre className="font-mono text-sm text-slate-300 whitespace-pre-wrap leading-relaxed" dangerouslySetInnerHTML={{ __html: styledReport }} />;
}

const StructuredReport: React.FC<{ data: ParsedReport }> = ({ data }) => {
    const [facilitySearch, setFacilitySearch] = useState('');

    const riskColors = {
        CRITICAL: { bg: 'bg-red-900/50', border: 'border-red-700', text: 'text-red-300' },
        HIGH: { bg: 'bg-orange-900/50', border: 'border-orange-700', text: 'text-orange-300' },
        MODERATE: { bg: 'bg-yellow-900/50', border: 'border-yellow-700', text: 'text-yellow-300' },
        LOW: { bg: 'bg-green-900/50', border: 'border-green-700', text: 'text-green-300' },
        UNKNOWN: { bg: 'bg-slate-700', border: 'border-slate-600', text: 'text-slate-300' },
    };

    const riskClass = riskColors[data.riskLevel] || riskColors.UNKNOWN;

    const getConfidenceColor = (confidence: number) => {
        if (confidence > 0.8) return 'bg-red-500';
        if (confidence > 0.6) return 'bg-orange-500';
        if (confidence > 0.4) return 'bg-yellow-500';
        return 'bg-green-500';
    }

    const filteredFacilities = data.facilities.filter(facility => 
        facility['Facility Name'].toLowerCase().includes(facilitySearch.toLowerCase()) ||
        facility['Location / Address'].toLowerCase().includes(facilitySearch.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className={`p-4 border rounded-lg ${riskClass.bg} ${riskClass.border}`}>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Synthesized Risk Level</h3>
                <p className={`text-3xl font-black ${riskClass.text}`}>{data.riskLevel}</p>
            </div>

            <div>
                <h4 className="text-lg font-bold text-cyan-400 mb-2">Urgent Action Plan</h4>
                <p className="text-slate-300 bg-slate-900 p-3 rounded-md border border-slate-700">{data.urgentActionPlan}</p>
            </div>
            
            <div>
                <h4 className="text-lg font-bold text-cyan-400 mb-3 flex items-center"><MicroscopeIcon className="w-5 h-5 mr-2" />Tentative Diagnoses</h4>
                <div className="space-y-3">
                    {data.diagnoses.map((diag, index) => (
                        <div key={index} className="bg-slate-900 p-4 rounded-lg border border-slate-700">
                            <div className="flex justify-between items-center mb-1">
                                <h5 className="font-semibold text-white">{diag.name}</h5>
                                <span className="text-sm font-bold text-slate-300">{(diag.confidence * 100).toFixed(0)}% Confidence</span>
                            </div>
                             <div className="w-full bg-slate-700 rounded-full h-2.5 mb-2">
                                <div className={`${getConfidenceColor(diag.confidence)} h-2.5 rounded-full`} style={{ width: `${diag.confidence * 100}%` }}></div>
                            </div>
                            <p className="text-sm text-slate-400 mt-2"><span className="font-semibold text-slate-300">Rationale:</span> {diag.rationale}</p>
                        </div>
                    ))}
                </div>
            </div>

             <div>
                <h4 className="text-lg font-bold text-cyan-400 mb-3 flex items-center"><FirstAidIcon className="w-5 h-5 mr-2" />Immediate First Aid</h4>
                <ul className="list-disc list-inside space-y-2 pl-2 text-slate-300">
                    {data.firstAid.map((step, index) => <li key={index}>{step}</li>)}
                </ul>
            </div>

             <div>
                <h4 className="text-lg font-bold text-cyan-400 mb-3 flex items-center"><ShieldIcon className="w-5 h-5 mr-2" />Preventive Measures</h4>
                <ul className="list-disc list-inside space-y-2 pl-2 text-slate-300">
                    {data.preventiveMeasures.map((step, index) => <li key={index}>{step}</li>)}
                </ul>
            </div>

            <div>
                <h4 className="text-lg font-bold text-cyan-400 mb-3">Emergency Contacts</h4>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-slate-400">
                        <thead className="text-xs text-cyan-400 uppercase bg-slate-700/50">
                            <tr>
                                <th scope="col" className="px-4 py-2">Service</th>
                                <th scope="col" className="px-4 py-2">Number</th>
                                <th scope="col" className="px-4 py-2">Notes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.contacts.map((contact, index) => (
                                <tr key={index} className="border-b border-slate-700 hover:bg-slate-800">
                                    <td className="px-4 py-2 font-medium text-white whitespace-nowrap">{contact.Service}</td>
                                    <td className="px-4 py-2">{contact.Number}</td>
                                    <td className="px-4 py-2">{contact.Notes}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div>
                <h4 className="text-lg font-bold text-cyan-400 mb-3">Recommended Medical Facilities</h4>
                
                <div className="mb-4 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        className="bg-slate-900 border border-slate-700 text-slate-300 text-sm rounded-md focus:ring-cyan-500 focus:border-cyan-500 block w-full pl-10 p-2.5 placeholder-slate-500"
                        placeholder="Search facilities by name or location..."
                        value={facilitySearch}
                        onChange={(e) =>