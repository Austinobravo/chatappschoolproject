import ItemsList from '@/components/itemsList'
import React from 'react'
import ConversationCard from './ConversationCard'

const ConversationList = () => {
  return (
    <ItemsList title='Groups'>
            <p className='text-center text-black'>Conversations</p>
            <ConversationCard/>
    </ItemsList>
  )
}

export default ConversationList