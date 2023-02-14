import { useCallback, useEffect, useRef, useState } from "react"

const useInfiniteScroll = (target) => {
  const observerRef = useRef(null)
  const [intersecting, setIntersecting] = useState(false)
  
  // const observer = new IntersectionObserver(entries => setIntersecting(
  //   entries.some(entry => entry.isIntersecting)
  // ))

  const getObserver = useCallback(()=> {
    if(!observerRef.current){
      observerRef.current = new IntersectionObserver(entries => setIntersecting(
        entries.some(entry => entry.isIntersecting)
      ))
    }
    return observerRef.current
  },[observerRef.current]) 

  useEffect(()=>{
    if(target.current) getObserver().observe(target.current)

    return () => {
      getObserver().disconnect()
    }
  },[target.current])

  return intersecting
}

export default useInfiniteScroll