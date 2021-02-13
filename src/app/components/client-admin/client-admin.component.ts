import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import firebase from 'firebase/app';
import { Title } from "@angular/platform-browser";
const timeOut = time => new Promise((resolve, reject) => setTimeout(resolve, time))

@Component({
  selector: 'app-client-admin',
  templateUrl: './client-admin.component.html',
  styleUrls: ['./client-admin.component.scss']
})

export class ClientAdminComponent implements OnInit {
  @Input('publicView') publicView;
  clients: any
  client: any = {}
  loggedUser: any
  task: AngularFireUploadTask
  pictureOpened: boolean
  uploading: boolean
  
  constructor(
    private ts: Title,
    private cs: ClientService,
    private route: ActivatedRoute,
    private auth: AngularFireAuth,
    private storage: AngularFireStorage,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.initComponent()
  }

  async upload(event) {
    const file = event.target.files[0]
    this.uploading = true;
    this.task = this.storage.upload(`/dogPictures/${ this.client.id }`, file);
    (await this.task).ref.getDownloadURL().then(url => {
      this.client.picture = url;
      this.uploading = false
      this.save()
    });
  }

  setIMage() {
    const el: any = document.querySelector('.picture input')
    el.click()
  }

  async initComponent(){
    await timeOut(1000)
    const clientName = this.route.snapshot.paramMap.get('client');
    this.cs.getClient(clientName).subscribe(clients => {
      this.auth.onAuthStateChanged((user: any) => {
        this.client = clients[0];
        if ( !this.client ) { return this.router.navigate([ 'd/home' ]) }
        if ( !this.client.extraData || !this.client.extraData.length ) { this.client.extraData = [] }
        this.ts.setTitle(`${ this.client.nameId ? `@${ this.client.nameId } - ` : '' }Mi amispet ❤️`);
        this.loggedUser = user
        console.log(clients, user)
        if ( !this.loggedUser ) { return; }
        if ( this.client && this.client.email !== this.loggedUser.email ) {
          this.logout()
          return this.router.navigate([ 'd/home' ])
        }
      })
    });
  }

  async login() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  addDogInfo(){
    this.client.extraData.push({ title: '', description: '' })
  }

  removeDogInfo(index){
    this.client.extraData = this.client.extraData.filter((e, i) => i !== index)
  }

  removeAt(instagram){
    return instagram.replace('@', '')
  }

  async logout() {
    this.auth.signOut()
  }

  save(){
    this.cs.updateClient({
      id: this.client.id,
      data: this.client
    })
  } 
  

}
