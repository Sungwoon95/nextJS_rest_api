import { readDB, writeDB } from "../dbController"
import { DBField, CustomRoute, Content, Method } from "../types"
import { v4 } from 'uuid'

const getContent = () => readDB(DBField.CONTENT)
const setContent = (data:string) => writeDB(DBField.CONTENT, data)

const contentRoute:CustomRoute[] = [
  { // Get
    method:Method.GET,
    route: '/contents',
    handler: ({query:{cursor=''}}, res)=> {
      const content = getContent()
      const fromIndex = content.findIndex((i:{id:string})=> i.id === cursor) + 1

      res.send(content.slice(fromIndex, fromIndex+15))
    }
  },
  {
    method:Method.GET,
    route: '/contents/:id',
    handler: ({params:{id}}, res)=> {
      try {
        const content = getContent()
        const target = content.find((i:{id:string}) => i.id === id)
        if(!target) throw Error('not found')
        res.send(target)
      } catch (error) {
        res.status(404).send({error:error})
      }
    }
  }
  ,
  { // Create
    method:Method.POST,
    route: '/contents',
    handler: ({body}, res)=> {
      try {
        if(!body.name) return
        
        const content = getContent()
        const newContent = {
          id:v4(),
          text: body.text,
          name: body.name,
          timestamp: Date.now()
        }
        content.unshift(newContent)
        setContent(content)
        res.send(newContent)
      } catch (error) {
        
      }
    }
  },
  { // Upadte
    method:Method.PUT,
    route: '/contents/:id',
    handler: ({body, params:{id}}, res)=> {
      try {
        const content = getContent()
        const target = content.findIndex((i:{id:string}) => i.id === id)
        if(target < 0 ) throw '콘텐츠가 존재하지 않습니다.'
        if(content[target].userId !== body.userId) throw '사용자가 일치하지 않습니다.'

        const newContent = {...content[target], text:body.text}
        content.splice(target, 1, newContent)
        setContent(content)
        res.send(newContent)
      } catch (error) {
        res.status(500).send({err:error})
      }
    }
  },
  { // Delete
    method:Method.DELETE,
    route: '/contents/:id',
    handler: (req, res)=> {
      console.log(req)
      const {query:{name}, params:{id}} = req
      try {
        const content = getContent()
        const target = content.findIndex((i:{id:string}) => i.id === id)
        if(target < 0 ) throw '콘텐츠가 존재하지 않습니다.'
        if(content[target].name !== name) throw '사용자가 일치하지 않습니다.'

        content.splice(target, 1)
        setContent(content)
        res.send(id)
      } catch (error) {
        res.status(500).send({err:error})
      }
    }
  }
]

export default contentRoute