import React, { useState } from 'react';
import { Calendar, ArrowLeft, AlertTriangle, Wrench, Clock } from 'lucide-react';

interface HistoryItem {
    date: string;
    problem: string;
    rootCause: string;
    solution: string;
}

const Analytics: React.FC = () => {
    const [timeRange, setTimeRange] = useState('Last Day');
    const [selectedTank, setSelectedTank] = useState<string | null>(null);

    // Demo data for E-Clean history
    const eCleanHistory: HistoryItem[] = [
        {
            date: '19-Nov-25',
            problem: 'Low Temperature (T = 70 C).',
            rootCause: 'Heater malfunction',
            solution: 'The warranty was called for the tank heater.'
        },
        {
            date: '19-Nov-25',
            problem: 'Total Alkalinity/Free Alkalinity is 2.81 > 2.5',
            rootCause: 'Chemistry was used up',
            solution: 'Add 3 gal of HavaClean LRS.'
        }
    ];

    const renderHistoryView = () => (
        <div className="animate-in slide-in-from-right duration-300">
            <button
                onClick={() => setSelectedTank(null)}
                className="flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-colors"
            >
                <ArrowLeft className="h-4 w-4" />
                Back to Overview
            </button>

            <div className="card">
                <div className="card-header">
                    <h3 className="card-title">History of Alerts and Troubleshooting for {selectedTank}</h3>
                    <p className="card-description">Report date: 20-Nov-25</p>
                </div>
                <div className="card-content p-0">
                    <div className="table-container">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Problem</th>
                                    <th>Root-Cause</th>
                                    <th>Solution</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedTank === 'E-Clean' ? (
                                    eCleanHistory.map((item, idx) => (
                                        <tr key={idx}>
                                            <td className="whitespace-nowrap text-muted-foreground">{item.date}</td>
                                            <td className="font-medium">{item.problem}</td>
                                            <td>{item.rootCause}</td>
                                            <td>{item.solution}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={4} className="text-center py-12 text-muted-foreground">
                                            Demo history not implemented for this tank yet.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderOverview = () => (
        <div className="space-y-6 animate-in slide-in-from-left duration-300">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Process Analytics</h2>
                    <p className="text-muted-foreground">
                        History of process parameters, alerts, and troubleshooting.
                    </p>
                </div>
                <div className="flex items-center gap-2 bg-white border rounded-lg px-3 py-2 shadow-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <select
                        value={timeRange}
                        onChange={(e) => setTimeRange(e.target.value)}
                        className="bg-transparent border-none text-sm font-medium focus:ring-0 cursor-pointer outline-none"
                    >
                        <option>Last Day</option>
                        <option>Last Week</option>
                        <option>Last Month</option>
                    </select>
                </div>
            </div>

            <div className="grid gap-6">
                {/* E-Clean */}
                <div className="card hover:shadow-md transition-shadow">
                    <div className="card-header pb-3">
                        <div className="flex items-center justify-between">
                            <h3 className="card-title text-lg">E-Clean</h3>
                            <span className="badge badge-green">Active</span>
                        </div>
                    </div>
                    <div className="card-content pt-0">
                        <div className="mb-4">
                            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">PLC Settings</h4>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                                    <span>T: Kept at 80 C in the last two years</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                                    <span>I: Calculated from current density of 35 mA/cm². Either 8.3 A or 9 A based on two different parts</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                                    <span>t: 10 min</span>
                                </li>
                            </ul>
                        </div>
                        <button
                            onClick={() => setSelectedTank('E-Clean')}
                            className="btn btn-outline w-full justify-between group"
                        >
                            <span>History of Alerts and Troubleshooting</span>
                            <Clock className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        </button>
                    </div>
                </div>

                {/* Pickle */}
                <div className="card hover:shadow-md transition-shadow">
                    <div className="card-header pb-3">
                        <div className="flex items-center justify-between">
                            <h3 className="card-title text-lg">Pickle</h3>
                            <span className="badge badge-green">Active</span>
                        </div>
                    </div>
                    <div className="card-content pt-0">
                        <div className="mb-4">
                            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">PLC Settings</h4>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                                    <span>t: 5 min</span>
                                </li>
                            </ul>
                        </div>
                        <button
                            onClick={() => setSelectedTank('Pickle')}
                            className="btn btn-outline w-full justify-between group"
                        >
                            <span>History of Alerts and Troubleshooting</span>
                            <Clock className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        </button>
                    </div>
                </div>

                {/* Ni Strike */}
                <div className="card hover:shadow-md transition-shadow">
                    <div className="card-header pb-3">
                        <div className="flex items-center justify-between">
                            <h3 className="card-title text-lg">Ni Strike</h3>
                            <span className="badge badge-green">Active</span>
                        </div>
                    </div>
                    <div className="card-content pt-0">
                        <div className="mb-4">
                            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">PLC Settings</h4>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                                    <span>T: Kept at 60 C in the last two years</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                                    <span>I: Calculated from current density of 35 mA/cm². Either 8.3 A or 9A based on two different parts</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                                    <span>t: 3 min</span>
                                </li>
                            </ul>
                        </div>
                        <button
                            onClick={() => setSelectedTank('Ni Strike')}
                            className="btn btn-outline w-full justify-between group"
                        >
                            <span>History of Alerts and Troubleshooting</span>
                            <Clock className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        </button>
                    </div>
                </div>

                {/* Ni Sulfamate */}
                <div className="card hover:shadow-md transition-shadow">
                    <div className="card-header pb-3">
                        <div className="flex items-center justify-between">
                            <h3 className="card-title text-lg">Ni Sulfamate</h3>
                            <span className="badge badge-green">Active</span>
                        </div>
                    </div>
                    <div className="card-content pt-0">
                        <div className="mb-4">
                            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">PLC Settings</h4>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                                    <span>T: Kept at 60 C in the last two years</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                                    <span>I: Calculated from current density of 35 mA/cm². Either 6 A or 6.4 A based on two different parts</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                                    <span>t: 22 min</span>
                                </li>
                            </ul>
                        </div>
                        <button
                            onClick={() => setSelectedTank('Ni Sulfamate')}
                            className="btn btn-outline w-full justify-between group"
                        >
                            <span>History of Alerts and Troubleshooting</span>
                            <Clock className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        </button>
                    </div>
                </div>

                {/* Spectrometer */}
                <div className="card hover:shadow-md transition-shadow border-blue-100 bg-blue-50/30">
                    <div className="card-header pb-3">
                        <div className="flex items-center justify-between">
                            <h3 className="card-title text-lg text-blue-900">Atomic Absorption Spectrometer</h3>
                            <span className="badge badge-blue">Instrument</span>
                        </div>
                        <p className="card-description mt-2">
                            Get access to the history of service calls and troubleshooting efforts of the analytical instruments.
                        </p>
                    </div>
                    <div className="card-content pt-0">
                        <button
                            onClick={() => setSelectedTank('Atomic Absorption Spectrometer')}
                            className="btn btn-primary w-full justify-between group"
                        >
                            <span>History of Service Calls and Troubleshooting</span>
                            <Clock className="h-4 w-4 text-white/80 group-hover:text-white transition-colors" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="max-w-5xl mx-auto pb-12">
            {selectedTank ? renderHistoryView() : renderOverview()}
        </div>
    );
};

export default Analytics;
