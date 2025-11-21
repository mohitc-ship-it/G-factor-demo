import React, { useState } from 'react';
import { CheckSquare, Square } from 'lucide-react';

interface Alert {
    id: string;
    tankName: string;
    status: 'WARNING' | 'ALARM' | 'NORMAL';
    message?: string;
    resolved: boolean;
}

const InstrumentAlerts: React.FC = () => {
    const [alerts, setAlerts] = useState<Alert[]>([
        {
            id: '1',
            tankName: 'Ni Strike',
            status: 'ALARM',
            message: 'High Copper contamination. It will cause dull appearance. Insulate copper busbars to prevent that. Copper needs to be removed by plating at a low current density.',
            resolved: false
        },
        {
            id: '2',
            tankName: 'Ni Sulfamate',
            status: 'NORMAL',
            resolved: false
        }
    ]);

    const toggleResolved = (id: string) => {
        setAlerts(alerts.map(a => a.id === id ? { ...a, resolved: !a.resolved } : a));
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'WARNING': return 'badge-yellow';
            case 'ALARM': return 'badge-red';
            case 'NORMAL': return 'badge-green';
            default: return 'badge-blue';
        }
    };

    return (
        <div className="card h-full">
            <div className="card-header">
                <h3 className="card-title">Alerts and Monitoring on the Data from Analytical Instruments</h3>
            </div>
            <div className="card-content space-y-4">
                {alerts.map((alert) => (
                    <div key={alert.id} className={`border rounded-lg p-4 transition-colors ${alert.resolved ? 'bg-muted/30 opacity-70' : 'bg-white'}`}>
                        <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-sm">{alert.tankName}</h4>
                            <span className={`badge ${getStatusColor(alert.status)}`}>{alert.status}</span>
                        </div>

                        {alert.message && (
                            <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                                {alert.message}
                            </p>
                        )}

                        <button
                            onClick={() => toggleResolved(alert.id)}
                            className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                        >
                            {alert.resolved ? <CheckSquare className="h-4 w-4" /> : <Square className="h-4 w-4" />}
                            Resolved
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InstrumentAlerts;
