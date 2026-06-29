import { useState, useCallback, useEffect } from "react"
import { dummyLeaveData } from "../assets/assets"
import Loading from "../components/Loading"
import LeaveStats from "../components/Leave/LeaveStats"
import LeaveHistory from "../components/Leave/LeaveHistory"
import LeaveRequestModal from "../components/Leave/LeaveRequestModal"
import { PlusIcon } from "lucide-react"
import api from "../api/axios"
import toast from "react-hot-toast"
import { useAuth } from "../context/AuthContext"

const Leave = () => {
    const { user } = useAuth()
    const [leaves, setLeaves] = useState([])
    const [loading, setLoading] = useState(true)
    const [isDeleted, setIsDeleted] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const isAdmin = user?.role === "ADMIN";

    const fetchData = useCallback(async () => {
        try {
            const res = await api.get("/leave")
            setLeaves(res.data.data || [])
            if (res.data.employee?.isDeleted) setIsDeleted(true)
        } catch (error) {
            toast.error(error?.response?.data?.error || error.message)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    const handleApplyLeave = (newLeave) => {
        setLeaves(prev => [newLeave, ...prev]);
    }

    const handleStatusUpdate = (id, newStatus) => {
        setLeaves(prev => prev.map(leave =>
            leave._id === id ? { ...leave, status: newStatus } : leave
        ));
    }

    if (loading) return <Loading />

    return (
        <div className="animate-fade-in p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-[22px] font-bold text-slate-900 tracking-tight">Leave Management</h1>
                    <p className="text-sm text-slate-500 mt-1">Your leave history and requests</p>
                </div>
                {!isAdmin && !isDeleted && (
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#5A67D8] text-white text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-sm"
                    >
                        <PlusIcon className="w-4 h-4" />
                        Apply for Leave
                    </button>
                )}
            </div>

            <LeaveStats leaves={leaves} isAdmin={isAdmin} />

            <LeaveHistory
                leaves={leaves}
                isAdmin={isAdmin}
                onStatusUpdate={handleStatusUpdate}
            />

            {!isAdmin && !isDeleted && (
                <LeaveRequestModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleApplyLeave}
                />
            )}
        </div>
    )
}

export default Leave