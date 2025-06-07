import Image from "next/image"
import Link from "next/link"

interface ImageType {
  id: number
  src: string
  alt: string
  title: string
  description: string
}

interface ImageGridProps {
  images: ImageType[]
}

export default function ImageGrid({ images }: ImageGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {images.map((image) => (
        <Link key={image.id} href={`/photos/${image.id}`} className="group">
          <div className="overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-lg bg-white">
            <div className="relative h-64 w-full">
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{image.title}</h3>
              <p className="text-gray-600 line-clamp-2">{image.description}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
