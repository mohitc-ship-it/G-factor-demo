import React, { useState } from 'react';
import { Trash2, Plus, FileText, Save } from 'lucide-react';

interface Report {
    id: string;
    problem: string;
    rootCause: string;
    solution: string;
    document: string;
}

const TroubleshootingReports: React.FC = () => {
    const [reports, setReports] = useState<Report[]>([]);
    const [isAdding, setIsAdding] = useState(false);
    const [newReport, setNewReport] = useState<Omit<Report, 'id'>>({
        problem: '',
        rootCause: '',
        solution: '',
        document: ''
    });

    const handleDelete = (id: string) => {
        setReports(reports.filter(r => r.id !== id));
    };

    const handleAdd = () => {
        if (!newReport.problem) return;
        setReports([...reports, { ...newReport, id: Math.random().toString(36).substr(2, 9) }]);
        setNewReport({ problem: '', rootCause: '', solution: '', document: '' });
        setIsAdding(false);
    };

    const handleSave = () => {
        console.log('Data saved for today:', reports);
        alert('Data saved for today');
    };

    return (
        <div className="card">
            <div className="card-header flex flex-row items-center justify-between text-left">
                <div>
                    <h3 className="card-title">Troubleshooting Tech Reports and Service Calls</h3>
                    <p className="card-description">Log and track technical issues and their resolutions.</p>
                </div>
                <button
                    onClick={() => setIsAdding(true)}
                    className="btn btn-primary gap-2"
                >
                    <Plus className="h-4 w-4" />
                    Add New Row
                </button>
            </div>
            <div className="card-content p-0">
                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Problem</th>
                                <th>Root-cause</th>
                                <th>Solution</th>
                                <th>Technical Document</th>
                                <th className="w-[100px]">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reports.map((report) => (
                                <tr key={report.id}>
                                    <td className="font-medium">{report.problem}</td>
                                    <td>{report.rootCause}</td>
                                    <td>{report.solution}</td>
                                    <td>
                                        {report.document && (
                                            <div className="flex items-center gap-2 text-primary">
                                                <FileText className="h-4 w-4" />
                                                <span className="text-sm underline">{report.document}</span>
                                            </div>
                                        )}
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => handleDelete(report.id)}
                                            className="btn btn-ghost btn-icon text-destructive hover:text-destructive hover:bg-destructive/10"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {reports.length === 0 && !isAdding && (
                                <tr>
                                    <td colSpan={5} className="text-center py-8 text-muted-foreground">
                                        No reports added yet.
                                    </td>
                                </tr>
                            )}
                            {isAdding && (
                                <tr className="bg-muted/30">
                                    <td>
                                        <input
                                            className="input bg-white"
                                            placeholder="Problem description"
                                            value={newReport.problem}
                                            onChange={e => setNewReport({ ...newReport, problem: e.target.value })}
                                            autoFocus
                                        />
                                    </td>
                                    <td>
                                        <input
                                            className="input bg-white"
                                            placeholder="Root cause"
                                            value={newReport.rootCause}
                                            onChange={e => setNewReport({ ...newReport, rootCause: e.target.value })}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            className="input bg-white"
                                            placeholder="Solution applied"
                                            value={newReport.solution}
                                            onChange={e => setNewReport({ ...newReport, solution: e.target.value })}
                                        />
                                    </td>
                                    <td>
                                        <div className="relative">
                                            <input
                                                type="file"
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                onChange={e => setNewReport({ ...newReport, document: e.target.files?.[0]?.name || '' })}
                                            />
                                            <div className="input bg-white flex items-center text-muted-foreground">
                                                <span className="truncate">{newReport.document || 'Upload file...'}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="flex gap-2">
                                        <button onClick={handleAdd} className="btn btn-primary h-9 px-3 text-xs">Save</button>
                                        <button onClick={() => setIsAdding(false)} className="btn btn-ghost h-9 px-3 text-xs">Cancel</button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="p-4 border-t bg-muted/5 flex justify-end">
                    <button onClick={handleSave} className="btn btn-primary gap-2 w-full sm:w-auto">
                        <Save className="h-4 w-4" />
                        Save Today's Data
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TroubleshootingReports;
