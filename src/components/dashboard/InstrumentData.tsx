import React, { useState } from 'react';

interface InstrumentRow {
    id: string;
    bath: string;
    copper: string;
    chromium: string;
    iron: string;
}

const InstrumentData: React.FC = () => {
    const [rows, setRows] = useState<InstrumentRow[]>([
        { id: '1', bath: 'Ni Strike Bath', copper: '', chromium: '', iron: '' },
        { id: '2', bath: 'Ni Sulfamate Bath', copper: '', chromium: '', iron: '' },
    ]);

    const handleInputChange = (id: string, field: keyof InstrumentRow, value: string) => {
        setRows(rows.map(row => row.id === id ? { ...row, [field]: value } : row));
    };

    return (
        <div className="card h-full">
            <div className="card-header">
                <h3 className="card-title">Data from Analytical Instruments</h3>
                <p className="card-description">An IOT device will be used to make the connection.</p>
            </div>
            <div className="card-content">
                <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Atomic Absorption Spectrometer</h4>

                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Bath</th>
                                <th>Copper (PPM)</th>
                                <th>Chromium (PPM)</th>
                                <th>Iron (PPM)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row) => (
                                <tr key={row.id}>
                                    <td className="font-medium">{row.bath}</td>
                                    <td>
                                        <input
                                            className="input bg-white w-24"
                                            placeholder="Enter value"
                                            value={row.copper}
                                            onChange={e => handleInputChange(row.id, 'copper', e.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            className="input bg-white w-24"
                                            placeholder="Enter value"
                                            value={row.chromium}
                                            onChange={e => handleInputChange(row.id, 'chromium', e.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            className="input bg-white w-24"
                                            placeholder="Enter value"
                                            value={row.iron}
                                            onChange={e => handleInputChange(row.id, 'iron', e.target.value)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default InstrumentData;
