import React from 'react';
import { Link } from 'react-router-dom';
import { PrinterIcon } from 'lucide-react';

const PayslipList = ({ payslips, isAdmin }) => {
    const getMonthName = (monthNumber) => {
        const date = new Date();
        date.setMonth(monthNumber - 1);
        return date.toLocaleString('default', { month: 'long' });
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
    };

    const getEmployeeName = (employee) => {
        if (!employee) return 'Unknown';
        const emp = Array.isArray(employee) ? employee[0] : employee;
        return emp ? `${emp.firstName || ''} ${emp.lastName || ''}`.trim() : 'Unknown';
    };

    return (
        <div className='bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden'>
            <div className='overflow-x-auto'>
                <table className='w-full text-sm text-left'>
                    <thead>
                        <tr className="text-slate-500 font-bold uppercase tracking-wider text-[11px] border-b border-slate-100 bg-slate-50/50">
                            {isAdmin && <th className='px-6 py-4'>EMPLOYEE</th>}
                            <th className='px-6 py-4'>MONTH / YEAR</th>
                            <th className='px-6 py-4 text-right'>BASIC SALARY</th>
                            <th className='px-6 py-4 text-right'>ALLOWANCES</th>
                            <th className='px-6 py-4 text-right'>DEDUCTIONS</th>
                            <th className='px-6 py-4 text-right'>NET SALARY</th>
                            <th className='px-6 py-4 text-center'>ACTION</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {!payslips || payslips.length === 0 ? (
                            <tr>
                                <td colSpan={isAdmin ? 7 : 6} className='text-center py-12 text-slate-400'>
                                    No payslips found
                                </td>
                            </tr>
                        ) : (
                            payslips.map((record) => (
                                <tr key={record._id || Math.random()} className="hover:bg-slate-50 transition-colors bg-white">
                                    {isAdmin && (
                                        <td className="px-6 py-5 font-medium text-slate-900 whitespace-nowrap">
                                            {getEmployeeName(record.employee)}
                                        </td>
                                    )}
                                    <td className="px-6 py-5 font-medium text-slate-700">
                                        {getMonthName(record.month)} {record.year}
                                    </td>
                                    <td className="px-6 py-5 text-right text-slate-600">
                                        {formatCurrency(record.basicSalary)}
                                    </td>
                                    <td className="px-6 py-5 text-right text-emerald-600 font-medium">
                                        +{formatCurrency(record.allowances)}
                                    </td>
                                    <td className="px-6 py-5 text-right text-rose-600 font-medium">
                                        -{formatCurrency(record.deductions)}
                                    </td>
                                    <td className="px-6 py-5 text-right font-bold text-slate-900">
                                        {formatCurrency(record.netsalary)}
                                    </td>
                                    <td className="px-6 py-5 text-center">
                                        <Link 
                                            to={`/print/payslips/${record._id || record.id}`}
                                            className="inline-flex items-center justify-center gap-2 px-3 py-1.5 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-md text-[11px] font-bold transition-colors uppercase tracking-wider"
                                        >
                                            <PrinterIcon className="w-3.5 h-3.5" />
                                            View
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default PayslipList;
