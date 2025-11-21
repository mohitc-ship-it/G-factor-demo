import React, { useState } from 'react';
import { Trash2, Plus } from 'lucide-react';

interface Part {
    id: string;
    name: string;
    surfaceArea: string;
    rejectReason: string;
}

const ManufacturingParts: React.FC = () => {
    const [parts, setParts] = useState<Part[]>([
        { id: '1', name: '125408 roll', surfaceArea: '300', rejectReason: '-' }
    ]);
    const [isAdding, setIsAdding] = useState(false);
    const [newPart, setNewPart] = useState<Omit<Part, 'id'>>({ name: '', surfaceArea: '', rejectReason: '-' });

    const handleDelete = (id: string) => {
        setParts(parts.filter(p => p.id !== id));
    };

    const handleAdd = () => {
        if (!newPart.name || !newPart.surfaceArea) return;
        setParts([...parts, { ...newPart, id: Math.random().toString(36).substr(2, 9) }]);
        setNewPart({ name: '', surfaceArea: '', rejectReason: '-' });
        setIsAdding(false);
    };

    return (
        <div className="card">
            <div className="card-header flex flex-row items-center justify-between text-left">
                <div>
                    <h3 className="card-title">Manufacturing Parts</h3>
                    <p className="card-description">Track manufactured parts and their specifications</p>
                </div>
                <button
                    onClick={() => setIsAdding(true)}
                    className="btn btn-primary gap-2"
                >
                    <Plus className="h-4 w-4" />
                    Add Part
                </button>
            </div>
            <div className="card-content p-0">
                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Part Name</th>
                                <th>Surface Area (cm²)</th>
                                <th>Reject Reason</th>
                                <th className="w-[100px]">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {parts.map((part) => (
                                <tr key={part.id}>
                                    <td className="font-medium">{part.name}</td>
                                    <td>{part.surfaceArea}</td>
                                    <td>{part.rejectReason}</td>
                                    <td>
                                        <button
                                            onClick={() => handleDelete(part.id)}
                                            className="btn btn-ghost btn-icon text-destructive hover:text-destructive hover:bg-destructive/10"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {parts.length === 0 && !isAdding && (
                                <tr>
                                    <td colSpan={4} className="text-center py-8 text-muted-foreground">
                                        No parts added yet.
                                    </td>
                                </tr>
                            )}
                            {isAdding && (
                                <tr className="bg-muted/30">
                                    <td>
                                        <input
                                            className="input bg-white"
                                            placeholder="Part Name"
                                            value={newPart.name}
                                            onChange={e => setNewPart({ ...newPart, name: e.target.value })}
                                            autoFocus
                                        />
                                    </td>
                                    <td>
                                        <input
                                            className="input bg-white"
                                            placeholder="Area"
                                            type="number"
                                            value={newPart.surfaceArea}
                                            onChange={e => setNewPart({ ...newPart, surfaceArea: e.target.value })}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            className="input bg-white"
                                            placeholder="Reason (optional)"
                                            value={newPart.rejectReason}
                                            onChange={e => setNewPart({ ...newPart, rejectReason: e.target.value })}
                                        />
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
            </div>
        </div>
    );
};

export default ManufacturingParts;
