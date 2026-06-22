import React, { useState } from 'react';
import { XIcon } from 'lucide-react';
import toast from 'react-hot-toast';

const ChangePasswordModal = ({ isOpen, onClose }) => {
    const [passwords, setPasswords] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    if (!isOpen) return null;

    const handleChange = (e) => {
        setPasswords({ ...passwords, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (passwords.newPassword !== passwords.confirmPassword) {
            toast.error("New passwords do not match!");
            return;
        }

        if (passwords.newPassword.length < 8) {
            toast.error("Password must be at least 8 characters long.");
            return;
        }

        toast.success("Password updated successfully!");
        setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-slide-up">
                <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="font-semibold text-slate-900">Change Password</h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors p-1.5 rounded-lg hover:bg-slate-50">
                        <XIcon className="w-5 h-5" />
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    <div>
                        <label className="block text-[13px] font-medium text-slate-700 mb-1">Current Password</label>
                        <input 
                            type="password" 
                            name="currentPassword"
                            value={passwords.currentPassword}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-slate-700 text-sm"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-[13px] font-medium text-slate-700 mb-1">New Password</label>
                        <input 
                            type="password" 
                            name="newPassword"
                            value={passwords.newPassword}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-slate-700 text-sm"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-[13px] font-medium text-slate-700 mb-1">Confirm New Password</label>
                        <input 
                            type="password" 
                            name="confirmPassword"
                            value={passwords.confirmPassword}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-slate-700 text-sm"
                            required
                        />
                    </div>

                    <div className="pt-2 flex gap-3">
                        <button 
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2.5 rounded-lg border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-all"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit"
                            className="flex-1 px-4 py-2.5 rounded-lg bg-[#5A67D8] text-white text-sm font-medium hover:bg-indigo-700 transition-all"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChangePasswordModal;
