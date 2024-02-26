import {} from 'react'
import { Window, MessageList, MessageInput } from 'stream-chat-react'
import Card from '../../../components/Common/Card'
import './chat.css';

function ChatRoom() {
  return (
    <Card className='w-full shadow-lg'>
      <Window>
        <MessageList 
          disableDateSeparator
          closeReactionSelectorOnClick
          hideDeletedMessages
          messageActions={[ 'react' ]}
          />
        <MessageInput 
          noFiles          
          />
      </Window>
    </Card>
  )
}

export default ChatRoom