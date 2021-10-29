import { Middleware } from '@nuxt/types'
import firebase from 'firebase/app'

const hasUser: Middleware = ({ redirect }) => {
  if (firebase.auth().currentUser?.uid) {
    console.log('has User')
    return redirect('/?message=hasUser')
  }
}

export default hasUser