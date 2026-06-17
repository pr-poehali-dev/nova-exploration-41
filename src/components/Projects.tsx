import { useState, useEffect, useRef } from "react"
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "Номер «Рассвет»",
    category: "Двухместный · Standard",
    location: "Тёплые тона, утренний свет",
    year: "28 м²",
    images: [
      "https://cdn.poehali.dev/projects/9b256539-8ffd-41f2-a75a-99c73a26b9a8/bucket/0e201921-495c-485b-a68b-33431a827104.png",
      "https://cdn.poehali.dev/projects/9b256539-8ffd-41f2-a75a-99c73a26b9a8/bucket/96cef56d-a8f8-4b95-995e-63e2c42fb116.png",
      "https://cdn.poehali.dev/projects/9b256539-8ffd-41f2-a75a-99c73a26b9a8/bucket/d46f3ebe-47be-4af9-adbf-a1a8c4e2f360.png",
      "https://cdn.poehali.dev/projects/9b256539-8ffd-41f2-a75a-99c73a26b9a8/bucket/00e8e88f-60ac-43a2-a933-c2f63ac7e1da.png",
    ],
  },
  {
    id: 2,
    title: "Номер «Гавань»",
    category: "Двухместный · Comfort",
    location: "Мягкая палитра, уютная зона отдыха",
    year: "34 м²",
    images: [
      "https://cdn.poehali.dev/projects/9b256539-8ffd-41f2-a75a-99c73a26b9a8/bucket/077992a1-ebd5-4828-b019-8b1d647f459f.png",
      "https://cdn.poehali.dev/projects/9b256539-8ffd-41f2-a75a-99c73a26b9a8/bucket/1c456d1e-fd3f-4e0f-823c-f8a54de36a20.png",
      "https://cdn.poehali.dev/projects/9b256539-8ffd-41f2-a75a-99c73a26b9a8/bucket/2d8408b3-a1df-4f98-8e51-280da5b6be70.png",
      "https://cdn.poehali.dev/projects/9b256539-8ffd-41f2-a75a-99c73a26b9a8/bucket/c15e3a3b-a116-4a9d-8dfe-ef54d1c3a118.png",
      "https://cdn.poehali.dev/projects/9b256539-8ffd-41f2-a75a-99c73a26b9a8/bucket/f19a7e13-3351-40bb-a0ef-733ae060a097.png",
    ],
  },
  {
    id: 3,
    title: "Номер «Палитра»",
    category: "Семейный · Family",
    location: "Простор для всей семьи",
    year: "42 м²",
    images: [
      "https://cdn.poehali.dev/projects/9b256539-8ffd-41f2-a75a-99c73a26b9a8/bucket/61553286-61f2-47ec-97e0-df9406f4281a.png",
      "https://cdn.poehali.dev/projects/9b256539-8ffd-41f2-a75a-99c73a26b9a8/bucket/dbd2de7f-6e8b-43bd-9a08-76b26c40b088.png",
      "https://cdn.poehali.dev/projects/9b256539-8ffd-41f2-a75a-99c73a26b9a8/bucket/58871ee3-03d8-4364-928d-8289b72c7465.png",
      "https://cdn.poehali.dev/projects/9b256539-8ffd-41f2-a75a-99c73a26b9a8/bucket/34813e22-2d38-475f-8b0c-e8ac152aaae3.png",
    ],
  },
  {
    id: 4,
    title: "Номер «Грань»",
    category: "Люкс · Suite",
    location: "Лучший вид и максимум комфорта",
    year: "54 м²",
    images: ["/images/hously-4.png"],
  },
]

function ProjectCard({ project, index, revealedImages, imageRef }: {
  project: typeof projects[0]
  index: number
  revealedImages: Set<number>
  imageRef: (el: HTMLDivElement | null) => void
}) {
  const [currentImg, setCurrentImg] = useState(0)
  const [hovered, setHovered] = useState(false)
  const hasMultiple = project.images.length > 1

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentImg((i) => (i - 1 + project.images.length) % project.images.length)
  }
  const next = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentImg((i) => (i + 1) % project.images.length)
  }

  return (
    <article
      className="group cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div ref={imageRef} className="relative overflow-hidden aspect-[4/3] mb-6">
        <img
          src={project.images[currentImg]}
          alt={project.title}
          className={`w-full h-full object-cover transition-transform duration-700 ${hovered ? "scale-105" : "scale-100"}`}
        />
        <div
          className="absolute inset-0 bg-primary origin-top"
          style={{
            transform: revealedImages.has(project.id) ? "scaleY(0)" : "scaleY(1)",
            transition: "transform 1.5s cubic-bezier(0.76, 0, 0.24, 1)",
          }}
        />
        {hasMultiple && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/60 text-white rounded-full p-1.5 transition-opacity duration-200 opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/60 text-white rounded-full p-1.5 transition-opacity duration-200 opacity-0 group-hover:opacity-100"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {project.images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setCurrentImg(i) }}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${i === currentImg ? "bg-white scale-125" : "bg-white/50"}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-medium mb-2 group-hover:underline underline-offset-4">{project.title}</h3>
          <p className="text-muted-foreground text-sm">
            {project.category} · {project.location}
          </p>
        </div>
        <span className="text-muted-foreground/60 text-sm">{project.year}</span>
      </div>
    </article>
  )
}

export function Projects() {
  const [revealedImages, setRevealedImages] = useState<Set<number>>(new Set())
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = imageRefs.current.indexOf(entry.target as HTMLDivElement)
            if (index !== -1) {
              setRevealedImages((prev) => new Set(prev).add(projects[index].id))
            }
          }
        })
      },
      { threshold: 0.2 },
    )

    imageRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="projects" className="py-32 md:py-29 bg-secondary/50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Номерной фонд</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight">Наши номера</h2>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            Забронировать номер
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              revealedImages={revealedImages}
              imageRef={(el) => { imageRefs.current[index] = el }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}