import React from 'react';

const LeaveHistory = ({ leaves, isAdmin, onStatusUpdate }) => {
    const formatDateRange = (start, end) => {
        const startDate = new Date(start).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        const endDate = new Date(end).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        return `${startDate} - ${endDate}`;
    };

    const getEmployeeName = (employee) => {
        if (!employee) return 'Unknown';
        const emp = Array.isArray(employee) ? employee[0] : employee;
        return emp ? `${emp.firstName || ''} ${emp.lastName || ''}`.trim() : 'Unknown';
    }

    return (
        <div className='bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden'>
            <div className='overflow-x-auto'>
                <table className='w-full text-sm text-left'>
                    <thead>
                        <tr className="text-slate-500 font-bold uppercase tracking-wider text-[11px] border-b border-slate-100 bg-white">
                            {isAdmin && <th className='px-6 py-4'>EMPLOYEE</th>}
                            <th className='px-6 py-4'>TYPE</th>
                            <th className='px-6 py-4'>DATES</th>
                            <th className='px-6 py-4'>REASON</th>
                            <th className='px-6 py-4'>STATUS</th>
                            {isAdmin && <th className='px-6 py-4'>ACTION</th>}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {!leaves || leaves.length === 0 ? (
                            <tr>
                                <td colSpan={isAdmin ? 6 : 4} className='text-center py-12 text-slate-400'>
                                    No leave records found
                                </td>
                            </tr>
                        ) : (
                            leaves.map((record) => (
                                <tr key={record._id || Math.random()} className="hover:bg-slate-50 transition-colors bg-white">
                                    {isAdmin && (
                                        <td className="px-6 py-5 font-medium text-slate-900 whitespace-nowrap">
                                            {getEmployeeName(record.employee)}
                                        </td>
                                    )}
                                    <td className="px-6 py-5">
                                        <span className="px-3 py-1.5 rounded-md text-[11px] font-bold bg-slate-100 text-slate-600">
                                            {record.type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5 text-slate-500 whitespace-nowrap font-medium text-[13px]">
                                        {formatDateRange(record.startDate, record.endDate)}
                                    </td>
                                    <td className="px-6 py-5 text-slate-500 font-medium text-[13px] max-w-[300px] truncate" title={record.reason}>
                                        {record.reason}
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className={`px-3 py-1.5 rounded-md text-[11px] font-bold ${
                                            record.status === 'APPROVED' ? 'bg-emerald-50 text-emerald-600' : 
                                            record.status === 'REJECTED' ? 'bg-rose-50 text-rose-600' : 
                                            'bg-amber-50 text-amber-600'
                                        }`}>
                                            {record.status}
                                        </span>
                                    </td>
                                    {isAdmin && (
                                        <td className="px-6 py-5">
                                            {record.status === 'PENDING' ? (
                                                <div className="flex items-center gap-2">
                                                    <button 
                                                        onClick={() => onStatusUpdate(record._id, 'APPROVED')}
                                                        className="px-3 py-1.5 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 rounded-md text-[11px] font-bold transition-colors uppercase tracking-wider"
                                                    >
                                                        Approve
                                                    </button>
                                                    <button 
                                                        onClick={() => onStatusUpdate(record._id, 'REJECTED')}
                                                        className="px-3 py-1.5 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-md text-[11px] font-bold transition-colors uppercase tracking-wider"
                                                    >
                                                        Reject
                                                    </button>
                                                </div>
                                            ) : (
                                                <span className="text-slate-400 text-xs">—</span>
                                            )}
                                        </td>
                                    )}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default LeaveHistory;
