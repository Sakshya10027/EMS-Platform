import React, { useState } from 'react';
import { UserIcon } from 'lucide-react';
import toast from 'react-hot-toast';

const ProfileSettings = ({ profile }) => {
    const [formData, setFormData] = useState({
        fullName: profile ? `${profile.firstName} ${profile.lastName}` : 'John Doe',
        email: profile?.email || 'johndoe@example.com',
        position: profile?.position || '',
        bio: profile?.bio || ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success("Profile updated successfully!");
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden mb-6">
            <div className="px-6 py-5 border-b border-slate-100 flex items-center gap-2">
                <UserIcon className="w-5 h-5 text-slate-500" />
                <h3 className="text-[15px] font-semibold text-slate-900">Public Profile</h3>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-[13px] font-medium text-slate-700 mb-2">Full Name</label>
                        <input 
                            type="text" 
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-slate-700 text-sm bg-slate-50/50"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-[13px] font-medium text-slate-700 mb-2">Email</label>
                        <input 
                            type="email" 
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-slate-700 text-sm bg-slate-50/50"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-[13px] font-medium text-slate-700 mb-2">Position</label>
                    <input 
                        type="text" 
                        name="position"
                        value={formData.position}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-slate-700 text-sm bg-slate-50/50"
                    />
                </div>

                <div>
                    <label className="block text-[13px] font-medium text-slate-700 mb-2">Bio</label>
                    <textarea 
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        placeholder="Write a brief bio..."
                        rows={4}
                        className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-slate-700 text-sm bg-slate-50/50 resize-none"
                    />
                    <p className="text-[11px] text-slate-400 mt-2">This will be displayed on your profile.</p>
                </div>

                <div className="pt-2 flex justify-end">
                    <button 
                        type="submit"
                        className="px-6 py-2.5 bg-[#5A67D8] text-white text-[13px] font-medium rounded-lg hover:bg-indigo-700 transition-colors focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 flex items-center gap-2"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProfileSettings;
