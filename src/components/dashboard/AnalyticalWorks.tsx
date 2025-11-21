import React, { useState, useEffect } from 'react';

const AnalyticalWorks: React.FC = () => {
    // E-Clean State
    const [eclean, setEclean] = useState({
        freeNormality: 1,
        freeVolume: 17,
        totalNormality: 1,
        totalVolume: 24,
        addition: '',
    });

    // Calculated values
    const freeAlkalinity = (eclean.freeNormality * eclean.freeVolume * 1.13).toFixed(2); // Dummy multiplier for demo
    const totalAlkalinity = (eclean.totalNormality * eclean.totalVolume * 1.06).toFixed(2); // Dummy multiplier for demo
    const ratio = (parseFloat(totalAlkalinity) / parseFloat(freeAlkalinity)).toFixed(2);

    return (
        <div className="card h-full">
            <div className="card-header">
                <h3 className="card-title">Analytical Works</h3>
                <p className="card-description">Chemical analysis and quality control measurements</p>
                <p className="text-xs text-muted-foreground mt-1 italic">
                    Note: This Demo only provides complete functionality for E-Clean Analytical works.
                </p>
            </div>
            <div className="card-content space-y-6">

                {/* E-Clean Section */}
                <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-primary">E-Clean</h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Free Alkalinity */}
                        <div className="space-y-3">
                            <h5 className="text-sm font-medium border-b pb-1">Free Alkalinity</h5>
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <label className="text-xs text-muted-foreground">Normality HCl</label>
                                    <input
                                        type="number"
                                        className="input bg-white"
                                        value={eclean.freeNormality}
                                        onChange={e => setEclean({ ...eclean, freeNormality: parseFloat(e.target.value) || 0 })}
                                    />
                                </div>
                                <div>
                                    <label className="text-xs text-muted-foreground">Volume HCl (mL)</label>
                                    <input
                                        type="number"
                                        className="input bg-white"
                                        value={eclean.freeVolume}
                                        onChange={e => setEclean({ ...eclean, freeVolume: parseFloat(e.target.value) || 0 })}
                                    />
                                </div>
                            </div>
                            <div className="bg-muted/30 p-2 rounded text-center">
                                <span className="text-xs text-muted-foreground block">Free Alkalinity (vol%)</span>
                                <span className="font-bold text-lg">{freeAlkalinity}</span>
                            </div>
                        </div>

                        {/* Total Alkalinity */}
                        <div className="space-y-3">
                            <h5 className="text-sm font-medium border-b pb-1">Total Alkalinity</h5>
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <label className="text-xs text-muted-foreground">Normality HCl</label>
                                    <input
                                        type="number"
                                        className="input bg-white"
                                        value={eclean.totalNormality}
                                        onChange={e => setEclean({ ...eclean, totalNormality: parseFloat(e.target.value) || 0 })}
                                    />
                                </div>
                                <div>
                                    <label className="text-xs text-muted-foreground">Volume HCl (mL)</label>
                                    <input
                                        type="number"
                                        className="input bg-white"
                                        value={eclean.totalVolume}
                                        onChange={e => setEclean({ ...eclean, totalVolume: parseFloat(e.target.value) || 0 })}
                                    />
                                </div>
                            </div>
                            <div className="bg-muted/30 p-2 rounded text-center">
                                <span className="text-xs text-muted-foreground block">Total Alkalinity (vol%)</span>
                                <span className="font-bold text-lg">{totalAlkalinity}</span>
                            </div>
                        </div>
                    </div>

                    {/* Ratio & Addition */}
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                        <div className="bg-blue-50 p-3 rounded border border-blue-100 text-center">
                            <span className="text-xs text-blue-700 block font-medium">Ratio (Total/Free)</span>
                            <span className={`font-bold text-xl ${parseFloat(ratio) > 2.5 ? 'text-red-600' : 'text-blue-900'}`}>
                                {ratio}
                            </span>
                            <p className="text-[10px] text-blue-600 mt-1">Note: Alert if ratio {'>'} 2.5</p>
                        </div>

                        <div>
                            <label className="text-xs text-muted-foreground">Addition (gal)</label>
                            <div className="flex gap-2">
                                <input
                                    className="input bg-white"
                                    placeholder="Calc value..."
                                    value={eclean.addition}
                                    onChange={e => setEclean({ ...eclean, addition: e.target.value })}
                                />
                            </div>
                            <p className="text-[10px] text-muted-foreground mt-1">
                                Formula: Roundup(0.4 × (Total - 2.5 × Free), 0)
                            </p>
                        </div>
                    </div>
                </div>

                {/* Other Tanks (Simplified) */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="border rounded-lg p-3 bg-muted/5">
                        <h4 className="font-medium text-xs uppercase mb-2">Pickle</h4>
                        <label className="text-xs text-muted-foreground">% HCl</label>
                        <input className="input bg-white h-8" defaultValue="30" />
                    </div>
                    <div className="border rounded-lg p-3 bg-muted/5">
                        <h4 className="font-medium text-xs uppercase mb-2">Ni Strike</h4>
                        <label className="text-xs text-muted-foreground">NiCl₂·6H₂O (g/L)</label>
                        <input className="input bg-white h-8" defaultValue="15" />
                    </div>
                    <div className="border rounded-lg p-3 bg-muted/5">
                        <h4 className="font-medium text-xs uppercase mb-2">Ni Sulfamate</h4>
                        <label className="text-xs text-muted-foreground">pH</label>
                        <input className="input bg-white h-8" defaultValue="4.0" />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AnalyticalWorks;
