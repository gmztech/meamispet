import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(
    private db: AngularFirestore
  ) {
  }

  getClients() {
    return this.db.collection('clients').snapshotChanges()
  }

  getClient(clientName) {
    return this.db.collection('clients', ref => ref.where('nameId', '==', clientName)
      .limit(1))
      .snapshotChanges()
      .pipe(map(actions => {
        return actions.map(a => {
          const data: any = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      }))
  }

  updateClient({ id, data }) {
    return this.db.collection('clients').doc(id).update(data)
  }


}
