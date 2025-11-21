import React, { useState } from 'react';
import { Search, BookOpen, AlertCircle, Loader2 } from 'lucide-react';
import FormattedText from '../components/FormattedText';

const KnowledgeBase: React.FC = () => {
    const [query, setQuery] = useState('');
    const [answer, setAnswer] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const getMockKnowledgeBaseResponse = (query: string): string => {
        const lowerQuery = query.toLowerCase();

        if (lowerQuery.includes('titration') && lowerQuery.includes('metal')) {
            return "**Nickel Metal Titration Procedure:**\n\n1. Pipette 1 ml of sample into a 150 ml beaker.\n2. Add 25 ml DI water.\n3. Add 10 ml of 26° Ammonium Hydroxide (solution turns blue).\n4. Add a stir bar and start mixing.\n5. Add 0.5–1 g Murexide Indicator (solution turns brown).\n6. Titrate with 0.1M EDTA until the solution becomes deep purple.\n7. Record ml EDTA.\n\n**Calculation:**\nFormula: ml EDTA × M EDTA × 7.85 = oz/gal Nickel Metal";
        }
        if (lowerQuery.includes('chloride')) {
            return "**Nickel Chloride Determination:**\n\n1. Pipette 2 ml sample into a beaker.\n2. Add 80 ml DI water.\n3. Add 5–10 drops Sodium Dichromate Indicator (solution turns orange).\n4. Mix with stir bar.\n5. Titrate with 0.1N Silver Nitrate until brownish-red color forms.\n6. Record ml AgNO3.\n\n**Calculation:**\nFormula: ml AgNO3 × N AgNO3 × 7.94 = oz/gal Nickel Chloride";
        }
        if (lowerQuery.includes('sulfate')) {
            return "**Nickel Sulfate Calculation:**\n\n1. First calculate Nickel from Nickel Chloride:\n   Ni from NiCl₂ = oz/gal Nickel Chloride × 0.247\n\n2. Then calculate Nickel Sulfate:\n   Nickel Sulfate = (oz/gal Nickel Metal – oz/gal Nickel from Nickel Chloride) ÷ 0.223";
        }
        if (lowerQuery.includes('boric')) {
            return "**Boric Acid Analysis Procedure:**\n\n1. Pipette 2 ml bath sample.\n2. Add 100 ml DI water.\n3. Begin stirring.\n4. Adjust pH to 3.9–4.1 using:\n   - 0.1N H₂SO₄ if pH > 4\n   - 0.1N NaOH if pH < 4\n5. Add 5 g Mannitol and dissolve.\n6. Titrate with 0.1N NaOH to pH 6.5.\n7. Record ml NaOH.\n\n**Calculation:**\nFormula: ml NaOH × N NaOH × 4.13 = oz/gal Boric Acid";
        }
        if (lowerQuery.includes('carrier') && lowerQuery.includes('zt')) {
            return "**ZT Carrier Measurement:**\n\n1. Dilute 10 ml sample to 100 ml.\n2. Run blank.\n3. Measure sample at 264 & 262 nm.\n\n**Calculation:**\nFormula: (264 abs – 262 abs) × 37.5 = % Brightener/Carrier";
        }
        if (lowerQuery.includes('carrier')) {
            return "**Carrier Measurement (Spectrophotometer):**\n\n1. Dilute 2 ml sample to 100 ml with DI water.\n2. Turn on spectrophotometer & warm up.\n3. Select “Carrier” mode.\n4. Run blank with DI water.\n5. Run sample and record absorbance at 315 & 285 nm.\n\n**Calculation:**\nFormula: (285 abs – 315 abs) × 8.2 = % Brightener/Carrier";
        }
        if (lowerQuery.includes('solid') || lowerQuery.includes('particle')) {
            return "**HP Armor Nickel Solid Particles Measurement:**\n\n1. Add 10 ml warm mixed sample to Kocour tube.\n2. Add 15 ml 140–160°F DI water.\n3. Mix and centrifuge for 5 minutes.\n4. Read solids level on tube.\n\n**Calculation:**\nFormula: Reading × 7.49 = g/L Solids";
        }
        if (lowerQuery.includes('pickle')) {
            return "**Pickle Tank Composition:**\n\nThe pickle tank contains Hydrochloric Acid (HCl) at:\n\n- **5 min**: 30% HCl";
        }
        if (lowerQuery.includes('interlock') || (lowerQuery.includes('aa') && lowerQuery.includes('error'))) {
            return "**AA Liquid Interlock Error Troubleshooting:**\n\nA “Liquid Interlock Error” typically means the interlock switch has failed or the vessel is not full.\n\n**Action Steps:**\n1. Verify the vessel is completely full.\n2. Check waste line placement.\n3. Inspect and reset the switch if possible.\n4. If flame still won’t ignite, service is required.\n\n**Service History:**\nTechnician verified the issue and replaced the failing liquid interlock switch, which was preventing the flame from lighting. System function was restored.";
        }
        if (lowerQuery.includes('startup') || (lowerQuery.includes('aa') && lowerQuery.includes('start'))) {
            return "**AA Instrument Startup Procedure:**\n\n1. Turn on ventilation.\n2. Turn on AA power switch.\n3. Remove burner door.\n4. Ensure correct Air/Acetylene burner is installed.\n5. Clean burner using a business card or 5% HNO₃ if dirty.\n6. Check O-ring condition.\n7. Ensure vessel is filled with DI water + 2.5% HNO₃.\n8. Turn on gas valves:\n   - Acetylene 11 psi (never exceed 15 psi)\n   - Air 50 psi\n9. Check burner alignment.\n10. Open AA software → Worksheet → New from “Cr, Cu, Fe, Ni” method.";
        }
        if (lowerQuery.includes('calibration') || lowerQuery.includes('calibrate')) {
            return "**Calibration Schedule:**\n\nAccording to the SOP, the nebulizer should be cleaned and the AA instrument calibrated **once per year**.";
        }
        if (lowerQuery.includes('pressure') && lowerQuery.includes('aa')) {
            return "**AA Pressure Requirements:**\n\n- **Acetylene**: 11 psi (never exceed 15 psi; tank must stay above 100 psi)\n- **Air**: 50 psi";
        }

        return "(Demo mode) No specific match found in mock database. Try searching for 'titration', 'boric acid', 'AA error', or 'carrier'.\n\nIn a real system, this would search across manuals, methods, and reports.";
    };

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        setLoading(true);
        setAnswer(null);
        setError(false);

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));

        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 3000);

            const response = await fetch('http://localhost:8000/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query, mode: 'knowledge_base' }),
                signal: controller.signal
            });
            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setAnswer(data.answer);
        } catch (err) {
            console.error('Search failed:', err);
            setError(true);
            setAnswer(getMockKnowledgeBaseResponse(query));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold mb-3 text-card-foreground">Knowledge Base Search</h2>
                <p className="text-muted-foreground text-lg">
                    Search through internal documents, e.g., equipment manuals, analytical methods, technical reports, service calls, and troubleshooting reports.
                </p>
            </div>

            <div className="card p-8 mb-8 shadow-md">
                <form onSubmit={handleSearch} className="flex gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                        <input
                            type="text"
                            className="w-full h-14 pl-12 pr-4 rounded-lg border border-border bg-background text-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                            placeholder="Ask about procedures, troubleshooting, parameters..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading || !query.trim()}
                        className="btn btn-primary h-14 px-8 text-lg font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Search'}
                    </button>
                </form>
            </div>

            {answer && (
                <div className="card animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="card-header border-b bg-muted/10 flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-primary" />
                        <h3 className="font-semibold text-lg">Answer</h3>
                    </div>
                    <div className="card-content p-6">
                        <div className="prose prose-slate max-w-none">
                            <FormattedText text={answer} className="text-lg text-card-foreground" />
                        </div>

                        {/* {error && (
                            <div className="mt-6 flex items-start gap-3 p-4 rounded-lg bg-yellow-50 text-yellow-800 text-sm border border-yellow-100">
                                <AlertCircle className="h-5 w-5 shrink-0" />
                                <p>
                                    <strong>Note:</strong> The backend connection failed, so this is a demo response.
                                    In production, this would retrieve real data from the vector database.
                                </p>
                            </div>
                        )} */}
                    </div>
                </div>
            )}

            {!answer && !loading && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center opacity-60 mt-12">
                    <div className="p-4">
                        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <BookOpen className="h-6 w-6" />
                        </div>
                        <h4 className="font-medium mb-2">Equipment Manuals</h4>
                        <p className="text-sm text-muted-foreground">Access detailed specs and operating procedures</p>
                    </div>
                    <div className="p-4">
                        <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search className="h-6 w-6" />
                        </div>
                        <h4 className="font-medium mb-2">Troubleshooting</h4>
                        <p className="text-sm text-muted-foreground">Find solutions from past reports and service calls</p>
                    </div>
                    <div className="p-4">
                        <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <AlertCircle className="h-6 w-6" />
                        </div>
                        <h4 className="font-medium mb-2">Safety Protocols</h4>
                        <p className="text-sm text-muted-foreground">Review safety guidelines and emergency procedures</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default KnowledgeBase;
