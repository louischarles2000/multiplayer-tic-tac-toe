import express from 'express'
import cors from 'cors'
import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'
import { StreamChat } from 'stream-chat'

const app = express()
const apiKey = "zvxx38u6rszp"
const secret = "a6sjfqkkfku8shjwcdsja9fcdbnymam2yatzqjhau542a4s9j7cj5tahyz2j725b"
const serverClient = StreamChat.getInstance(apiKey, secret);

app.use(cors());
app.use(express.json());

app.post('/signup', async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      username,
      password
    } = req.body;

    const { users } = await serverClient.queryUsers({ name: username });
    if(users.length > 0) {
      res.json({ message: "User already exists!" });
      return
    }
    const userId = uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10);
    const token = serverClient.createToken(userId);
    res.json({ token, userId, firstName, lastName, username, hashedPassword });
  } catch (error) {
    res.json(error)
  }
});

app.post('/login', async (req, res) => {
  console.log("LOGIN");
 try {
  const { username, password } = req.body;
  // Check if user exists
  const { users } = await serverClient.queryUsers({ name: username });

  if(users.length === 0) {
    res.json({ message: "User not found" }).status(402);
    console.log("User not found")
    return
  }
  console.log(users[0])
  // Match passwords
  const passwordMatch = await bcrypt.compare(password, users[0].hashedPassword);
  if(!passwordMatch)  {
    res.json({ message: "Wrong password!" }).status(402);
    console.log("Wrong password!")
    return
  }
  const token = await serverClient.createToken(users[0].id);
  res.json({
    token,
    userId: users[0].id,
    firstName: users[0].firstName,
    lastName: users[0].lastName,
    username,
    test: 'LOUISFBBJ'
    // hashedPassword: users[0].hashedPassword,
  })
 } catch (error) {
  console.log({...error})
  res.json(error);
 }
})

app.listen(3000, () => {
  console.log('Server running on port 3000...');
})