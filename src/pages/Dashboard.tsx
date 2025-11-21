import React from 'react';
import ManufacturingParts from '../components/dashboard/ManufacturingParts';
import PLCData from '../components/dashboard/PLCData';
import PLCAlerts from '../components/dashboard/PLCAlerts';
import AnalyticalWorks from '../components/dashboard/AnalyticalWorks';
import AnalyticalAlerts from '../components/dashboard/AnalyticalAlerts';
import InstrumentData from '../components/dashboard/InstrumentData';
import InstrumentAlerts from '../components/dashboard/InstrumentAlerts';
import TroubleshootingReports from '../components/dashboard/TroubleshootingReports';

const Dashboard: React.FC = () => {
    return (
        <div className="flex flex-col gap-6 pb-12">
            {/* Dashboard Date */}
            <div className="bg-card border rounded-lg px-6 py-3 shadow-sm flex items-center justify-between">
                <span className="font-medium text-card-foreground">Dashboard Date: Thursday, November 20, 2025</span>
            </div>

            {/* Manufacturing Parts */}
            <ManufacturingParts />

            {/* PLC Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <PLCData />
                <PLCAlerts />
            </div>

            {/* Analytical Works Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <AnalyticalWorks />
                <AnalyticalAlerts />
            </div>

            {/* Instrument Data Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <InstrumentData />
                <InstrumentAlerts />
            </div>

            {/* Troubleshooting Reports */}
            <TroubleshootingReports />
        </div>
    );
};

export default Dashboard;
