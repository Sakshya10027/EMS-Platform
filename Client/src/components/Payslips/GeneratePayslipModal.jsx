import React, { useState, useEffect } from 'react';
import { XIcon } from 'lucide-react';
import toast from 'react-hot-toast';

const GeneratePayslipModal = ({ isOpen, onClose, onSubmit, employees }) => {
    const [formData, setFormData] = useState({
        employeeId: '',
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
        basicSalary: 0,
        allowances: 0,
        deductions: 0
    });

    // Auto-fill basic salary if employee is selected
    useEffect(() => {
        if (formData.employeeId && employees) {
            const emp = employees.find(e => e._id === formData.employeeId || e.id === formData.employeeId);
            if (emp) {
                setFormData(prev => ({
                    ...prev,
                    basicSalary: emp.basicSalary || 0,
                    allowances: emp.allowances || 0,
                    deductions: emp.deductions || 0
                }));
            }
        }
    }, [formData.employeeId, employees]);

    if (!isOpen) return null;

    const netSalary = Number(formData.basicSalary) + Number(formData.allowances) - Number(formData.deductions);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!formData.employeeId || !formData.month || !formData.year) {
            toast.error("Please fill all required fields");
            return;
        }

        const selectedEmployee = employees.find(e => e._id === formData.employeeId || e.id === formData.employeeId);

        onSubmit({
            ...formData,
            basicSalary: Number(formData.basicSalary),
            allowances: Number(formData.allowances),
            deductions: Number(formData.deductions),
            netSalary,
            employee: selectedEmployee,
            _id: Math.random().toString(),
            createdAt: new Date().toISOString()
        });
        
        toast.success("Payslip generated successfully");
        setFormData({
            employeeId: '',
            month: new Date().getMonth() + 1,
            year: new Date().getFullYear(),
            basicSalary: 0,
            allowances: 0,
            deductions: 0
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-slide-up">
                <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="font-semibold text-slate-900 text-lg">Generate Payslip</h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors p-2 rounded-lg hover:bg-slate-50">
                        <XIcon className="w-5 h-5" />
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6">
                    <div className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Employee</label>
                            <select 
                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-slate-700 bg-white"
                                value={formData.employeeId}
                                onChange={(e) => setFormData({...formData, employeeId: e.target.value})}
                                required
                            >
                                <option value="" disabled>Select an employee</option>
                                {employees && employees.map(emp => (
                                    <option key={emp._id || emp.id} value={emp._id || emp.id}>
                                        {emp.firstName} {emp.lastName} ({emp.department})
                                    </option>
                                ))}
                            </select>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Month</label>
                                <select 
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-slate-700 bg-white"
                                    value={formData.month}
                                    onChange={(e) => setFormData({...formData, month: Number(e.target.value)})}
                                    required
                                >
                                    {Array.from({ length: 12 }, (_, i) => i + 1).map(m => (
                                        <option key={m} value={m}>
                                            {new Date(2000, m - 1).toLocaleString('default', { month: 'long' })}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Year</label>
                                <input 
                                    type="number" 
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-slate-700"
                                    value={formData.year}
                                    onChange={(e) => setFormData({...formData, year: Number(e.target.value)})}
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Basic Salary ($)</label>
                                <input 
                                    type="number" 
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-slate-700"
                                    value={formData.basicSalary}
                                    onChange={(e) => setFormData({...formData, basicSalary: e.target.value})}
                                    required
                                    min="0"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Allowances ($)</label>
                                <input 
                                    type="number" 
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-slate-700"
                                    value={formData.allowances}
                                    onChange={(e) => setFormData({...formData, allowances: e.target.value})}
                                    required
                                    min="0"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Deductions ($)</label>
                                <input 
                                    type="number" 
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-slate-700"
                                    value={formData.deductions}
                                    onChange={(e) => setFormData({...formData, deductions: e.target.value})}
                                    required
                                    min="0"
                                />
                            </div>
                        </div>

                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center mt-4">
                            <span className="font-medium text-slate-600">Net Salary</span>
                            <span className="text-xl font-bold text-slate-900">${netSalary.toLocaleString()}</span>
                        </div>
                    </div>

                    <div className="mt-8 flex gap-3">
                        <button 
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 hover:border-slate-300 transition-all focus:ring-2 focus:ring-slate-200 outline-none"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit"
                            className="flex-1 px-4 py-2.5 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-600/20 transition-all focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 outline-none"
                        >
                            Generate Payslip
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default GeneratePayslipModal;
