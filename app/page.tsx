"use client"
import Header from "@/components/header"
import ImageSlider from "@/components/image-slider"
import ImageGrid from "@/components/image-grid"
import Footer from "@/components/footer"

export default function Home() {
  // 슬라이더 이미지 데이터 (아이돌 사진)
  const sliderImages = [
    {
      id: 1,
      src: "/placeholder.svg?height=600&width=1200&text=아이돌+모자+착용+사진",
      alt: "아이돌 모자 착용 사진 1",
      title: "신규 앨범 발매 기념 화보",
    },
    {
      id: 2,
      src: "/placeholder.svg?height=600&width=1200&text=아이돌+모자+화보+촬영",
      alt: "아이돌 모자 착용 사진 2",
      title: "여름 시즌 화보 촬영",
    },
    {
      id: 3,
      src: "/placeholder.svg?height=600&width=1200&text=아이돌+그룹+모자+컨셉",
      alt: "아이돌 그룹 모자 컨셉 사진",
      title: "신곡 뮤직비디오 비하인드",
    },
  ]

  // 그리드 이미지 데이터 (아이돌 사진)
  const gridImages = [
    {
      id: 4,
      src: "/placeholder.svg?height=400&width=600&text=아이돌+스냅샷+1",
      alt: "아이돌 스냅샷 1",
      title: "콘서트 비하인드 컷",
      description: "지난 주말 열린 단독 콘서트에서 촬영된 비하인드 사진입니다.",
    },
    {
      id: 5,
      src: "/placeholder.svg?height=400&width=600&text=아이돌+화보+2",
      alt: "아이돌 화보 2",
      title: "매거진 화보 촬영",
      description: "유명 패션 매거진 표지를 장식한 화보 촬영 컷입니다.",
    },
    {
      id: 6,
      src: "/placeholder.svg?height=400&width=600&text=아이돌+팬미팅+3",
      alt: "아이돌 팬미팅 3",
      title: "팬미팅 현장",
      description: "팬들과 소통하는 특별한 팬미팅 현장에서 촬영된 사진입니다.",
    },
    {
      id: 7,
      src: "/placeholder.svg?height=400&width=600&text=아이돌+무대+4",
      alt: "아이돌 무대 4",
      title: "음악방송 무대",
      description: "신곡 활동으로 음악방송에 출연한 무대 사진입니다.",
    },
    {
      id: 8,
      src: "/placeholder.svg?height=400&width=600&text=아이돌+일상+5",
      alt: "아이돌 일상 5",
      title: "일상 속 모습",
      description: "SNS에 공개된 일상 속 자연스러운 모습이 담긴 사진입니다.",
    },
    {
      id: 9,
      src: "/placeholder.svg?height=400&width=600&text=아이돌+단체샷+6",
      alt: "아이돌 단체샷 6",
      title: "그룹 단체 사진",
      description: "새 앨범 발매를 기념하여 촬영한 그룹 단체 사진입니다.",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow">
        <ImageSlider images={sliderImages} />
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold mb-8 text-center">이번 주 베스트 아이템</h2>
          <ImageGrid images={gridImages} />
        </div>
      </main>
      <Footer />
    </div>
  )
}
