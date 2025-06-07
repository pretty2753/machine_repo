"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // 입력 시 해당 필드의 에러 메시지 초기화
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, rememberMe: checked }))
  }

  const validateForm = () => {
    let valid = true
    const newErrors = { email: "", password: "" }

    if (!formData.email) {
      newErrors.email = "이메일을 입력해주세요"
      valid = false
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "유효한 이메일 주소를 입력해주세요"
      valid = false
    }

    if (!formData.password) {
      newErrors.password = "비밀번호를 입력해주세요"
      valid = false
    } else if (formData.password.length < 6) {
      newErrors.password = "비밀번호는 6자 이상이어야 합니다"
      valid = false
    }

    setErrors(newErrors)
    return valid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      // 실제 구현에서는 서버에 인증 요청을 보내야 합니다.
      // 여기서는 간단한 데모를 위해 로컬 스토리지에 사용자 정보를 저장합니다.
      await new Promise((resolve) => setTimeout(resolve, 1500)) // 로딩 시뮬레이션

      // 로그인 성공 처리
      localStorage.setItem("isLoggedIn", "true")
      localStorage.setItem("user", JSON.stringify({ email: formData.email }))

      toast({
        title: "로그인 성공",
        description: "환영합니다!",
      })

      // 홈페이지로 리다이렉트
      router.push("/")
    } catch (error) {
      console.error("Login error:", error)
      toast({
        title: "로그인 실패",
        description: "이메일 또는 비밀번호를 확인해주세요.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialLogin = async (provider: "google" | "kakao") => {
    setIsLoading(true)

    try {
      // 실제 구현에서는 OAuth 인증 과정을 거쳐야 합니다.
      // 여기서는 간단한 데모를 위해 로컬 스토리지에 사용자 정보를 저장합니다.
      await new Promise((resolve) => setTimeout(resolve, 1500)) // 로딩 시뮬레이션

      // 소셜 로그인 성공 처리
      localStorage.setItem("isLoggedIn", "true")
      localStorage.setItem(
        "user",
        JSON.stringify({
          email: provider === "google" ? "user@gmail.com" : "user@kakao.com",
          registrationMethod: provider,
        }),
      )

      toast({
        title: `${provider === "google" ? "구글" : "카카오"} 계정으로 로그인 성공`,
        description: "환영합니다!",
      })

      // 홈페이지로 리다이렉트
      router.push("/")
    } catch (error) {
      console.error(`${provider} login error:`, error)
      toast({
        title: "로그인 실패",
        description: `${provider === "google" ? "구글" : "카카오"} 계정으로 로그인 중 오류가 발생했습니다.`,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow flex items-center justify-center py-12">
        <div className="w-full max-w-md px-4">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-6">
                <Button variant="ghost" size="icon" asChild className="h-8 w-8">
                  <Link href="/">
                    <ArrowLeft className="h-4 w-4" />
                    <span className="sr-only">홈으로</span>
                  </Link>
                </Button>
                <h1 className="text-2xl font-bold">로그인</h1>
              </div>

              <div className="space-y-4 mb-6">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2 h-12"
                  onClick={() => handleSocialLogin("google")}
                  disabled={isLoading}
                >
                  <div className="w-5 h-5 relative">
                    <svg viewBox="0 0 24 24" width="20" height="20">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                  </div>
                  <span>구글로 로그인</span>
                </Button>

                <Button
                  type="button"
                  className="w-full flex items-center justify-center gap-2 h-12 bg-[#FEE500] hover:bg-[#FDD835] text-black"
                  onClick={() => handleSocialLogin("kakao")}
                  disabled={isLoading}
                >
                  <div className="w-5 h-5 relative">
                    <svg viewBox="0 0 24 24" width="20" height="20">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 2.5C6.201 2.5 1.5 6.151 1.5 10.662c0 2.876 1.921 5.401 4.777 6.817-.207.786-.784 2.842-.899 3.285-.141.554.202.548.424.399.173-.116 2.753-1.88 3.858-2.642.765.106 1.549.162 2.34.162 5.799 0 10.5-3.651 10.5-8.021C22.5 6.151 17.799 2.5 12 2.5z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <span>카카오로 로그인</span>
                </Button>
              </div>

              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">또는 이메일로 로그인</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium">
                    이메일
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isLoading}
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-medium">
                    비밀번호
                  </label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      disabled={isLoading}
                      className={errors.password ? "border-red-500 pr-10" : "pr-10"}
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      <span className="sr-only">{showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}</span>
                    </button>
                  </div>
                  {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={formData.rememberMe}
                      onCheckedChange={handleCheckboxChange}
                      disabled={isLoading}
                    />
                    <label
                      htmlFor="remember"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      로그인 상태 유지
                    </label>
                  </div>
                  <Link href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                    비밀번호 찾기
                  </Link>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "로그인 중..." : "로그인"}
                </Button>

                <div className="text-center text-sm">
                  <span className="text-gray-600">계정이 없으신가요?</span>{" "}
                  <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500">
                    회원가입
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
