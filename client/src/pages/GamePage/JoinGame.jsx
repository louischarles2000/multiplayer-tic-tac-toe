import { useContext, useState } from 'react'
import Input from '../../components/Common/Input'
import MainButton from '../../components/Common/MainButton';
import { useChatContext } from 'stream-chat-react'
import { GameContext } from '../../Contexts/GameContext';
import Card from '../../components/Common/Card';

function JoinGame() {
  const { setChannel } = useContext(GameContext);
  const [ rivalUsername, setRivalUsername ] = useState('');
  const { client } = useChatContext();

  const createChannel = async () => {
    const res = await client.queryUsers({ name: { $eq: rivalUsername } });
    if(res.users.length === 0){
      alert('User not found!')
      return
    }

    const newChannel = await client.channel('messaging', {
      members: [client.userID, res.users[0].id]
    });

    await newChannel.watch();
    setChannel(newChannel);
    // newChannel
  }

  return (
    <Card>
      <h4>Create Game</h4>
      <Input
        value={rivalUsername}
        placeholder="Username of rival"
        onChange={e => setRivalUsername(e.target.value)}
        />
      <MainButton
        onClick={createChannel}
        >
        Join/Start Game
      </MainButton>
    </Card>
  )
}

export default JoinGame