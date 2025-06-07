import type React from "react"
import { Code, Shield, Zap } from "lucide-react"

interface FeatureProps {
  icon: React.ReactNode
  title: string
  description: string
}

function Feature({ icon, title, description }: FeatureProps) {
  return (
    <div className="p-6 border rounded-lg">
      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

export default function Features() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Feature
            icon={<Code className="h-6 w-6 text-blue-600" />}
            title="Type Safety"
            description="Catch errors during development with TypeScript's static type checking, making your code more reliable."
          />
          <Feature
            icon={<Zap className="h-6 w-6 text-blue-600" />}
            title="Fast Development"
            description="Improve developer productivity with intelligent code completion and inline documentation."
          />
          <Feature
            icon={<Shield className="h-6 w-6 text-blue-600" />}
            title="Maintainable Code"
            description="Create self-documenting code that's easier to refactor and maintain as your project grows."
          />
        </div>
      </div>
    </section>
  )
}
