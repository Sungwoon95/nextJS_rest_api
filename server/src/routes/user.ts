import { readDB } from "../dbController";
import { CustomRoute, DBField, Method } from "../types";

const getUser = () => readDB(DBField.USER)

const userRoute:CustomRoute[] = [
  {
    method:Method.GET,
    route:'/user',
    handler:(req,res)=>{
      const user = getUser()
      res.send(user)
    }
  },{
    method:Method.GET,
    route:'/user/:id',
    handler:({params:{id}},res)=>{
      try {
        const user = getUser()
        const target = user[id]
        if(!target) throw Error('사용자가 존재하지 않습니다.')
        res.send(target)
      } catch (error) {
        res.status(500).send({error})
      }
    }
  }
]

export default userRoute