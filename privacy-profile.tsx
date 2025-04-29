"use client"

import { useState } from "react"
import { Lock, ShoppingCart, Globe, Menu, Heart, MessageSquare, ImageIcon, Send, Eye, Users, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function PrivacyProfile() {
  const [showExpandedContent, setShowExpandedContent] = useState(true)
  const [showSocialModal, setShowSocialModal] = useState(false)
  const [selectedSocialPlatform, setSelectedSocialPlatform] = useState("")
  const [showSubscriptionAlert, setShowSubscriptionAlert] = useState(false)
  const [showFullBio, setShowFullBio] = useState(false)

  // Lista de artistas
  const artists = [
    {
      id: "julia",
      name: "Júlia Fernandes",
      username: "@juliafernandes",
      image: "https://placehold.co/200x200/f9a8d4/ffffff?text=J",
      bio: "Modelo e dançarina profissional. Compartilho minha rotina de treinos e ensaios exclusivos.",
      stats: { posts: 127, media: 215, likes: "18.2K" },
    },
    {
      id: "amanda",
      name: "Amanda Silva",
      username: "@amandasilva",
      image: "https://placehold.co/200x200/a5b4fc/ffffff?text=A",
      bio: "Fotógrafa e modelo. Conteúdo artístico e ensaios exclusivos todos os dias.",
      stats: { posts: 98, media: 183, likes: "12.5K" },
      isLive: true,
    },
    {
      id: "carla",
      name: "Carla Oliveira",
      username: "@carlaoliveira",
      image: "https://placehold.co/200x200/fcd34d/ffffff?text=C",
      bio: "Influenciadora e criadora de conteúdo. Dicas de moda, beleza e lifestyle.",
      stats: { posts: 156, media: 247, likes: "22.7K" },
      isLive: true,
    },
    {
      id: "beatriz",
      name: "Beatriz Costa",
      username: "@beatrizcosta",
      image: "https://placehold.co/200x200/86efac/ffffff?text=B",
      bio: "Atriz e modelo. Compartilho bastidores de ensaios e projetos exclusivos.",
      stats: { posts: 112, media: 198, likes: "15.9K" },
    },
    {
      id: "daniela",
      name: "Daniela Martins",
      username: "@danielamartins",
      image: "https://placehold.co/200x200/fdba74/ffffff?text=D",
      bio: "Dançarina e professora de dança. Coreografias exclusivas e aulas particulares.",
      stats: { posts: 87, media: 156, likes: "9.8K" },
    },
  ]

  // Links externos para pagamentos
  const externalLinks = {
    "1month": "https://your-payment-link-for-1month.com",
    "3months": "https://your-payment-link-for-3months.com",
    "6months": "https://your-payment-link-for-6months.com",
  }

  // Planos de assinatura em português
  const plans = [
    { id: "1month", name: "Mensal", price: "R$ 45,00", popular: false },
    { id: "3months", name: "Trimestral", price: "R$ 135,00", popular: false },
    { id: "6months", name: "Semestral", price: "R$ 270,00", popular: true },
  ]

  const openSocialModal = (platform: string) => {
    setSelectedSocialPlatform(platform)
    setShowSubscriptionAlert(true)
  }

  const handleSubscriptionClick = (planId: string) => {
    window.location.href = externalLinks[planId as keyof typeof externalLinks]
  }

  const scrollToSubscription = () => {
    const firstPlanButton = document.getElementById("plan-1month")
    if (firstPlanButton) {
      firstPlanButton.scrollIntoView({ behavior: "smooth" })
      firstPlanButton.classList.add("ring-4", "ring-orange-300")
      setTimeout(() => {
        firstPlanButton.classList.remove("ring-4", "ring-orange-300")
      }, 2000)
    }
  }

  // Função para calcular estatísticas totais
  const calculateTotalStats = () => {
    return {
      posts: artists.reduce((sum, artist) => sum + artist.stats.posts, 0),
      media: artists.reduce((sum, artist) => sum + artist.stats.media, 0),
      likes:
        artists
          .reduce((sum, artist) => {
            const likesNum = Number.parseInt(artist.stats.likes.replace("K", "000"))
            return sum + likesNum
          }, 0)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "+",
    }
  }

  const totalStats = calculateTotalStats()

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 p-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-orange-400 rounded-full flex items-center justify-center text-white">
            <Lock className="w-5 h-5" />
          </div>
          <span className="ml-2 text-xl font-semibold">privacy</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-10 h-10 flex items-center justify-center text-gray-500">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              1
            </span>
          </div>
          <Button variant="ghost" size="icon">
            <Globe className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <main className="flex-1">
        {/* Coleção de avatares - BANNER COMPLETAMENTE REMOVIDO */}
        <div className="px-4 py-3 bg-gray-50 flex flex-row items-center justify-between border-b border-gray-100">
          <div className="flex items-center">
            {artists.slice(0, 4).map((artist, index) => (
              <div key={artist.id} className="relative">
                <div
                  className={`w-10 h-10 rounded-full border-2 ${index === 1 || index === 2 ? "border-red-500" : "border-white"} overflow-hidden relative -ml-1 first:ml-0`}
                  style={{ zIndex: 5 - index, boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}
                >
                  <img
                    src={artist.image || "/placeholder.svg"}
                    alt={artist.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {(index === 1 || index === 2) && (
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-red-500 text-white text-[8px] px-1 py-0.5 rounded font-bold z-10">
                    AO VIVO
                  </div>
                )}
              </div>
            ))}
            <div
              className="w-10 h-10 rounded-full border-2 border-white bg-orange-400 flex items-center justify-center text-white font-bold -ml-1"
              style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}
            >
              +1
            </div>
          </div>

          {/* Estatísticas */}
          <div className="flex text-xs text-gray-600 items-center">
            <div className="flex items-center mr-3">
              <ImageIcon className="w-3 h-3 mr-1" />
              <span>{totalStats.media}</span>
            </div>
            <div className="flex items-center mr-3">
              <MessageSquare className="w-3 h-3 mr-1" />
              <span>{totalStats.posts}</span>
            </div>
            <div className="flex items-center">
              <Heart className="w-3 h-3 mr-1" />
              <span>{totalStats.likes}</span>
            </div>
          </div>
        </div>

        {/* Informações do perfil coletivo */}
        <div className="p-4 bg-gray-50">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">Privacy Collection</h1>
              <p className="text-gray-600">@privacycollection</p>
            </div>
            <Button variant="ghost" size="icon" className="rounded-full bg-gray-100">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
          <p className="mt-3 text-gray-700">
            Acesso exclusivo ao conteúdo de nossas criadoras! Fotos, vídeos e interações exclusivas com as melhores
            modelos.
            {showFullBio && (
              <>
                <br />
                <br />
                Assine agora e tenha acesso ilimitado a todo o conteúdo de nossas artistas. Atualizações diárias, chats
                exclusivos e muito mais. Nosso catálogo inclui mais de 50 modelos e criadoras de conteúdo, com novidades
                toda semana!
              </>
            )}
          </p>
          <Button variant="ghost" className="px-0 mt-2 text-orange-400" onClick={() => setShowFullBio(!showFullBio)}>
            {showFullBio ? "Mostrar menos" : "Ler mais"}
          </Button>

          {/* Social Links */}
          <div className="flex gap-2 mt-4">
            <Button variant="outline" className="rounded-full" onClick={() => openSocialModal("X")}>
              <span className="mr-2">𝕏</span>X
            </Button>
            <Button variant="outline" className="rounded-full" onClick={() => openSocialModal("TikTok")}>
              <span className="mr-2">♪</span>
              TikTok
            </Button>
            <Button variant="outline" className="rounded-full" onClick={() => openSocialModal("Instagram")}>
              <span className="mr-2">📷</span>
              Instagram
            </Button>
          </div>
        </div>

        {/* Estatísticas de conteúdo */}
        <div className="grid grid-cols-3 border-t border-b border-gray-200 bg-gray-50">
          <div className="p-4 text-center border-r border-gray-200">
            <span className="text-lg font-medium text-orange-400">{totalStats.posts}</span>
            <p className="text-gray-600 text-sm">posts</p>
          </div>
          <div className="p-4 text-center border-r border-gray-200">
            <span className="text-lg font-medium text-orange-400">{totalStats.media}</span>
            <p className="text-gray-600 text-sm">mídias</p>
          </div>
          <div className="p-4 text-center">
            <span className="text-lg font-medium text-orange-400">{artists.length}</span>
            <p className="text-gray-600 text-sm">modelos</p>
          </div>
        </div>

        {/* Seção de assinaturas - ESPAÇAMENTO AJUSTADO */}
        <div className="p-4 bg-gray-50" id="subscription-section">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-medium text-gray-800">Assinaturas</h2>
            <div className="text-sm text-orange-500 font-medium flex items-center">
              <Users className="w-4 h-4 mr-2" />
              Acesso a todas as modelos
            </div>
          </div>

          <div className="bg-orange-50 rounded-lg p-4 mb-5 text-sm text-gray-700 flex items-start">
            <Star className="w-5 h-5 text-orange-400 mr-3 mt-0.5 flex-shrink-0" />
            <p>
              Assine agora e tenha acesso ilimitado ao conteúdo exclusivo de todas as nossas modelos por um único preço!
            </p>
          </div>

          <button
            id="plan-1month"
            className="w-full flex items-center justify-between p-5 bg-orange-400 text-white rounded-xl font-medium transition-all duration-300"
            onClick={() => handleSubscriptionClick("1month")}
          >
            <span className="text-xl font-medium">Mensal</span>
            <span className="text-xl font-medium">R$ 45,00</span>
          </button>

          <div className="mt-5 space-y-3">
            <button
              id="plan-3months"
              className="w-full flex items-center justify-between p-5 bg-orange-400 text-white rounded-xl font-medium transition-all duration-300"
              onClick={() => handleSubscriptionClick("3months")}
            >
              <span className="text-xl font-medium">Trimestral</span>
              <span className="text-xl font-medium">R$ 135,00</span>
            </button>

            {/* CORRIGIDO POSIÇÃO DA TAG POPULAR */}
            <div className="relative pt-4">
              <div className="absolute -top-0 right-4 px-3 py-1 bg-white text-orange-500 text-xs rounded-full font-bold z-10">
                Popular
              </div>
              <button
                id="plan-6months"
                className="w-full flex items-center justify-between p-5 bg-orange-400 text-white rounded-xl font-medium transition-all duration-300"
                onClick={() => handleSubscriptionClick("6months")}
              >
                <span className="text-xl font-medium">Semestral</span>
                <span className="text-xl font-medium">R$ 270,00</span>
              </button>
            </div>
          </div>
        </div>

        {/* Nossas Modelos - ESPAÇAMENTO AJUSTADO */}
        <div className="px-4 pt-4 pb-0 bg-gray-50">
          <h2 className="mb-4 text-xl font-medium text-gray-800">Nossas Modelos</h2>

          <div className="grid grid-cols-1 gap-3">
            {artists.map((artist) => (
              <Card key={artist.id} className="overflow-hidden shadow-sm">
                <CardContent className="p-0">
                  <div className="p-4 flex items-center justify-between border-b">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        {artist.isLive ? (
  <div className="live-ring">
    <Avatar className="w-12 h-12">
      <img src={artist.avatarUrl} alt={artist.name} />
    </Avatar>
    <div className="live-badge">AO VIVO</div>
  </div>
) : (
  <Avatar className="w-12 h-12">
    <img src={artist.avatarUrl} alt={artist.name} />
  </Avatar>
)}
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 text-lg">{artist.name}</p>
                        <p className="text-sm text-gray-500">{artist.username}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-orange-500" onClick={scrollToSubscription}>
                      Ver perfil
                    </Button>
                  </div>

                  {/* Prévia do conteúdo */}
                  <div className="p-4 border-b">
                    <p className="text-sm text-gray-700 mb-4">{artist.bio}</p>

                    {/* Todos os artistas com vídeo de amostra */}
                    <div className="space-y-4">
                      <div className="w-full rounded-lg overflow-hidden bg-gray-800" style={{ maxHeight: "200px" }}>
                        <video
                          className="w-full h-auto object-cover"
                          controls
                          poster={`https://placehold.co/800x450/1f1f1f/333333?text=Prévia+${artist.name.split(" ")[0]}`}
                        >
                          <source src="#" type="video/mp4" />
                          Seu navegador não suporta vídeos HTML5.
                        </video>
                      </div>

                      <div className="grid grid-cols-3 gap-2 mt-3">
                        {[1, 2, 3].map((num) => (
                          <div
                            key={num}
                            className="relative aspect-square bg-gray-900 rounded-md overflow-hidden cursor-pointer"
                            onClick={scrollToSubscription}
                          >
                            <img
                              src={`https://placehold.co/300x300/1f1f1f/333333?text=${num}`}
                              alt={`Conteúdo ${num}`}
                              className="w-full h-full object-cover opacity-60 blur-[2px]"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                              <Lock className="h-5 w-5 text-white" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Estatísticas e botão de desbloquear */}
                  <div className="p-4 flex items-center justify-between text-sm">
                    <div className="flex items-center gap-5">
                      <div className="flex items-center">
                        <ImageIcon className="w-4 h-4 text-gray-500 mr-2" />
                        <span>{artist.stats.media}</span>
                      </div>
                      <div className="flex items-center">
                        <Heart className="w-4 h-4 text-gray-500 mr-2" />
                        <span>{artist.stats.likes}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-orange-500 h-9" onClick={scrollToSubscription}>
                      Desbloquear
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Vídeos em destaque - ESPAÇAMENTO AJUSTADO */}
        <div className="p-4 pt-4 bg-gray-50">
          <h2 className="mb-5 text-xl font-medium text-gray-800">Vídeos em Destaque</h2>
          <div className="grid grid-cols-2 gap-3">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="relative aspect-video bg-gray-900 rounded-md overflow-hidden cursor-pointer"
                onClick={scrollToSubscription}
              >
                <img
                  src={`https://placehold.co/600x400/1f1f1f/333333?text=Destaque+${i + 1}`}
                  alt={`Vídeo ${i + 1}`}
                  className="w-full h-full object-cover opacity-60 blur-[2px]"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <Lock className="h-10 w-10 text-white" />
                </div>
                <div
                  className="absolute bottom-0 left-0 right-0 p-3"
                  style={{ background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)" }}
                >
                  <div className="flex items-center justify-between text-xs text-white">
                    <span className="bg-black/50 px-2 py-1 rounded-md">
                      {i === 0 ? "3:45" : i === 1 ? "2:30" : i === 2 ? "4:15" : "1:58"}
                    </span>
                    <div className="flex items-center bg-black/50 px-2 py-1 rounded-md">
                      <Eye className="h-3 w-3 mr-1" />
                      <span>{i === 0 ? "842" : i === 1 ? "1.2K" : i === 2 ? "756" : "968"}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Miniaturas adicionais com layout fixo */}
          <div className="grid grid-cols-3 gap-2 mt-3">
            {[...Array(6)].map((_, i) => {
              const isVideo = i % 2 === 0
              return (
                <div
                  key={i + 4}
                  className="relative aspect-square bg-gray-900 rounded-md overflow-hidden cursor-pointer"
                  onClick={scrollToSubscription}
                >
                  <img
                    src={`https://placehold.co/300x300/${isVideo ? "1f1f1f" : "1f1f1f"}/333333?text=${isVideo ? "Video" : "Foto"}`}
                    alt={isVideo ? `Vídeo ${i + 1}` : `Foto ${i + 1}`}
                    className="w-full h-full object-cover opacity-70 blur-[2px]"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <Lock className="h-6 w-6 text-white" />
                  </div>
                  {isVideo && (
                    <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                      {i === 0 ? "1:45" : i === 2 ? "2:18" : "1:32"}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <Button variant="outline" className="w-full mt-4 py-2" onClick={scrollToSubscription}>
            Ver Todos os Vídeos
          </Button>
        </div>
      </main>

      {/* Footer Actions */}
      <div className="sticky bottom-0 flex items-center justify-between p-4 bg-gray-50 border-t border-gray-200">
        <Button variant="ghost" size="icon">
          <Heart className="h-6 w-6" />
        </Button>
        <Button variant="ghost" size="icon">
          <MessageSquare className="h-6 w-6" />
        </Button>
        <Button variant="ghost" size="icon">
          <Send className="h-6 w-6" />
        </Button>
      </div>

      {/* Subscription Alert Modal */}
      {showSubscriptionAlert && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-[90%] max-w-md p-6">
            <div className="text-center mb-4">
              <div className="mx-auto w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <Lock className="h-7 w-7 text-orange-500" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Assine para Continuar</h2>
              <p className="text-gray-600">
                Escolha e assine um plano antes de acessar o conteúdo do {selectedSocialPlatform}.
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="w-full py-2.5" onClick={() => setShowSubscriptionAlert(false)}>
                Cancelar
              </Button>
              <Button
                className="w-full py-2.5"
                onClick={() => {
                  setShowSubscriptionAlert(false)
                  scrollToSubscription()
                }}
              >
                Ver Planos
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
