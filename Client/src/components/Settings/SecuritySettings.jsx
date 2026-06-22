import React, { useState } from 'react';
import { LockIcon } from 'lucide-react';
import ChangePasswordModal from './ChangePasswordModal';

const SecuritySettings = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex items-center justify-between p-6">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100 shrink-0">
                    <LockIcon className="w-5 h-5 text-slate-600" />
                </div>
                <div>
                    <h3 className="text-[15px] font-semibold text-slate-900">Password</h3>
                    <p className="text-[13px] text-slate-500 mt-0.5">Update your account password</p>
                </div>
            </div>
            
            <button 
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 border border-slate-200 text-slate-700 text-[13px] font-medium rounded-lg hover:bg-slate-50 transition-colors"
            >
                Change
            </button>

            <ChangePasswordModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
            />
        </div>
    );
};

export default SecuritySettings;
