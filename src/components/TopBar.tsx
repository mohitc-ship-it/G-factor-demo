import React from 'react';
import { Bell, Settings, User, ChevronDown, Activity } from 'lucide-react';

const TopBar: React.FC = () => {
    return (
        <div className="bg-white/80 backdrop-blur-md border-b border-border sticky top-0 z-20">
            <div className="container py-4">
                <div className="flex items-center justify-between">
                    {/* Left Section */}
                    <div className="flex items-center">
                        <img
                            src="/gfacture_logo.png"
                            alt="GFacture AI Logo"
                            className="h-12 w-auto object-contain"
                        />
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 text-sm font-medium text-card-foreground border px-3 py-1.5 rounded-md bg-muted/30 cursor-pointer hover:bg-muted/50 transition-colors">
                            Plant 1 – Dallas
                            <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        </div>

                        <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-full border border-green-100">
                            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-xs font-semibold">System Active</span>
                        </div>

                        <div className="flex items-center gap-4 border-l pl-6 ml-2">
                            <button className="text-muted-foreground hover:text-primary transition-colors">
                                <Bell className="h-5 w-5" />
                            </button>
                            <button className="text-muted-foreground hover:text-primary transition-colors">
                                <Settings className="h-5 w-5" />
                            </button>
                            <button className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors">
                                <User className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopBar;
