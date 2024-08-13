"use client"
import React from 'react'
import ConversationHeader from '../../_components/ConversationHeader'
import ConversationBody from '../../_components/ConversationBody'
import ConversationInput from '../../_components/ConversationInput'
import ConversationList from '../../_components/ConversationList'
import { toast } from 'sonner'
import { useUserStore } from '@/hooks/store/useUserStore'
import { Loader2 } from 'lucide-react'
import Image from 'next/image'

const ConversationPage = ({params}: {params:{conversationId: string}}) => {
  const conversationId = params.conversationId
 const {messages, setMessages} = useUserStore()
  React.useEffect(() => {
    const fetchData = async () => {
        await fetch(`/api/conversations/${conversationId}`)
        .then((response) => {
          if(!response.ok){
            toast.error(response.statusText)
            return
          }
          return response.json()
        })
        .then((data) => {
          console.log("gottendata", data)
          setMessages(data)
        })
        .catch((error) => {
          toast.error(error)
        })
    }
    fetchData()
  }, [])
  return (
    <>
    <ConversationList />
    {messages === undefined ?
    <div className='flex justify-center items-center h-screen'>
      <Image src='/logo.jpg' width={100} height={100} alt='Loading...' className='w-20 h-20 animate-pulse flex justify-center items-center'/>
    </div>
    :
    Object.entries(messages).length > 0 ?
    <section className='flex flex-col w-full h-full'>
      <ConversationHeader conversation={messages}/>
      <ConversationBody messages={messages}/>
      <ConversationInput/>
    </section>
  :
  <p>No conversation</p>
  }
    </>
  )
}

export default ConversationPage