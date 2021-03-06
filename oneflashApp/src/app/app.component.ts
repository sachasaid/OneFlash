import { Component, OnInit } from '@angular/core';
import firebase from "firebase";
import {Router} from "@angular/router"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title="OneFlashApp";
  provider:any;
  user:any;

  constructor(private router: Router){

  }
  ngOnInit(): void {
    var provider = new firebase.auth.GoogleAuthProvider();
    this.provider = provider;
    firebase.auth().onAuthStateChanged(user=> {
      this.user = user;
    });

  }

  logout(){
    firebase.auth().signOut().then(function() {
     console.log("sign out");
     
    }).catch(function(error) {
      console.log(error)
    });
  }
 
 
  loginWithGmail() {
    let route:any
    this.router = route
    firebase.auth().signInWithPopup(this.provider).then(function(result) {
     var user = result.user;
     console.log(user);
     route.navigate(['/home'])
    }).catch(function(error) {
     
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
    });
  }  
}