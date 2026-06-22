import { useState, useCallback, useEffect } from "react"
import { dummyPayslipData, dummyEmployeeData } from "../assets/assets"
import Loading from "../components/Loading"
import PayslipList from "../components/Payslips/PayslipList"
import GeneratePayslipModal from "../components/Payslips/GeneratePayslipModal"
import { PlusIcon } from "lucide-react"

const Payslips = () => {
    const [payslips, setPayslips] = useState([])
    const [employees, setEmployees] = useState([])
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const isAdmin = true;

    const fetchPayslips = useCallback(async () => {
        setPayslips(dummyPayslipData)
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, [])

    useEffect(() => {
        fetchPayslips()
    }, [fetchPayslips])

    useEffect(() => {
        if (isAdmin) setEmployees(dummyEmployeeData)
    }, [isAdmin])

    const handleGeneratePayslip = (newPayslip) => {
        setPayslips(prev => [newPayslip, ...prev]);
    }

    if (loading) return <Loading />

    return (
        <div className="animate-fade-in p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-[22px] font-bold text-slate-900 tracking-tight">Payslips</h1>
                    <p className="text-sm text-slate-500 mt-1">{isAdmin ? "Generate and manage employee payslips" : "Your payslip history"}</p>
                </div>
                {isAdmin && (
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#5A67D8] text-white text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-sm"
                    >
                        <PlusIcon className="w-4 h-4" />
                        Generate Payslip
                    </button>
                )}
            </div>
            
            <PayslipList payslips={payslips} isAdmin={isAdmin} />

            {isAdmin && (
                <GeneratePayslipModal 
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleGeneratePayslip}
                    employees={employees}
                />
            )}
        </div>
    )
}

export default Payslips