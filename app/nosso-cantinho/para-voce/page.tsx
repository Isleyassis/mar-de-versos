import { Heart } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function ForYouPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-medium sm:text-3xl">
          Para Você
        </h1>
        <p className="mt-1 text-muted-foreground">
          Uma pequena carta para alguém muito especial
        </p>
      </div>

      <Card className="overflow-hidden border-rose-200/50 bg-gradient-to-br from-rose-50 to-pink-50">
        <CardContent className="p-8">
          <div className="mb-6 flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-rose-100">
              <Heart className="h-7 w-7 text-rose-500 fill-rose-500" />
            </div>
          </div>

          <div className="space-y-5 font-serif leading-8 text-lg text-red-600">
            <p>
              Em um mar de dias monótonos, pintados em tons de cinza,
              você apareceu trazendo cor, leveza e alegria para tudo ao seu redor.
            </p>

            <p>
              Eu, que não estava procurando romance, encontrei você.
              A pessoa que, em tão pouco tempo, passei a imaginar no meu futuro.
              Que ironia, né?
            </p>

            <p>
              Eu, que nunca gostei muito de conversar por mensagem,
              hoje me pego esperando uma notificação sua durante o dia.
              Mesmo quando você me arquiva às vezes, eu continuo esperando kkkkk.
            </p>

            <p>
              Eu, que sempre fui o cara que fala demais, aprendi a gostar de escutar.
              E escutaria você por minutos, horas ou dias inteiros, porque quero que
              você saiba o quanto é especial para mim. Cada história sua, cada
              pensamento, cada detalhe sobre você me interessa de verdade.
            </p>

            <p>
              E eu, que nunca fui muito de escrever, estou aqui pela segunda vez
              colocando em palavras algo que sinto com toda certeza:
              eu te quero na minha vida. E não é pouco.
            </p>

            <p>
              Quero viver muitos momentos ao seu lado. Quero construir memórias,
              dividir conquistas, enfrentar dificuldades e colecionar histórias
              que um dia vamos contar sorrindo.
            </p>

            <p>
              E, sendo sincero, existe uma cena que às vezes passa pela minha cabeça.
              Você de branco, com esse cabelão chamando a atenção de todo mundo,
              os olhos cheios de lágrimas. E eu sei que provavelmente vou estar
              igual ou pior kkkkk, pensando no quanto fui sortudo por ter encontrado
              você em um dia qualquer.
            </p>

            <p>
              Ou melhor... no nosso eterno 09/05/2026.
            </p>

            <p>
              Obrigado por trazer cor para os meus dias, por me fazer sorrir sem
              perceber e por ocupar um espaço tão especial na minha vida.
            </p>

            <div className="pt-6 text-center">
                <p className="font-serif text-lg italic text-muted-foreground">
                    Eis aqui a minha pequena declaração de amor.
                </p>
                <p className="mt-2 text-2xl">❤️</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}