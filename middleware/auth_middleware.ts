import { Middleware } from '@nuxt/types'
import firebase from 'firebase/app'

const noUser: Middleware = ({ redirect }) => {
  if (!firebase.auth().currentUser?.uid) {
    return redirect('/signin?message=noUser')
  }
}

export default noUser