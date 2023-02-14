export interface Content {
  id: string
  name: string
  timestamp: number
  text: string
}

export interface User {
  id:string;
  username:string;
}

export interface ListItem {
  name:string
  timestamp:number
  id:string
  text:string
  isEdit:boolean
  onUpdate: (text:string, id?:string)=> void
  updating: ()=> void
  onDelete: ()=> void
  owner:string 
  serverUser:User
}