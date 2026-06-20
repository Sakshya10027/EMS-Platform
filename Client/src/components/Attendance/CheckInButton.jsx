import { useState } from "react"

const CheckInButton = ({todayRecord , onAction}) => {
    const [loading,setLoading] = useState(false)
    const handleAttendance = async ()=>{
        setLoading(true)
        setTimeout(()=>{
            setLoading(false)
            onAction()
        },1000)
    }
    if(todayRecord?.CheckOut){
        return(
            <div className="flex flex-col items-center jsutify-center p-8 bg-slate-50 rounded-2xl border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900">Work Day Completed</h3>
                <p className="text-slate-500 text-sm mt-1">Great job! See you tomorrow</p>
            </div>
        )
    }
    const isCheckedIn = !!todayRecors?
  return (
    <div>CheckInButton</div>
  )
}

export default CheckInButton