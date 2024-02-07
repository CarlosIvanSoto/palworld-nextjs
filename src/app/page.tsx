import FilterButton from "@/components/FilterButton"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type Suitability = {
  type: string
  image: string
  level: number
}
type Type = 'dark' | 'dragon' | 'electric' | 'fire' | 'grass' | 'ground' | 'ice' | 'neutral' | 'water'
type PalContent = {
  id: number
  key: string
  image: string
  name: string
  wiki: string
  types: Type[]
  imageWiki: string
  suitability: Suitability[]
  drops: any[]
  aura: any
  description: string
  skills: any[]
}

type PalResponse = {
  content: PalContent[]
  page: number
  limit: number
  count: number
  total: number
}
type SearchParams = { [key: string]: string | string[] | undefined }
function parseQuery(query: SearchParams): string {
  if (query) return '?' + Object.entries(query).map(([key, value]) => `${key}=${value}`).join('&')
  return query
}
async function getAllPals(searchParams: SearchParams): Promise<PalResponse> {
  const res = await fetch(`http://localhost:4000${parseQuery(searchParams)}`)
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}

export default async function Page({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  // console.log(searchParams)
  const { content } = await getAllPals(searchParams)
  const elements = [
    {
      name: "dark",
      image: "/public/images/elements/dark.png"
    },
    {
      name: "dragon",
      image: "/public/images/elements/dragon.png"
    },
    {
      name: "electric",
      image: "/public/images/elements/electric.png"
    },
    {
      name: "fire",
      image: "/public/images/elements/fire.png"
    },
    {
      name: "grass",
      image: "/public/images/elements/grass.png"
    },
    {
      name: "ground",
      image: "/public/images/elements/ground.png"
    },
    {
      name: "ice",
      image: "/public/images/elements/ice.png"
    },
    {
      name: "neutral",
      image: "/public/images/elements/neutral.png"
    },
    {
      name: "water",
      image: "/public/images/elements/water.png"
    },
  ]
  return (
    <main className="max-w-screen-lg mx-auto mt-8 flex gap-4">
      <section className="grid grid-cols-4 gap-2 h-fit">
        {elements.map(FilterButton)}
      </section>
      <section className="grid grid-cols-4 gap-4">
        {content.map(p =>
          <Card key={p.key} className="box-border border-gray-400 hover:border-cyan-400 border-2">
            {/* <CardHeader>
              <CardTitle className="text-center">{p.name}</CardTitle>
            </CardHeader> */}

            <CardContent className="flex justify-between mt-6">
              <div className="space-y-2">
                {p.types.map(t => 
                  <Avatar key={p.key+t} className='h-7 w-7'>
                    <AvatarImage src={`http://localhost:4000/public/images/elements/${t}.png`} />
                    <AvatarFallback>{t}</AvatarFallback>
                  </Avatar>
                )}
              </div>
              <div className="space-y-4">
                <CardTitle className="text-center">{p.name}</CardTitle>
                <Avatar className="h-16 w-16 mx-auto">
                  <AvatarImage src={'http://localhost:4000'+p.image} />
                  <AvatarFallback>{p.key}</AvatarFallback>
                </Avatar>
              </div>
              <div>
                {p.suitability.map(s => 
                  <div key={p.key+s.type} className='flex gap-1 text-sm'>
                    <Avatar className='h-5 w-5'>
                      <AvatarImage src={'http://localhost:4000'+s.image} />
                      <AvatarFallback>{s.type}</AvatarFallback>
                    </Avatar>
                    {s.level}
                  </div>
                )}
              </div>

            </CardContent>
          </Card>  
        )}
      </section>
    </main>
  );
}
