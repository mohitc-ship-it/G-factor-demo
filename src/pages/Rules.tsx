import React, { useState } from 'react';
import { Edit2, Trash2, Plus, Save, X, FileText } from 'lucide-react';

interface Rule {
    id: string;
    description: string;
    sourceFile: string;
    appliedTo: string;
    details: string;
}

const Rules: React.FC = () => {
    const [rules, setRules] = useState<Rule[]>([
        {
            id: '1',
            description: 'Acceptable Range for Nickel Sulfamate Tetrahydrate and Boric Acid',
            sourceFile: 'd6d2832d-3967-4a64-91be-a04e9d29b6b5_Logsheet.xlsx',
            appliedTo: 'Nickel Sulfamate',
            details: 'Nickel Sulfamate Tetrahydrate must be between 560 and 580 g/L and Boric acid must be between 16 and 20 g/L.'
        },
        {
            id: '2',
            description: 'Nickel Chloride Hexahydrate Concentration',
            sourceFile: 'd6d2832d-3967-4a64-91be-a04e9d29b6b5_Logsheet.xlsx',
            appliedTo: 'Ni Strike',
            details: 'Nickel Chloride Hexahydrate must be between 12 and 17 g/L.'
        },
        {
            id: '3',
            description: 'Surface Tension for Pickle',
            sourceFile: 'd6d2832d-3967-4a64-91be-a04e9d29b6b5_Logsheet.xlsx',
            appliedTo: 'Pickle',
            details: 'Surface tension must be less than 45.'
        },
        {
            id: '4',
            description: 'HCl Concentration in Pickle',
            sourceFile: 'd6d2832d-3967-4a64-91be-a04e9d29b6b5_Logsheet.xlsx',
            appliedTo: 'Pickle',
            details: 'HCl concentration should be around 30%.'
        }
    ]);

    const [editingId, setEditingId] = useState<string | null>(null);
    const [editForm, setEditForm] = useState<Rule | null>(null);
    const [isAdding, setIsAdding] = useState(false);
    const [newRule, setNewRule] = useState<Omit<Rule, 'id'>>({
        description: '',
        sourceFile: '',
        appliedTo: '',
        details: ''
    });

    const handleEdit = (rule: Rule) => {
        setEditingId(rule.id);
        setEditForm(rule);
    };

    const handleSaveEdit = () => {
        if (!editForm) return;
        setRules(rules.map(r => r.id === editForm.id ? editForm : r));
        setEditingId(null);
        setEditForm(null);
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setEditForm(null);
    };

    const handleDelete = (id: string) => {
        setRules(rules.filter(r => r.id !== id));
    };

    const handleAdd = () => {
        if (!newRule.description) return;
        setRules([...rules, { ...newRule, id: Math.random().toString(36).substr(2, 9) }]);
        setNewRule({ description: '', sourceFile: '', appliedTo: '', details: '' });
        setIsAdding(false);
    };

    return (
        <div className="card">
            <div className="card-header flex flex-row items-center justify-between text-left">
                <div>
                    <h3 className="card-title">Rules Library</h3>
                    <p className="card-description">View, edit, and add rules used for detecting anomalies in process and analytical data.</p>
                </div>
                <button
                    onClick={() => setIsAdding(true)}
                    className="btn btn-primary gap-2"
                >
                    <Plus className="h-4 w-4" />
                    Add New Rule
                </button>
            </div>
            <div className="card-content p-0">
                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="w-1/4">Rule Description</th>
                                <th className="w-1/6">Source File</th>
                                <th className="w-1/6">Applied To</th>
                                <th className="w-1/3">Details</th>
                                <th className="w-[100px]">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Add New Rule Row */}
                            {isAdding && (
                                <tr className="bg-muted/30 border-b-2 border-primary/20">
                                    <td>
                                        <input
                                            className="input bg-white"
                                            placeholder="Description"
                                            value={newRule.description}
                                            onChange={e => setNewRule({ ...newRule, description: e.target.value })}
                                            autoFocus
                                        />
                                    </td>
                                    <td>
                                        <input
                                            className="input bg-white"
                                            placeholder="Source File"
                                            value={newRule.sourceFile}
                                            onChange={e => setNewRule({ ...newRule, sourceFile: e.target.value })}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            className="input bg-white"
                                            placeholder="Applied To"
                                            value={newRule.appliedTo}
                                            onChange={e => setNewRule({ ...newRule, appliedTo: e.target.value })}
                                        />
                                    </td>
                                    <td>
                                        <textarea
                                            className="input bg-white h-auto py-2 min-h-[2.5rem]"
                                            placeholder="Rule details..."
                                            value={newRule.details}
                                            onChange={e => setNewRule({ ...newRule, details: e.target.value })}
                                        />
                                    </td>
                                    <td>
                                        <div className="flex gap-1">
                                            <button onClick={handleAdd} className="btn btn-primary btn-icon h-8 w-8" title="Save">
                                                <Save className="h-4 w-4" />
                                            </button>
                                            <button onClick={() => setIsAdding(false)} className="btn btn-ghost btn-icon h-8 w-8" title="Cancel">
                                                <X className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )}

                            {/* Rules List */}
                            {rules.map((rule) => {
                                const isEditing = editingId === rule.id;

                                if (isEditing && editForm) {
                                    return (
                                        <tr key={rule.id} className="bg-muted/10">
                                            <td>
                                                <input
                                                    className="input bg-white"
                                                    value={editForm.description}
                                                    onChange={e => setEditForm({ ...editForm, description: e.target.value })}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    className="input bg-white"
                                                    value={editForm.sourceFile}
                                                    onChange={e => setEditForm({ ...editForm, sourceFile: e.target.value })}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    className="input bg-white"
                                                    value={editForm.appliedTo}
                                                    onChange={e => setEditForm({ ...editForm, appliedTo: e.target.value })}
                                                />
                                            </td>
                                            <td>
                                                <textarea
                                                    className="input bg-white h-auto py-2 min-h-[2.5rem]"
                                                    value={editForm.details}
                                                    onChange={e => setEditForm({ ...editForm, details: e.target.value })}
                                                />
                                            </td>
                                            <td>
                                                <div className="flex gap-1">
                                                    <button onClick={handleSaveEdit} className="btn btn-primary btn-icon h-8 w-8" title="Save">
                                                        <Save className="h-4 w-4" />
                                                    </button>
                                                    <button onClick={handleCancelEdit} className="btn btn-ghost btn-icon h-8 w-8" title="Cancel">
                                                        <X className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                }

                                return (
                                    <tr key={rule.id} className="group hover:bg-muted/5">
                                        <td className="font-medium align-top py-4">{rule.description}</td>
                                        <td className="align-top py-4">
                                            <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
                                                <FileText className="h-3 w-3" />
                                                <span className="truncate max-w-[120px]" title={rule.sourceFile}>{rule.sourceFile}</span>
                                            </div>
                                        </td>
                                        <td className="align-top py-4">
                                            <span className="badge badge-blue">{rule.appliedTo}</span>
                                        </td>
                                        <td className="text-muted-foreground text-sm align-top py-4 leading-relaxed">
                                            {rule.details}
                                        </td>
                                        <td className="align-top py-4">
                                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => handleEdit(rule)}
                                                    className="btn btn-ghost btn-icon h-8 w-8 text-muted-foreground hover:text-primary"
                                                >
                                                    <Edit2 className="h-4 w-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(rule.id)}
                                                    className="btn btn-ghost btn-icon h-8 w-8 text-muted-foreground hover:text-destructive"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}

                            {rules.length === 0 && !isAdding && (
                                <tr>
                                    <td colSpan={5} className="text-center py-12 text-muted-foreground">
                                        No rules found. Add one to get started.
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

export default Rules;
