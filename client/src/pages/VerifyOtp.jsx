import {React, useState} from 'react'
import { useLocation , useNavigate, } from 'react-router-dom';
import axios  from 'axios'
import toast from 'react-hot-toast'
const VerifyOtp = () => {
    const [otp, setOtp] = useState('');
    const location   = useLocation()
    const navigate = useNavigate();
    const email = location.state?.email;
    const handleSubmit = async (e) =>{
        e.preventDefault();

        try{
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/verify-otp`,{email, otp})

            toast.success(response.data.message);
            navigate('/email')
        } catch(error){
            toast.error(error?.response?.data?.message);
        }
    }
  return (
    <div >
        
        <form onSubmit={handleSubmit} >
        <div className="flex flex-col gap-2 justify-center items-center" >
        <label htmlFor="otp">Enter the otp</label>
        <input type="text" name="otp" id="otp"
        placeholder='Enter otp' className="bg-white"
        onChange={(e) => setOtp(e.target.value)}
        />
        <button type='submit'>Verify</button>
        </div>
        </form>
    </div>
  )
}

export default VerifyOtp