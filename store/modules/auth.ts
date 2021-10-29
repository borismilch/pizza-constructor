import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import firebase from '~/plugins/firebase'
import 'firebase/firestore';
import { User, U, Uid } from '../../types/types'

@Module({
  name: 'Auth',
  stateFactory: true,
  namespaced: true,
})

class Auth extends  VuexModule {
  currentUser: User = null
  users: User[] = []

  @Mutation
  setUser(user: U) {
    this.currentUser = user
  }

  @Mutation
  setUsers(users: User[]) {
    this.users = users
  }

  @Action({rawError: true, commit: 'setUser'})
  async register (user: U) {
    await firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
    const uid: Uid = firebase.auth().currentUser?.uid || null;
    await firebase.firestore().doc(`users/${uid}`).set(user)
    return { ...user, id: uid }
  }

  @Action({rawError: true, commit: 'setUser'})
  async logIn (user: U) {
    await firebase.auth().signInWithEmailAndPassword(user.email, user.password)
    const uid: Uid = firebase.auth().currentUser?.uid || null;
    let u: any =  (await firebase.firestore().doc(`users/${uid}`).get()).data()
    return { ...u, id: uid }
  }

  @Action({rawError: true, commit: 'setUser'})
  async logOut () {
    await firebase.auth().signOut()
    return null
  }

  @Action({rawError: true, commit: 'setUser'})
  async changeUserProfile ([img, name]: string[]) {
    const uid = firebase.auth().currentUser?.uid
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(`${uid}`)
    await fileRef.putString(img, "data_url")
    const url = await fileRef.getDownloadURL()
    const update = { ...this.currentUser, img: url, name }

    await firebase.firestore().collection('users').doc(`${uid}`).update({...update})
    
    return { ...update }
  }

  get user() {
    return this.currentUser
  }
}


export default Auth
