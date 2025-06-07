"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Heart, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useFavorites } from "@/hooks/use-favorites"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export default function Header() {
  const { favorites } = useFavorites()
  const favoritesCount = favorites.length
  const { toast } = useToast()
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<{ email: string } | null>(null)

  // 컴포넌트 마운트 시 로그인 상태 확인
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true"
    setIsLoggedIn(loggedIn)

    if (loggedIn) {
      try {
        const userData = JSON.parse(localStorage.getItem("user") || "{}")
        setUser(userData)
      } catch (error) {
        console.error("Failed to parse user data:", error)
      }
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("user")
    setIsLoggedIn(false)
    setUser(null)

    toast({
      title: "로그아웃 되었습니다",
      description: "다음에 또 만나요!",
    })

    router.push("/")
  }

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-gray-800">
            <span className="text-blue-500">Photo</span>Gallery
          </Link>
          <div className="flex items-center gap-3">
            <Button
              variant={favoritesCount > 0 ? "default" : "ghost"}
              size="icon"
              asChild
              className={cn("relative", favoritesCount > 0 && "bg-red-50 hover:bg-red-100 text-red-500 border-red-200")}
            >
              <Link href="/favorites">
                <Heart className={cn("h-5 w-5", favoritesCount > 0 && "fill-red-500 text-red-500")} />
                {favoritesCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                    {favoritesCount}
                  </span>
                )}
                <span className="sr-only">찜 목록</span>
              </Link>
            </Button>

            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600 hidden md:inline-block">{user?.email}</span>
                <Button variant="outline" size="sm" onClick={handleLogout} className="flex items-center gap-2">
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline-block">로그아웃</span>
                </Button>
              </div>
            ) : (
              <Button asChild>
                <Link href="/login">로그인</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
