import React, { useState, useEffect } from 'react';
import ProfileSettings from '../components/Settings/ProfileSettings';
import SecuritySettings from '../components/Settings/SecuritySettings';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import toast from 'react-hot-toast';
import Loading from '../components/Loading';

const Settings = () => {
    const { user } = useAuth();
    const isAdmin = user?.role === "ADMIN";

    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(true)
    const [showPasswordModal, setShowPasswordModal] = useState(false)

    const fetchProfile = async () => {
        try {
            const res = await api.get("/profile")
            const profile = res.data;
            if(profile) setProfile(profile)
        } catch (err) {
            toast.error(err?.response?.data?.error || err?.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (!isAdmin) {
            fetchProfile();
        } else {
            setLoading(false);
        }
    }, [isAdmin]);

    if (loading) return <Loading />;

    return (
        <div className="animate-fade-in p-6 max-w-4xl">
            <div className="mb-8">
                <h1 className="text-[22px] font-bold text-slate-900 tracking-tight">Settings</h1>
                <p className="text-sm text-slate-500 mt-1">Manage your account and preferences</p>
            </div>

            <div className="space-y-0">
                {!isAdmin && profile && <ProfileSettings profile={profile} />}
                <SecuritySettings />
            </div>
        </div>
    )
}

export default Settings