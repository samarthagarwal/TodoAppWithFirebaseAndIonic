import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user: any = {
    email: "s@a.com",
    password: "121212"
  }

  constructor(private router: Router, private toastCtrl: ToastController) { }

  gotoSignup() {
    this.router.navigate(["/signup"]);
  }

  async login() {

    try {

      let userCredential: firebase.auth.UserCredential = await firebase.auth().signInWithEmailAndPassword(this.user.email, this.user.password);

      console.log(userCredential);

      this.router.navigate(["/home"]);

    } catch (ex) {
      let toast = await this.toastCtrl.create({
        message: ex.message,
        duration: 3000
      });
      toast.present();
    }

  }

  ngOnInit() {
  }

}
