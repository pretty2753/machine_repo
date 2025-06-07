"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useFavorites } from "@/hooks/use-favorites"

// 모든 사진 데이터 가져오기 (실제로는 API나 데이터베이스에서 가져올 수 있습니다)
const getAllPhotos = () => {
  return [
    {
      id: 1,
      src: "/placeholder.svg?height=600&width=1200",
      alt: "슬라이드 이미지 1",
      title: "자연의 아름다움",
      description:
        "이 사진은 아름다운 자연의 풍경을 담고 있습니다. 푸른 하늘과 울창한 숲, 그리고 맑은 호수가 어우러진 완벽한 조화를 보여줍니다.",
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
        "현대적인 도시의 풍경을 담은 이 사진은 도시의 활기와 에너지를 잘 표현하고 있습니다. 높은 빌딩들과 분주한 거리, 그리고 도시의 불빛이 만들어내는 독특한 분위기가 인상적입니다.",
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
        "끝없이 펼쳐진 바다의 전경을 담은 이 사진은 평온함과 광활함을 동시에 느끼게 합니다. 푸른 바다와 하늘이 맞닿은 수평선, 그리고 잔잔한 파도가 만들어내는 리듬감이 인상적입니다.",
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
        "웅장한 산의 풍경을 담은 이 사진은 자연의 위대함을 느끼게 합니다. 높이 솟은 산봉우리와 울창한 숲, 그리고 맑은 공기가 만들어내는 특별한 분위기가 인상적입니다.",
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
        "고요한 호수의 아름다운 전경을 담은 이 사진은 평화로움과 고요함을 전달합니다. 맑은 호수에 비친 하늘과 주변의 산들이 만들어내는 대칭적인 풍경이 인상적입니다.",
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
        "울창한 숲속을 걷는 길의 모습을 담은 이 사진은 자연과의 교감을 느끼게 합니다. 높은 나무들 사이로 비치는 햇살과 푸른 이끼, 그리고 고요한 분위기가 인상적입니다.",
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
        "화려한 도시의 야경을 담은 이 사진은 현대 도시의 활기와 에너지를 보여줍니다. 반짝이는 빌딩의 불빛과 도시의 스카이라인이 만들어내는 장관이 인상적입니다.",
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
        "아름다운 해변에서 바라본 일몰 장면을 담은 이 사진은 하루의 끝을 아름답게 마무리하는 자연의 선물을 보여줍니다. 붉게 물든 하늘과 바다, 그리고 실루엣으로 보이는 해변의 풍경이 인상적입니다.",
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
        "다양한 색상의 꽃들로 가득한 꽃밭을 담은 이 사진은 봄의 생동감과 아름다움을 전달합니다. 화려한 색상의 꽃들과 푸른 하늘이 만들어내는 대비가 인상적입니다.",
      photographer: "조꽃밭",
      location: "경기도 고양",
      date: "2023년 4월 25일",
    },
  ]
}

export default function FavoritesPage() {
  const { favorites, toggleFavorite } = useFavorites()
  const [favoritePhotos, setFavoritePhotos] = useState<any[]>([])

  useEffect(() => {
    const allPhotos = getAllPhotos()
    const filteredPhotos = allPhotos.filter((photo) => favorites.includes(photo.id))
    setFavoritePhotos(filteredPhotos)
  }, [favorites])

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" asChild className="flex items-center gap-2">
              <Link href="/">
                <ArrowLeft className="h-4 w-4" />
                홈으로
              </Link>
            </Button>
            <h1 className="text-3xl font-bold">찜한 사진</h1>
            <span className="bg-red-100 text-red-600 text-sm px-2 py-1 rounded-full">{favoritePhotos.length}개</span>
          </div>

          {favoritePhotos.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-lg shadow-sm">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                <Heart className="h-8 w-8 text-gray-400" />
              </div>
              <h2 className="text-xl font-medium text-gray-600 mb-4">아직 찜한 사진이 없습니다</h2>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                마음에 드는 사진을 찾아 하트 버튼을 눌러 찜해보세요. 찜한 사진은 이곳에서 모아볼 수 있습니다.
              </p>
              <Button asChild>
                <Link href="/">사진 둘러보기</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoritePhotos.map((photo) => (
                <div key={photo.id} className="group relative">
                  <Link href={`/photos/${photo.id}`} className="block">
                    <div className="overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-lg bg-white">
                      <div className="relative h-64 w-full">
                        <Image
                          src={photo.src || "/placeholder.svg"}
                          alt={photo.alt}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-semibold mb-2">{photo.title}</h3>
                        <p className="text-gray-600 line-clamp-2">{photo.description}</p>
                      </div>
                    </div>
                  </Link>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white border-none text-red-500"
                    onClick={() => toggleFavorite(photo.id)}
                  >
                    <Heart className="h-5 w-5 fill-current" />
                    <span className="sr-only">찜 취소</span>
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
