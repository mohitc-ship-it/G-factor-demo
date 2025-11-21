import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Globe, Database, Loader2 } from 'lucide-react';
import FormattedText from '../components/FormattedText';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

// Mock responses database
const getMockResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();

    // pH-related questions
    if (lowerQuery.includes('ph') && (lowerQuery.includes('drop') || lowerQuery.includes('low') || lowerQuery.includes('3.8'))) {
        return "If the pH drops below 3.8 in the Ni Sulfamate bath:\n\n1. **Immediate Action**: Stop plating operations immediately\n2. **Add Nickel Carbonate**: Slowly add nickel carbonate while agitating to raise pH. Monitor continuously - target pH is 4.0-4.2\n3. **Check for Contamination**: Low pH often indicates organic or metallic contamination\n4. **Test Bath Chemistry**: After pH adjustment, verify nickel concentration (should be 560-580 g/L) and boric acid (16-20 g/L)\n5. **Resume Operations**: Once pH is stabilized at 4.0-4.2, resume plating at reduced current density initially\n\n⚠️ **Warning**: Acidic baths can cause pitting and poor deposit quality.";
    }

    // Nickel concentration questions
    if ((lowerQuery.includes('nickel') || lowerQuery.includes('ni')) && (lowerQuery.includes('low') || lowerQuery.includes('concentration') || lowerQuery.includes('troubleshoot'))) {
        return "To troubleshoot low nickel concentration:\n\n1. **Visual Inspection**: Check for cloudy or hazy solution (indicates high impurities)\n2. **Analytical Test**: Run atomic absorption spectrometry or titration to confirm Ni levels\n3. **Correction**:\n   - For Ni Sulfamate: Add nickel sulfamate tetrahydrate to reach 560-580 g/L\n   - For Ni Strike: Add nickel chloride hexahydrate to reach 12-17 g/L\n4. **Root Cause**: Usually caused by:\n   - Excessive drag-out\n   - Inadequate bath maintenance\n   - Over-dilution from rinse water\n5. **Prevention**: Implement regular analytical schedule (weekly minimum) and maintain proper drag-out reduction\n\n📊 Use the Analytical Works tab to track nickel levels over time.";
    }

    // Temperature range questions
    if (lowerQuery.includes('temperature') && lowerQuery.includes('range')) {
        return "**Optimal Temperature Ranges for Plating Baths:**\n\n🔥 **E-Clean**: 80°C (constant for past 2 years)\n- Below 75°C: Reduced cleaning efficiency, adhesion failure risk\n- Above 85°C: Excessive evaporation, safety concerns\n\n🔥 **Ni Strike**: 60°C (constant for past 2 years)\n- Range: 55-65°C\n- Critical for activation of substrate\n\n🔥 **Ni Sulfamate**: 60°C (constant for past 2 years)\n- Range: 55-65°C\n- Higher temps reduce bath life\n- Lower temps cause brittle deposits\n\n💡 **Pro Tip**: Temperature consistency is MORE important than being at exact setpoint. Fluctuations ±3°C can cause defects.";
    }

    // Agilent AA questions
    if (lowerQuery.includes('agilent') || lowerQuery.includes('aa') || lowerQuery.includes('absorption') || lowerQuery.includes('instrument')) {
        return "**Interpreting Agilent AA Instrument Readings:**\n\n📈 **For Plating Baths**, monitor these metals:\n\n1. **Copper (Cu)**:\n   - Ni Strike: <20 PPM (ALARM if >50 PPM)\n   - Ni Sulfamate: <15 PPM\n   - High Cu causes dull, discolored deposits\n   - Source: Usually copper busbars or drag-in\n\n2. **Chromium (Cr)**:\n   - Should be <10 PPM in both baths\n   - Indicates cleaning bath drag-in\n\n3. **Iron (Fe)**:\n   - Should be <50 PPM\n   - Causes pitting and roughness\n\n🔧 **Remediation**:\n- Copper: Dummy plate at low current density (5-10 ASF) for 8-12 hours\n- Chromium/Iron: Carbon treatment or partial bath replacement\n\n📋 Record all readings in the Dashboard > Analytical Instruments section.";
    }

    // Organic contamination
    if (lowerQuery.includes('organic') && lowerQuery.includes('contamination')) {
        return "**Organic Contamination in Plating Baths:**\n\n🧪 **Symptoms**:\n- High surface tension\n- Pitting in deposits\n- Poor throwing power\n- Streaking or burning\n\n🔍 **Detection**:\n1. Surface tension test (should be <45 dynes/cm)\n2. Hull cell test showing poor distribution\n3. Visual: foaming during agitation\n\n✅ **Treatment**:\n1. **Immediate**: Add wetting agent (2L for Ni Sulfamate as per alerts)\n2. **Carbon Treatment**:\n   - Add 2-5 g/L activated carbon\n   - Agitate for 2-4 hours at operating temp\n   - Filter through 1-micron cartridge\n3. **Severe Cases**: Hydrogen peroxide oxidation (consult supplier)\n\n🛡️ **Prevention**:\n- Use proper racks (no plastic coating degradation )\n- Minimize oil/grease drag-in from cleaning\n- Regular carbon treatments (monthly)\n- Maintain proper wetter concentration\n\n⚠️ **Never** add organic additives without lab testing first!";
    }

    // Heater questions
    if (lowerQuery.includes('heater') || lowerQuery.includes('heating')) {
        return "**Heater Troubleshooting:**\n\n🔧 **Common Issues**:\n\n1. **Temperature Not Reaching Setpoint**:\n   - Check heater element continuity (should be 10-50 ohms)\n   - Verify controller settings and calibration\n   - Inspect for scale buildup on heating elements\n   - Check circuit breaker/fuse\n\n2. **Temperature Fluctuating**:\n   - Calibrate temperature controller\n   - Check thermocouple placement (should be in solution, not touching tank wall)\n   - Verify proper PID tuning\n\n3. **Recent E-Clean Alert** (Nov 19): Temperature was 70°C instead of target 80°C\n   - **Resolution**: Warranty service called for tank heater\n   - **Root Cause**: Heater element partial failure\n\n💡 **Maintenance Tips**:\n- Monthly visual inspection for scale/corrosion\n- Annual calibration of temperature controllers\n- Keep spare heating elements in stock\n- Log temperature trends - gradual decline indicates element aging\n\n📊 Check Analytics tab for historical temperature data.";
    }

    // Adhesion failure
    if (lowerQuery.includes('adhesion') && (lowerQuery.includes('failure') || lowerQuery.includes('problem'))) {
        return "**Adhesion Failure Troubleshooting:**\n\n🎯 **Common Causes & Solutions**:\n\n1. **E-Clean Issues** (Most Common):\n   - Low temperature (<75°C): Heat bath to 80°C\n   - Short process time: Verify 10 min minimum\n   - Ratio issue: Check Total/Free Alkalinity ratio <2.5\n   - **Fix**: Adjust chemistry, verify temperature\n\n2. **Pickle Problems**:\n   - Short time (<5 min): Increase to proper specification\n   - Low HCl concentration (<25%): Add HCl to reach ~30%\n   - **Fix**: Extend process time, replenish acid\n\n3. **Ni Strike Inadequate**:\n   - Low current density: Verify 35 mA/cm² (8.3-9A)\n   - Short time (<3 min): Increase to specification\n   - Low NiCl₂: Should be 12-17 g/L\n\n4. **Substrate Contamination**:\n   - Oil/grease from handling\n   - Oxide formation between steps\n\n✅ **Best Practice**:\n- Never skip the Pickle step\n- Minimize time between Pickle and Ni Strike (<30 seconds)\n- Verify all process parameters in PLC Data section\n- Run test panel weekly to verify process\n\n📋 Document failures in Troubleshooting Tech Reports.";
    }

    // Current density questions
    if (lowerQuery.includes('current') && lowerQuery.includes('density')) {
        return "**Current Density Guidelines:**\n\n⚡ **Standard Operating Ranges**:\n\n**E-Clean**:\n- Target: 35 mA/cm²\n- Actual Current: 8.3A or 9A (depending on part SA)\n- Time: 10 minutes\n- Too low: Poor cleaning\n- Too high: Excessive attack on substrate\n\n**Ni Strike**:\n- Target: 35 mA/cm²  \n- Actual Current: 8.3A or 9A (based on part)\n- Time: 3 minutes\n- Critical for activation\n\n**Ni Sulfamate** (Main Deposit):\n- Target: 35 mA/cm²\n- Actual Current: 6A or 6.4A (based on part)\n- Time: 22 minutes for specified thickness\n- Range: 20-50 mA/cm²\n  - Low (<20): Slow deposition, non-uniform\n  - High (>50): Burning, stress, poor properties\n\n📐 **Calculation**:\nCurrent (A) = Part Surface Area (cm²) × Current Density (mA/cm²) / 1000\n\nExample: 250 cm² × 35 mA/cm² ÷ 1000 = 8.75A\n\n💡 The PLC automatically sets current based on part selection.";
    }

    // Default response for unmatched queries
    return "Thank you for your question. Based on your query, I recommend checking:\n\n1. **Dashboard Tab**: Review current PLC parameters and alerts\n2. **Knowledge Base Tab**: Search our technical documentation\n3. **Analytics Tab**: View historical trends for your specific concern\n4. **Rules Tab**: Review applicable operating parameters\n\nFor specific technical guidance, please rephrase your question to include:\n- Which bath/process you're asking about\n- The specific parameter or issue\n- Any error messages or symptoms you're observing\n\n Common topics I can help with:\n- pH adjustments and chemistry balance\n- Temperature control and optimization\n- Contamination identification and treatment\n- Process parameter troubleshooting\n- Equipment maintenance procedures\n- Analytical test interpretation\n\nFeel free to ask a more specific question!";
};

const AIAssistant: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 'welcome',
            role: 'assistant',
            content: 'Hello! I am your GFacture AI Process Assistant. I can help you with bath chemistry, equipment troubleshooting, process parameters, and quality control. What would you like to know?',
            timestamp: new Date()
        }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [useExternal, setUseExternal] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const suggestions = [
        "What should I do if pH drops below 3.8?",
        "How do I troubleshoot low nickel concentration?",
        "What are the optimal temperature ranges for plating?",
        "How to interpret Agilent AA instrument readings?",
        "What causes organic contamination in the bath?"
    ];

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async (text: string) => {
        if (!text.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: text,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setLoading(true);

        // Simulate network delay for realism
        await new Promise(resolve => setTimeout(resolve, 800));

        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 second timeout

            const response = await fetch('http://localhost:8000/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: text, mode: 'assistant' }),
                signal: controller.signal
            });
            clearTimeout(timeoutId);

            if (!response.ok) throw new Error('Network response was not ok');

            const data = await response.json();

            const botMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: data.answer,
                timestamp: new Date()
            };

            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            console.log('Using mock response (backend not available)');
            // Add a small delay to make it feel natural if falling back immediately
            if (!loading) await new Promise(resolve => setTimeout(resolve, 500));

            const mockAnswer = getMockResponse(text);

            const botMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: mockAnswer,
                timestamp: new Date()
            };
            setMessages(prev => [...prev, botMessage]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto h-[calc(100vh-12rem)] flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-3xl font-bold flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                            <Sparkles className="h-6 w-6 text-white" />
                        </div>
                        AI Process Assistant
                    </h2>
                    <p className="text-muted-foreground mt-1">Ask questions about bath chemistry, equipment, and troubleshooting.</p>
                </div>

                <div className="bg-card border rounded-full p-1 flex items-center text-sm font-medium shadow-md">
                    <button
                        onClick={() => setUseExternal(false)}
                        className={`px-4 py-2 rounded-full flex items-center gap-2 transition-all ${!useExternal ? 'bg-primary text-white shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                    >
                        <Database className="h-4 w-4" />
                        Internal Only
                    </button>
                    <button
                        onClick={() => setUseExternal(true)}
                        className={`px-4 py-2 rounded-full flex items-center gap-2 transition-all ${useExternal ? 'bg-primary text-white shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                    >
                        <Globe className="h-4 w-4" />
                        + External
                    </button>
                </div>
            </div>

            <div className="flex-1 bg-gradient-to-br from-card to-card/50 border rounded-2xl shadow-xl overflow-hidden flex flex-col backdrop-blur-sm">
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-500`}
                        >
                            {msg.role === 'assistant' && (
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shrink-0 shadow-md">
                                    <Bot className="h-6 w-6 text-white" />
                                </div>
                            )}

                            <div
                                className={`max-w-[85%] rounded-2xl px-5 py-4 shadow-md ${msg.role === 'user'
                                    ? 'bg-gradient-to-br from-primary to-primary/90 text-primary-foreground rounded-tr-sm'
                                    : 'bg-white border border-border/50 rounded-tl-sm'
                                    }`}
                            >
                                <FormattedText text={msg.content} className="text-sm" />
                            </div>

                            {msg.role === 'user' && (
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shrink-0 shadow-md">
                                    <User className="h-6 w-6 text-white" />
                                </div>
                            )}
                        </div>
                    ))}
                    {loading && (
                        <div className="flex gap-4 justify-start animate-pulse">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shrink-0 shadow-md">
                                <Bot className="h-6 w-6 text-white" />
                            </div>
                            <div className="bg-white border border-border/50 rounded-2xl rounded-tl-sm px-5 py-4 flex items-center gap-3 shadow-md">
                                <Loader2 className="h-5 w-5 animate-spin text-primary" />
                                <span className="text-sm text-muted-foreground font-medium">Analyzing your question...</span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <div className="p-6 bg-white/80 backdrop-blur-sm border-t">
                    {messages.length === 1 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                            {suggestions.map((suggestion, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleSend(suggestion)}
                                    className="text-xs bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 border border-blue-200/50 text-blue-700 px-4 py-2 rounded-full transition-all hover:shadow-md font-medium"
                                >
                                    {suggestion}
                                </button>
                            ))}
                        </div>
                    )}

                    <form
                        onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
                        className="flex gap-3"
                    >
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask about process parameters, troubleshooting, or equipment..."
                            className="flex-1 h-14 px-5 rounded-xl border-2 border-border bg-background focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all shadow-sm"
                            disabled={loading}
                        />
                        <button
                            type="submit"
                            disabled={loading || !input.trim()}
                            className="h-14 w-14 rounded-xl bg-gradient-to-br from-primary to-primary/90 text-primary-foreground flex items-center justify-center hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md"
                        >
                            <Send className="h-6 w-6" />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AIAssistant;
