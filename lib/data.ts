// Dados de exemplo para Mar de Versos

export interface Poem {
  id: string
  slug: string
  title: string
  content: string
  excerpt: string
  date: string
  published: boolean
}

export interface Moment {
  id: string
  title: string
  description: string
  date: string
  imageUrl?: string
}

export interface SiteConfig {
  name: string
  tagline: string
  description: string
}

export const siteConfig: SiteConfig = {
  name: "Mar de Versos",
  tagline: "Para ti, com amor",
  description: "Um cantinho especial onde guardo poemas, momentos e músicas que contam a nossa história."
}

// Playlist do Spotify
export const spotifyPlaylistId = '0h5Jnd4uYP8MQIjClZtiCR'
export const spotifyPlaylistUrl = 'https://open.spotify.com/playlist/0h5Jnd4uYP8MQIjClZtiCR?si=906bb648e7614772'

export const poems: Poem[] = [
  {
    id: "1",
    slug: "cafe-com-a-vida",
    title: "Café com a vida",
    content: `Nessa tarde, tomei café com a vida, tivemos um assunto sério de amigas de longa data. Nessa conversa, eu expliquei para ela o quanto ela me deixa confusa e cansada. Em resposta, ela me olhou com certa ternura e pediu para continuar.
Nesta conversa com a vida, eu contei que por muito tempo tive medo de desfrutar das coisas que ela me mostrava e que tive vontade de soltar sua mão. Ela riu, mas nada disse.
Frustrada com a vida, comecei a depositar uma série de acontecimentos amargos que ela me fez desfrutar, contei dos dias ansiosos, das crises de choro, das partidas não esperadas, das perdas inusitadas, dos sentimentos frustrados e dos sonhos perdidos.

A vida me olhou por um momento, ela se vestia como um lindo fim de tarde e seus olhos com toda certeza me passavam algo que eu não conseguia descrever. O tempo era estranho quando estava ao seu lado, parecia passar rápido demais e para mim era como se a vida zombasse um pouco disso.
Seus olhos se direcionaram para seu café, pegando e levando até seus lábios, como se eu não estivesse ansiando por sua resposta. Depois de alguns segundos, ela me olha e, pela primeira vez, decide falar algo, então diz: "Você faz as suas escolhas e as escolhas fazem você. Não seria tamanho egoísmo me culpar por suas decisões? no fim das contas, eu sou uma prisioneira daquilo que você faz, não é? Você, por acaso, culpa o sol por se pôr e você 'perder um dia’? A culpa, na verdade, não é sua de desperdiçar - lo? De tal modo, a culpa é minha por passar ou sua por não viver?. Minha jovem, não se prendam às coisas ruins que eu posso proporcionar, elas são apenas poucas páginas de grandes livros."

Depois disso a vida levou a xícara a mesa novamente e olhou a enorme janela que tinha ao seu lado, o sol fazia um contraste no azul do mar e as ondas pareciam uma daquelas coreografias de grandes companhias de danças, a brisa fazia um carinho suave no rosto e meus cabelos balançavam um pouco, a vida deu um sorriso que fez as dobrinhas nos seus olhos marcarem me dando uma sensação de maturidade.

E então, faz algo que me chama atenção, coloca a mão no bolso e tira um pequeno relógio, mas não muito convencional. A verdade é que o relógio estava mais para um cronômetro que me prendia a olhar com calma. Quando olhei novamente para vida, ela me olhou com olhos brilhantes e disse" Eu não tenho tempo a perder, ele é ansioso e costuma ser meio apressado, não se importe tanto com coisas fúteis. Você está crescendo, olho para seus ombros tensionados e parece que carrega o peso das grandes expectativas aí, você pensa demais... apenas viva" se levantou e foi embora. Na mesa, deixou o cronômetro e comigo deixou um grande questionamento.`,
    excerpt: "Nessa tarde, tomei café com a vida...",
    date: "2026-05-16",
    published: true,
  }
]

export const moments: Moment[] = [
  {
    id: "1",
    title: "Dia que nos conhecemos",
    description: "Aquele dia mágico em que nossos caminhos se cruzaram pela primeira vez. O início de tudo.",
    date: "2026-05-09",
  },
  {
    id: "2",
    title: "Nosso primeiro encontro",
    description: "O dia em que tudo começou. Aquele açai que mudou nossas vidas para sempre.",
    date: "2026-05-23",
  },
]

export function getPoem(slug: string): Poem | undefined {
  return poems.find(p => p.slug === slug)
}

export function getPublishedPoems(): Poem[] {
  return poems.filter(p => p.published).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getRecentPoems(count: number = 3): Poem[] {
  return getPublishedPoems().slice(0, count)
}
