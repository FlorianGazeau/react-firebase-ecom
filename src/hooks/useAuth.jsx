import { useEffect } from 'react'
import { useSelector} from 'react-redux'

const mapSate = ({user}) => ({
  currentUser: user.currentUser
})

const useAuth = props => {
  const { currentUser } = useSelector(mapSate)

  useEffect(() => {
    if (!currentUser) {
      props.history.push('/account/login')
    }
  }, [currentUser])

  return currentUser
}

export default useAuth