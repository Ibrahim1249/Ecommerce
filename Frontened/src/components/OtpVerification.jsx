
import React, { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import { useNavigate } from 'react-router-dom'

export default function OTPVerification() {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState("")
  const [timer, setTimer] = useState(45) // 45 seconds timer
  const inputRefs = useRef([])
  const timerRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, []);

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);
  };

  const handleChange = (element, index) => {
    if (isNaN(Number(element.target.value))) return false;

    const newOtp = [...otp];
    newOtp[index] = element.target.value;
    setOtp(newOtp);

    if (element.target.value !== '' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage(null)

    const otpValue = otp.join('')
    if (otpValue.length !== 6) {
      setMessage({ type: 'error', text: 'Please enter all 6 digits.' })
      setIsSubmitting(false)
      return
    }

    if (timer === 0) {
      setMessage({ type: 'error', text: 'OTP has expired. Please request a new one.' })
      setIsSubmitting(false)
      return
    }

    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      setMessage({ type: 'success', text: 'OTP verified successfully!' })
      navigate("/change-password")
    } catch (error) {
      setMessage({ type: 'error', text: 'Invalid OTP. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleResendOTP = () => {
    setOtp(['', '', '', '', '', ''])
    setMessage(null)
    setTimer(45)
    startTimer()
    // Here you would typically call your API to resend the OTP
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <Card className="w-full max-w-md mx-auto bg-gray-800 text-gray-100">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">OTP Verification</CardTitle>
          <CardDescription className="text-gray-400">Enter the 6-digit code sent to your device.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="flex justify-evenly mb-6 space-x-2">
              {otp.map((data, index) => (
                <Input
                  key={index}
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  pattern="\d{1}"
                  maxLength={1}
                  className="w-12 h-12 text-center text-2xl bg-gray-700 border-gray-600 text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                  value={data}
                  onChange={e => handleChange(e, index)}
                  onKeyDown={e => handleKeyDown(e, index)}
                  ref={el => inputRefs.current[index] = el}
                  aria-label={`Digit ${index + 1}`}
                />
              ))}
            </div>
            <div className="text-center text-gray-400 mb-4">
              Time remaining: {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-center space-y-2">
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={isSubmitting || timer === 0}>
              {isSubmitting ? 'Verifying...' : 'Verify OTP'}
            </Button>
            {timer === 0 && (
              <Button type="button" onClick={handleResendOTP} className="w-full bg-gray-700 hover:bg-gray-600 text-white">
                Resend OTP
              </Button>
            )}
            {message && (
              <div className={`flex items-center space-x-2 text-sm ${message.type === 'success' ? 'text-green-400' : 'text-red-400'}`} role="alert">
                {message.type === 'success' ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                <span>{message.text}</span>
              </div>
            )}
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}