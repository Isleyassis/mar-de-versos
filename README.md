# Mar de Versos

## Sobre o Projeto

**Mar de Versos** é uma plataforma dedicada à publicação de poemas, reflexões e textos autorais. O projeto nasceu com a proposta de criar um espaço simples, elegante e acolhedor para compartilhar sentimentos através da escrita.

Inspirado pelo poema **"Café com a Vida"**, que marcou o início da ideia do projeto, o Mar de Versos busca ser um refúgio digital onde emoções, memórias, paixões e reflexões possam ser transformadas em palavras.

Seu nome remete à imensidão dos sentimentos humanos: um oceano de experiências, pensamentos e emoções representados por versos.

---

## Propósito

O objetivo do Mar de Versos é oferecer uma experiência de leitura agradável e minimalista, permitindo que os visitantes explorem textos autorais sem distrações.

A plataforma também disponibiliza uma área administrativa para que o autor possa criar, editar e gerenciar conteúdos sem a necessidade de conhecimentos técnicos.

---

## Identidade

### Nome

**Mar de Versos**

### Slogan

> Entre poemas e paixões.

### Descrição

> Um mar de versos onde sentimentos, memórias e paixões encontram as palavras.

---

## Funcionalidades

### Área Pública

* Visualização de todos os poemas publicados.
* Página individual para cada publicação.
* Exibição de:

  * Título
  * Descrição
  * Imagem de capa (opcional)
  * Data de publicação
  * Conteúdo completo
* Navegação simples e intuitiva.
* Design responsivo para dispositivos móveis e desktop.

### Área Administrativa

* Login administrativo.
* Criação de novas publicações.
* Edição de publicações existentes.
* Exclusão de publicações.
* Gerenciamento de imagens de capa.
* Geração automática de slugs para URLs amigáveis.

---

## Estrutura de Conteúdo

Cada publicação contém:

```typescript
{
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  image?: string;
  createdAt: string;
}
```

---

## Tecnologias

### Front-end

* Next.js
* React
* TypeScript
* Tailwind CSS

### Back-end

* Next.js App Router
* Server Components
* API Routes

### Armazenamento

Atualmente os conteúdos são armazenados em arquivo JSON local:

```text
data/posts.json
```

Essa abordagem mantém o projeto simples e fácil de hospedar.

---

## Filosofia de Design

O Mar de Versos prioriza:

* Simplicidade
* Elegância
* Leitura confortável
* Carregamento rápido
* Interface limpa
* Foco no conteúdo

A experiência visual deve valorizar o texto, permitindo que cada poema seja o verdadeiro protagonista.

---

## Público-Alvo

* Leitores de poesia
* Escritores independentes
* Pessoas que apreciam reflexões e textos autorais
* Amantes da literatura contemporânea
* Visitantes em busca de inspiração e sensibilidade

---

## Visão Futura

Possíveis evoluções para o projeto:

* Categorias de poemas
* Busca por palavras-chave
* Sistema de favoritos
* Comentários
* Compartilhamento em redes sociais
* Painel administrativo avançado
* Banco de dados dedicado
* Upload de imagens
* SEO aprimorado
* Modo escuro

---

## Mensagem do Projeto

O Mar de Versos acredita que algumas emoções só encontram seu verdadeiro significado quando se tornam palavras.

Cada poema publicado representa uma pequena maré de sentimentos compartilhada com o mundo.

Que cada visitante encontre aqui um verso capaz de tocar sua própria história.
