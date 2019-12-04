import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular'
import * as firebase from 'firebase/app';
import 'firebase/auth';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  user: any = {
    email: "",
    password: ""
  }

  constructor(private router: Router, private navCtrl: NavController, private toastCtrl: ToastController) { }

  gotoLogin() {
    // this.router.navigate(["/login"]);
    this.navCtrl.navigateBack('/login');
  }

  async signup() {


    try {
    let userCredential: firebase.auth.UserCredential = await firebase.auth().createUserWithEmailAndPassword(this.user.email, this.user.password);

    console.log(userCredential);

    this.router.navigate(["/home"]);

    } catch(ex) {
      let toast = await this.toastCtrl.create({
        message: ex.message,
        duration:3000
      });
      toast.present();
    }

  }

  ngOnInit() {
  }

}
