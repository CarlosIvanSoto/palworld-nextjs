'use client'
import React from 'react'
import { Button } from './ui/button'
import { Avatar } from '@radix-ui/react-avatar'
import { AvatarFallback, AvatarImage } from './ui/avatar'
import { useRouter } from 'next/navigation'

type Element = {
  name: string
  image: string
}

const FilterButton = (e: Element) => {
  const router = useRouter()
  return (
    <Button key={e.name} variant="outline" size="icon">
      <Avatar className='h-7 w-7'>
        <AvatarImage src={'http://localhost:4000'+e.image} />
        <AvatarFallback>{e.name}</AvatarFallback>
      </Avatar>
    </Button>
  )
}

export default FilterButton