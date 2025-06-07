"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useFavorites } from "@/hooks/use-favorites"
import { cn } from "@/lib/utils"

// 이미지 데이터 (실제로는 API나 데이터베이스에서 가져올 수 있습니다)
const getPhotoData = (id: number) => {
  const photos = [
    {
      id: 1,
      src: "/placeholder.svg?height=600&width=1200",
      alt: "슬라이드 이미지 1",
      title: "자연의 아름다움",
      description:
        "이 사진은 아름다운 자연의 풍경을 담고 있습니다. 푸른 하늘과 울창한 숲, 그리고 맑은 호수가 어우러진 완벽한 조화를 보여줍니다. 이 장소는 많은 사진작가들이 찾는 명소로, 계절마다 다른 매력을 선사합니다. 특히 봄에는 다양한 꽃들이 피어나 더욱 아름다운 풍경을 만들어냅니다.",
      photographer: "김사진",
      location: "강원도 평창",
      date: "2023년 5월 15일",
    },
    {
      id: 2,
      src: "/placeholder.svg?height=600&width=1200",
      alt: "슬라이드 이미지 2",
      title: "도시의 풍경",
      description:
        "현대적인 도시의 풍경을 담은 이 사진은 도시의 활기와 에너지를 잘 표현하고 있습니다. 높은 빌딩들과 분주한 거리, 그리고 도시의 불빛이 만들어내는 독특한 분위기가 인상적입니다. 이 도시는 밤에 더욱 아름다운 모습을 보여주며, 다양한 문화와 예술이 공존하는 곳입니다.",
      photographer: "이도시",
      location: "서울 강남구",
      date: "2023년 7월 22일",
    },
    {
      id: 3,
      src: "/placeholder.svg?height=600&width=1200",
      alt: "슬라이드 이미지 3",
      title: "바다의 전경",
      description:
        "끝없이 펼쳐진 바다의 전경을 담은 이 사진은 평온함과 광활함을 동시에 느끼게 합니다. 푸른 바다와 하늘이 맞닿은 수평선, 그리고 잔잔한 파도가 만들어내는 리듬감이 인상적입니다. 이 해변은 일출과 일몰 모두 아름다운 장소로, 많은 여행객들이 찾는 명소입니다.",
      photographer: "박해변",
      location: "제주도 서귀포",
      date: "2023년 8월 10일",
    },
    {
      id: 4,
      src: "/placeholder.svg?height=400&width=600",
      alt: "그리드 이미지 1",
      title: "산의 풍경",
      description:
        "웅장한 산의 풍경을 담은 이 사진은 자연의 위대함을 느끼게 합니다. 높이 솟은 산봉우리와 울창한 숲, 그리고 맑은 공기가 만들어내는 특별한 분위기가 인상적입니다. 이 산은 사계절 내내 등산객들에게 사랑받는 장소로, 특히 가을 단풍이 아름답기로 유명합니다.",
      photographer: "정산악",
      location: "전라북도 무주",
      date: "2023년 10월 5일",
    },
    {
      id: 5,
      src: "/placeholder.svg?height=400&width=600",
      alt: "그리드 이미지 2",
      title: "호수의 전경",
      description:
        "고요한 호수의 아름다운 전경을 담은 이 사진은 평화로움과 고요함을 전달합니다. 맑은 호수에 비친 하늘과 주변의 산들이 만들어내는 대칭적인 풍경이 인상적입니다. 이 호수는 계절마다 다른 매력을 보여주며, 특히 안개가 피어오르는 이른 아침의 모습이 아름답습니다.",
      photographer: "최호수",
      location: "충청북도 충주",
      date: "2023년 4월 18일",
    },
    {
      id: 6,
      src: "/placeholder.svg?height=400&width=600",
      alt: "그리드 이미지 3",
      title: "숲속의 길",
      description:
        "울창한 숲속을 걷는 길의 모습을 담은 이 사진은 자연과의 교감을 느끼게 합니다. 높은 나무들 사이로 비치는 햇살과 푸른 이끼, 그리고 고요한 분위기가 인상적입니다. 이 숲길은 많은 하이커들이 찾는 명소로, 다양한 야생 동식물을 관찰할 수 있는 곳입니다.",
      photographer: "한숲길",
      location: "경상북도 영주",
      date: "2023년 6월 30일",
    },
    {
      id: 7,
      src: "/placeholder.svg?height=400&width=600",
      alt: "그리드 이미지 4",
      title: "도시의 야경",
      description:
        "화려한 도시의 야경을 담은 이 사진은 현대 도시의 활기와 에너지를 보여줍니다. 반짝이는 빌딩의 불빛과 도시의 스카이라인이 만들어내는 장관이 인상적입니다. 이 전망대는 도시의 야경을 감상하기 좋은 장소로, 많은 관광객들이 찾는 명소입니다.",
      photographer: "윤야경",
      location: "부산 해운대구",
      date: "2023년 9월 12일",
    },
    {
      id: 8,
      src: "/placeholder.svg?height=400&width=600",
      alt: "그리드 이미지 5",
      title: "해변의 일몰",
      description:
        "아름다운 해변에서 바라본 일몰 장면을 담은 이 사진은 하루의 끝을 아름답게 마무리하는 자연의 선물을 보여줍니다. 붉게 물든 하늘과 바다, 그리고 실루엣으로 보이는 해변의 풍경이 인상적입니다. 이 해변은 일몰 명소로 유명하며, 많은 커플들이 찾는 로맨틱한 장소입니다.",
      photographer: "송일몰",
      location: "인천 영종도",
      date: "2023년 7월 8일",
    },
    {
      id: 9,
      src: "/placeholder.svg?height=400&width=600",
      alt: "그리드 이미지 6",
      title: "꽃밭의 풍경",
      description:
        "다양한 색상의 꽃들로 가득한 꽃밭을 담은 이 사진은 봄의 생동감과 아름다움을 전달합니다. 화려한 색상의 꽃들과 푸른 하늘이 만들어내는 대비가 인상적입니다. 이 꽃밭은 봄마다 많은 방문객들이 찾는 명소로, 다양한 종류의 꽃들을 감상할 수 있는 곳입니다.",
      photographer: "조꽃밭",
      location: "경기도 고양",
      date: "2023년 4월 25일",
    },
  ]

  return photos.find((photo) => photo.id === id)
}

export default function PhotoDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const photoId = Number.parseInt(params.id)
  const [photo, setPhoto] = useState<any>(null)
  const { isFavorite, toggleFavorite } = useFavorites()

  useEffect(() => {
    const photoData = getPhotoData(photoId)
    if (!photoData) {
      router.push("/404")
      return
    }
    setPhoto(photoData)
  }, [photoId, router])

  if (!photo) {
    return <div className="min-h-screen flex items-center justify-center">로딩 중...</div>
  }

  const isPhotoFavorite = isFavorite(photo.id)

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow">
        {/* 상단 섹션: 이미지(좌측)와 설명(우측) */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <Button variant="ghost" asChild className="flex items-center gap-2">
              <Link href="/">
                <ArrowLeft className="h-4 w-4" />
                돌아가기
              </Link>
            </Button>

            <Button
              variant={isPhotoFavorite ? "default" : "outline"}
              size="sm"
              className={cn(
                "flex items-center gap-2",
                isPhotoFavorite
                  ? "bg-red-500 hover:bg-red-600 text-white border-red-500"
                  : "border-red-200 text-red-500 hover:bg-red-50",
              )}
              onClick={() => toggleFavorite(photo.id)}
            >
              <Heart className={cn("h-4 w-4", isPhotoFavorite && "fill-current")} />
              {isPhotoFavorite ? "찜 취소" : "찜하기"}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-md">
              <Image src={photo.src || "/placeholder.svg"} alt={photo.alt} fill className="object-cover" priority />
            </div>
            <div className="flex flex-col justify-center">
              <h1 className="text-3xl font-bold mb-4">{photo.title}</h1>
              <p className="text-gray-700 mb-6">{photo.description}</p>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">사진작가</h3>
                    <p className="text-gray-900">{photo.photographer}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">촬영 장소</h3>
                    <p className="text-gray-900">{photo.location}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">촬영 날짜</h3>
                    <p className="text-gray-900">{photo.date}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 하단 섹션: 중앙에 큰 이미지 */}
        <div className="bg-white py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 text-center">전체 보기</h2>
            <div className="max-w-4xl mx-auto relative aspect-[16/9] rounded-lg overflow-hidden shadow-lg">
              <Image src={photo.src || "/placeholder.svg"} alt={photo.alt} fill className="object-cover" />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
