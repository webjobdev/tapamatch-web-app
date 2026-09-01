import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class WsChatService {

  userDbPath = '/users';
  usersRef: any;

  constructor(private db: AngularFirestore) {


  }

  /**
   * getAll used to get all docs of chatId
   * @returns 
   */
  async getAll() {
    const dbb = firebase.firestore()
    return await dbb.collection(this.userDbPath).doc('122').collection('chat_ids').get().then((docSnapShot: any) => {
      console.log((docSnapShot.docs));
      return docSnapShot.docs;
    },
      (err) => {
        console.log(err);
      });
  }
  /**
   * create used to create new record
   * @param tutorial 
   * @returns 
   */
  create(tutorial: any): any {
    return this.usersRef.add({ ...tutorial });
  }
  /**
   * update used to update current record
   * @param id 
   * @param data 
   * @returns 
   */
  update(id: string, data: any): Promise<void> {
    return this.usersRef.doc(id).update(data);
  }
  /**
   * delete used to delete record
   * @param id 
   * @returns 
   */
  delete(id: string): Promise<void> {
    return this.usersRef.doc(id).delete();
  }
}
