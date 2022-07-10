import axios from '../api/axios'
import useAuth from './useAuth'

const useRefreshToken = () => {
  const { auth, setAuth } = useAuth()

  const refresh = async () => {
    var response
    try {
      response = await axios.get('/refresh', {
        withCredentials: true,
      })
    } catch (err) {
      console.log(err)
    } finally {
      setAuth((prev) => {
        // console.log(JSON.stringify(prev))
        return {
          accessToken: response.data.accessToken,
          email: response.data.email,
          isAuth: response.data.isAuth,
        }
      })
      return response.data.accessToken
    }
  }
  return refresh
}

export default useRefreshToken
