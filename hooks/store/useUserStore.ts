import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface UserState {
  user: UserType | undefined
  messages: UpdatedConversationType | undefined
  conversations: any | undefined
  setUser: (value: UserType) => void
  setConversation: (value: any) => void
  setMessages: (value: UpdatedConversationType) => void

}

export const useUserStore = create(persist<UserState>((set) => ({
  user: undefined,
  messages: undefined,
  conversations: undefined,
  setUser(loggedInUser: UserType){
    set({user:loggedInUser})
  },
  setConversation(convo: any){
    set({conversations:convo})
  },
  setMessages(message: UpdatedConversationType){
    set({messages:message})
  },

  
}),
{
  name: "user",
  storage: createJSONStorage(()=> localStorage),
}
))