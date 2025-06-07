// 이 파일은 이미 존재하는 파일이지만, 코드를 제공합니다.
// 실제 프로젝트에서는 이 파일을 수정하지 않아도 됩니다.

"use client"

import { useState, useEffect, useCallback } from "react"

type ToastVariant = "default" | "destructive"

interface ToastProps {
  title: string
  description?: string
  variant?: ToastVariant
}

export function useToast() {
  const [toasts, setToasts] = useState<(ToastProps & { id: string })[]>([])

  const toast = useCallback(({ title, description, variant = "default" }: ToastProps) => {
    const id = Math.random().toString(36).substring(2, 9)
    setToasts((prev) => [...prev, { id, title, description, variant }])

    // 3초 후 자동으로 토스트 제거
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id))
    }, 3000)

    return id
  }, [])

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  // 토스트 컴포넌트 렌더링
  useEffect(() => {
    if (toasts.length > 0) {
      const toastContainer = document.getElementById("toast-container")

      if (!toastContainer) {
        const container = document.createElement("div")
        container.id = "toast-container"
        container.className = "fixed bottom-4 right-4 z-50 flex flex-col gap-2"
        document.body.appendChild(container)

        toasts.forEach((toast) => {
          const toastElement = document.createElement("div")
          toastElement.id = `toast-${toast.id}`
          toastElement.className = `p-4 rounded-md shadow-md transition-all duration-300 ${
            toast.variant === "destructive" ? "bg-red-500 text-white" : "bg-white text-gray-800 border"
          }`

          const titleElement = document.createElement("div")
          titleElement.className = "font-medium"
          titleElement.textContent = toast.title
          toastElement.appendChild(titleElement)

          if (toast.description) {
            const descElement = document.createElement("div")
            descElement.className = "text-sm"
            descElement.textContent = toast.description
            toastElement.appendChild(descElement)
          }

          container.appendChild(toastElement)

          // 애니메이션 효과
          setTimeout(() => {
            toastElement.style.opacity = "1"
            toastElement.style.transform = "translateY(0)"
          }, 10)
        })
      }
    }

    return () => {
      const container = document.getElementById("toast-container")
      if (container && toasts.length === 0) {
        document.body.removeChild(container)
      }
    }
  }, [toasts])

  return { toast, dismiss }
}
