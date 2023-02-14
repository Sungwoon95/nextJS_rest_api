import React, { useEffect, useRef, useState } from 'react'
import Input from './Input'
import ListItem from './ListItem'
import fetcher from '../fetcher'
import { useRouter } from 'next/router'
import useInfiniteScroll from '../hooks/useInfiniteScroll'
import { Content, User } from '../type'
const user = ['sung','lee']

// const randomUser = () => user[ Math.round(Math.random())]
// const contents = Array(30).fill('').map((_,idx)=>({
//   id: idx + 1 + '',
//   name: 'lee',
//   timestamp: Date.now() + (idx * 1000 * 60),
//   text: `${idx+1}번 째 게시물`
// }))

const List = (
  {serverContent, serverUser}:{serverContent:Content[], serverUser:User[]}) => {
  const {query:{name = ''}} = useRouter()
  const [content, setContent] = useState(serverContent)
  const [editId, setEditId] = useState(null)
  const [isNext, setIsNext] = useState(true)
  const infiniteScroll = useRef(null)
  const intersecting = useInfiniteScroll(infiniteScroll)

  const onCreate = async (text:string) =>{
    const newContent:Content = await fetcher('post', '/contents', {text, name})
    if (!newContent) return
    // const newContent = {
    //   id:contents.length + 1+ '',
    //   name: 'lee',
    //   timestamp: Date.now(),
    //   text: text
    // }
    setContent([newContent, ...content])
    console.log(newContent)
  }

  const onUpdate = async(text:string, id:string) => {
    const newText:Content = await fetcher('put', `/contents/${id}`,{text,name})
    if (!newText) return
    
    setContent(content => {
      const target = content.findIndex(item => item.id === id)
      if(target < 0) return content
      const newContent = [...content]
      newContent.splice(target, 1, newText
        )
      return newContent
    })
    setEditId(null)
  }

  const onDelete = async (id:string) => {
    const targetUser = await fetcher('delete',`/contents/${id}`,{params: {name}})
    setContent(content => {
      const target = content.findIndex(item => item.id === targetUser)
      if(target < 0) return content
      const newContent = [...content]
      newContent.splice(target, 1)
      return newContent
    })
  }
  
  const getContent = async () => {
    const newContent = await fetcher('get', '/contents', {params:{cursor: content[content.length -1]?.id || ''}})
    if(newContent.length === 0) setIsNext(false)
    setContent(contents=> [...contents, ...newContent])
  }

  useEffect(()=>{
    if (intersecting && isNext) getContent()
  },[intersecting])

  console.log('rend')
  return (
    <>
      {name && <Input type={onCreate}/>}
      <ul>
        {content.map((i)=>(
          <ListItem key={i.id} 
          onUpdate={onUpdate}
          updating={()=> setEditId(i.id)}
          onDelete={()=> onDelete(i.id)}
          isEdit={editId === i.id}
          owner={name+''}
          serverUser={serverUser[i.name]}
          {...i}/>
        ))}
      </ul>
      <div ref = {infiniteScroll}/>
    </>
  )
}

export default List