import { useState } from "react"
import { Plus } from "lucide-react"

const faqs = [
  {
    question: "Сколько номеров в отеле?",
    answer:
      "В мини-отеле «Калейдоскоп» 4 номера на общей площади 158 м². Камерный формат позволяет нам уделять внимание каждому гостю и поддерживать тихую, приватную атмосферу.",
  },
  {
    question: "Во сколько заезд и выезд?",
    answer:
      "Стандартное время заезда — с 14:00, выезд — до 12:00. По возможности мы всегда идём навстречу и предлагаем ранний заезд или поздний выезд — просто напишите нам заранее.",
  },
  {
    question: "Входит ли завтрак в стоимость?",
    answer:
      "Да, для наших гостей мы готовим домашний завтрак. Также в вашем распоряжении уютная гостевая кухня, где можно приготовить чай или лёгкий перекус в любое время.",
  },
  {
    question: "Какие номера у вас есть?",
    answer:
      "Мы предлагаем 4 типа номеров: уютные двухместные Standard и Comfort, просторный семейный номер и люкс с лучшим видом. Каждый номер оформлен с особым вниманием к деталям интерьера.",
  },
  {
    question: "Можно ли с детьми и животными?",
    answer:
      "Мы рады гостям с детьми — для них предусмотрен семейный номер. По размещению с питомцами уточните детали при бронировании, мы подскажем доступные варианты.",
  },
  {
    question: "Как забронировать номер?",
    answer:
      "Свяжитесь с нами по телефону или напишите на почту — мы подберём номер под ваши даты и пожелания, расскажем о свободных вариантах и подтвердим бронь.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-20 md:py-29">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-16">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Вопросы</p>
          <h2 className="text-6xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-7xl">
            Частые вопросы
          </h2>
        </div>

        <div>
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-border">
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full py-6 flex items-start justify-between gap-6 text-left group"
              >
                <span className="text-lg font-medium text-foreground transition-colors group-hover:text-foreground/70">
                  {faq.question}
                </span>
                <Plus
                  className={`w-6 h-6 text-foreground flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-45" : "rotate-0"
                  }`}
                  strokeWidth={1.5}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-muted-foreground leading-relaxed pb-6 pr-12">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}