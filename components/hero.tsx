import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          Build Amazing Web Apps with <span className="text-blue-600">TypeScript & React</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
          Create type-safe, scalable, and maintainable web applications with the power of TypeScript and the flexibility
          of React.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg">Get Started</Button>
          <Button variant="outline" size="lg">
            Learn More
          </Button>
        </div>
      </div>
    </section>
  )
}
