import { ThermometerIcon, UmbrellaIcon, PalmtreeIcon } from "lucide-react";

const LeaveStats = ({ leaves, isAdmin }) => {
    if (isAdmin) {
        const pending = leaves.filter(l => l.status === "PENDING").length;
        const approved = leaves.filter(l => l.status === "APPROVED").length;
        const rejected = leaves.filter(l => l.status === "REJECTED").length;

        const stats = [
            { label: "Pending Requests", value: pending, icon: UmbrellaIcon },
            { label: "Approved Leaves", value: approved, icon: PalmtreeIcon },
            { label: "Rejected Leaves", value: rejected, icon: ThermometerIcon },
        ];

        return (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mb-8">
                {stats.map((s) => (
                    <div key={s.label} className="bg-white rounded-xl shadow-sm border border-slate-100 p-5 sm:p-6 flex items-center gap-4 relative overflow-hidden group">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-slate-300"/>
                        <div className="p-3 bg-slate-50 rounded-lg">
                            <s.icon className="w-5 h-5 text-slate-500"/>
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-slate-500">{s.label}</p>
                            <div className="flex items-end gap-2 mt-1">
                                <p className="text-2xl font-bold text-slate-900 tracking-tight">{s.value}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    const sickTaken = leaves.filter(l => l.type === "SICK" && l.status === "APPROVED").length;
    const casualTaken = leaves.filter(l => l.type === "CASUAL" && l.status === "APPROVED").length;
    const annualTaken = leaves.filter(l => l.type === "ANNUAL" && l.status === "APPROVED").length;

    const stats = [
        { label: "Sick Leave", taken: sickTaken, icon: ThermometerIcon },
        { label: "Casual Leave", taken: casualTaken, icon: UmbrellaIcon },
        { label: "Annual Leave", taken: annualTaken, icon: PalmtreeIcon },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mb-8">
            {stats.map((s) => (
                <div key={s.label} className="bg-white rounded-xl shadow-sm border border-slate-100 p-5 sm:p-6 flex items-center gap-4 relative overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-slate-400" />
                    <div className="p-3 bg-slate-50 rounded-lg">
                        <s.icon className="w-5 h-5 text-slate-500"/>
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-medium text-slate-500">{s.label}</p>
                        <div className="flex items-baseline gap-1 mt-1">
                            <p className="text-2xl font-bold text-slate-900">{s.taken}</p>
                            <p className="text-sm text-slate-400">taken</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default LeaveStats;
