import express from 'express'
import { ApolloServer } from '@apollo/server';
const { expressMiddleware } = require("@apollo/server/express4"); // Use express4 middleware explicitly


async function init()
{
  const app = express();
const port = 8001;
app.use(express.json());
// Schema as a string
const gqlServer = new ApolloServer({
  typeDefs:`

  type Query{

  hello:String
  say(name:String):String

  }


  `,  
  resolvers:{
    Query:{
      hello:()=>`Hey there , I am a graphql server`,
      say: (_, { name }: { name: string }) => `Hey ${name} How are you ?`
    },
    
  }  // actul function that will be executed
})

// start the gql server

await gqlServer.start();

app.get("/", (req,res)=>
{
  res.json({messsage:"server is up and running on 8000"})
})

app.use('/graphql',expressMiddleware(gqlServer));


app.listen(port,()=>console.log("server running "));
}

init();