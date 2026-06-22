import React from 'react'
import { getDayTypeDisplay, getWorkingHoursDisplay } from '../../assets/assets'

const AttendanceHistory = ({ history }) => {
  return (
    <div className='card overflow-hidden'>
        <div className='px-6 py-4 border-b border-slate-100'>
            <h3 className='font-semibold text-slate-900'>Recent Activity</h3>
        </div>
        <div className='overflow-x-auto'>
            <table className='table-modern w-full'>
                <thead>
                    <tr className="text-left text-sm text-slate-500">
                        <th className='px-6 py-4 font-medium'>Date</th>
                        <th className='px-6 py-4 font-medium'>Check In</th>
                        <th className='px-6 py-4 font-medium'>Check Out</th>
                        <th className='px-6 py-4 font-medium'>Working Hours</th>
                        <th className='px-6 py-4 font-medium'>Day Type</th>
                        <th className='px-6 py-4 font-medium'>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {!history || history.length === 0 ? (
                        <tr>
                            <td colSpan={6} className='text-center py-12 text-slate-400'>
                                No records found
                            </td>
                        </tr>
                    ) : (
                        history.map((record) => {
                            const dayType = getDayTypeDisplay(record)
                            return(
                                <tr key={record._id || Math.random()} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4">{new Date(record.date).toLocaleDateString()}</td>
                                    <td className="px-6 py-4">{record.checkIn ? new Date(record.checkIn).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : '—'}</td>
                                    <td className="px-6 py-4">{record.checkOut ? new Date(record.checkOut).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : '—'}</td>
                                    <td className="px-6 py-4">{getWorkingHoursDisplay(record)}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${dayType.className}`}>
                                            {dayType.label}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`badge ${record.status === 'PRESENT' ? 'badge-success' : 'badge-warning'}`}>
                                            {record.status}
                                        </span>
                                    </td>
                                </tr>
                            )
                        })
                    )}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default AttendanceHistory