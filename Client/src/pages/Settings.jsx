import React from 'react';
import { dummyProfileData } from '../assets/assets';
import ProfileSettings from '../components/Settings/ProfileSettings';
import SecuritySettings from '../components/Settings/SecuritySettings';

const Settings = () => {
    const isAdmin = false;

    return (
        <div className="animate-fade-in p-6 max-w-4xl">
            <div className="mb-8">
                <h1 className="text-[22px] font-bold text-slate-900 tracking-tight">Settings</h1>
                <p className="text-sm text-slate-500 mt-1">Manage your account and preferences</p>
            </div>

            <div className="space-y-0">
                {!isAdmin && <ProfileSettings profile={dummyProfileData} />}
                <SecuritySettings />
            </div>
        </div>
    )
}

export default Settings