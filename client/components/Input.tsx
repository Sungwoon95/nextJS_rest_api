import react, { FormEvent, useRef } from 'react'

const Input = ({type,id=undefined, text=''})=> {
  const textRef = useRef(null)

  const onSubmit = (e:FormEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const text = textRef.current.value
    textRef.current.value = ''
    type(text, id)
  }
  return (
    <form onSubmit={onSubmit}>
      <textarea ref={textRef} defaultValue={text}
      placeholder='내용을 입력해 주세요.'/>
      <button type='submit'>입력</button>
    </form>
  )
}

export default Input