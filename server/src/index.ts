import express from 'express'
import cors from 'cors'
import contentRoute from './routes/content'
import { CustomRoute } from './types'
import userRoute from './routes/user'

const app = express()
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors({
  origin:'http://localhost:3000',
  credentials:true,
}))

const routes:CustomRoute[]  = [...contentRoute, ...userRoute]

routes.forEach(({method,route, handler})=> {
  app[method](route, handler)
})

app.listen(8000, ()=>{
  console.log('server running')
})