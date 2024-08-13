"use client"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
import { useUserStore } from '@/hooks/store/useUserStore'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'
import { toast } from 'sonner'

const ConversationCard = () => {
  // const {user, conversations, setConversation} = useUserStore()
  const {data:session} = useSession()
  const userId = session?.user?.id
  const [conversations, setConversation] = React.useState<any[] | undefined>(undefined)

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/conversations/`, {
        method: 'GET'
      })
      if(response.ok){
        const data = await response.json()
        setConversation(data)
      }
      else{
            toast.error(response.statusText)
            return
          }

    
    }
    fetchData()
  },[userId, conversations])
  return (
    <>
    {conversations === undefined ?
    [1,2,3,4].map((_, index)=> (
      <div key={index} className='flex justify-center items-center w-full'>
          <Card className='flex justify-between gap-2 items-center bg-primary/5 p-2 my-2 w-full'>
                <div className='flex items-center gap-1 animate-pulse'>
                    <Avatar>
                    <AvatarImage/>
                    <AvatarFallback className='bg-primary text-white'></AvatarFallback>
                    </Avatar>
                    <div className='text-black dark:text-white'>
                    <h3 className='truncate text-sm animate-pulse'></h3>
                    <p className='text-xs text-wrap break-all line-clamp-1  text-black dark:text-white/90 opacity-40 animate-pulse'></p>
                    </div>
                </div>
                <div>
                  <p className='text-xs font-bold shadow-0 animate-pulse '></p>
                </div>
            </Card>
      </div>
    ))
      :
      conversations?.length > 0 ?
        conversations.map((conversation:any, index:number) => (
          <Card key={index} className='flex justify-between gap-2 items-center bg-primary/5 p-2 my-2'>
              <Link href={`/conversations/${conversation.id}`} className='flex items-center gap-1 w-full'>
                  <Avatar>
                  <AvatarImage/>
                  <AvatarFallback className='bg-primary text-white'>{conversation.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className='text-black dark:text-white'>
                  <h3 className='truncate text-sm'>{conversation.name}</h3>
                  <p className='text-xs text-wrap break-all line-clamp-1 text-black dark:text-white/90 opacity-40'>{conversation.lastMessage ? conversation.lastMessage : "Start a conversation"}</p>
                  </div>
              </Link>

          </Card>

        ))

      :
      <p>No Conversations</p>
    }
    </>
  )
}

export default ConversationCard