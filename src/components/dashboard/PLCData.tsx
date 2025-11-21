import React, { useState } from 'react';

interface TankData {
    id: string;
    name: string;
    params: { label: string; value: string; unit: string }[];
}

const PLCData: React.FC = () => {
    const [tanks, setTanks] = useState<TankData[]>([
        {
            id: 'eclean',
            name: 'E-Clean',
            params: [
                { label: 'T', value: '80', unit: 'C' },
                { label: 'I', value: '8.3', unit: 'A' },
                { label: 't', value: '10', unit: 'min' },
            ]
        },
        {
            id: 'pickle',
            name: 'Pickle',
            params: [
                { label: 't', value: '5', unit: 'min' },
            ]
        },
        {
            id: 'nistrike',
            name: 'Ni Strike',
            params: [
                { label: 'T', value: '60', unit: 'C' },
                { label: 'I', value: '8.3', unit: 'A' },
                { label: 't', value: '3', unit: 'min' },
            ]
        },
        {
            id: 'nisulfamate',
            name: 'Ni Sulfamate',
            params: [
                { label: 'T', value: '60', unit: 'C' },
                { label: 'I', value: '6', unit: 'A' },
                { label: 't', value: '22', unit: 'min' },
            ]
        }
    ]);

    const handleParamChange = (tankId: string, paramIndex: number, newValue: string) => {
        setTanks(tanks.map(tank => {
            if (tank.id === tankId) {
                const newParams = [...tank.params];
                newParams[paramIndex] = { ...newParams[paramIndex], value: newValue };
                return { ...tank, params: newParams };
            }
            return tank;
        }));
    };

    return (
        <div className="card h-full">
            <div className="card-header">
                <h3 className="card-title">Data from PLC</h3>
                <p className="card-description">Real-time process data from manufacturing stations. An IOT device will be used to make the connection.</p>
            </div>
            <div className="card-content grid grid-cols-1 sm:grid-cols-2 gap-4">
                {tanks.map((tank) => (
                    <div key={tank.id} className="border rounded-lg p-4 bg-muted/10">
                        <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider text-muted-foreground">{tank.name}</h4>
                        <div className="space-y-3">
                            {tank.params.map((param, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                    <label className="text-sm font-medium w-6">{param.label}</label>
                                    <div className="relative flex-1">
                                        <input
                                            type="number"
                                            value={param.value}
                                            onChange={(e) => handleParamChange(tank.id, idx, e.target.value)}
                                            className="input bg-white pr-8"
                                        />
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                                            {param.unit}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PLCData;
