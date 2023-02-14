import { NextPage } from "next"
import React from "react"
import List from "../components/List"
import fetcher from "../fetcher"
import { Content, User } from "../type"

const Home:NextPage = (
  {serverContent, serverUser}:{serverContent:Content[], serverUser:User[]}) => {
  return(
  <div>
    <List serverContent={serverContent} serverUser={serverUser}/>
  </div>
  )
}

// SSR
export const getServerSideProps = async() => {
  const serverContent = await fetcher('get', '/contents')
  const serverUser = await fetcher('get', '/user')
  
  return {
    props: {serverContent, serverUser}
  }
}

export default Home