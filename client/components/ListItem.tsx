import react from 'react'
import { ListItem } from '../type'
import Input from './Input'

const ListItem:React.FC<ListItem> = ({name,timestamp, id, text, isEdit, owner, serverUser, onUpdate, updating,onDelete}) => {
  console.log(serverUser)
  return(
    <li className='list_item'>
      {serverUser.username}
      <time dateTime={timestamp+ ''}>
        {new Date(timestamp).toLocaleString('ko-KR',{
          year:'numeric',
          month:'numeric',
          day:'numeric',
          hour:'2-digit',
          minute:'2-digit',
          hour12:true
        })}
      </time>
      {isEdit ?
      <>
        <Input type={onUpdate} id={id} text={text}/>
      </>
      : 
      <p>
        {text}
      </p>
      }
      {owner === name &&
      <>
        <button onClick={updating}>
          수정
        </button>
        <button onClick={onDelete}>
          삭제
        </button>
      </>}
    </li>
  )
}

export default ListItem
