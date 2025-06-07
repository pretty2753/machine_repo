export default function Footer() {
  return (
    <footer className="bg-white py-6 border-t">
      <div className="container mx-auto px-4 text-center">
        <p className="text-gray-600">© {new Date().getFullYear()} PhotoGallery. All rights reserved.</p>
      </div>
    </footer>
  )
}
