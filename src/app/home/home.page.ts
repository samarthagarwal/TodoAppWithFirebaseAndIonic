import { Component } from '@angular/core';
import { NavController, AlertController, ToastController } from '@ionic/angular';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  userId: string;
  todos: any[] = [];

  constructor(private navCtrl: NavController, private alertCtrl: AlertController, private toastCtrl: ToastController) {
  }

  ionViewDidEnter() {
    try {
      this.userId = firebase.auth().currentUser.uid;
      console.log(this.userId);

      this.getUserTodos();

    } catch (ex) {
      this.navCtrl.navigateRoot("/login");
    }
  }

  async getUserTodos() {


    let results: firebase.firestore.QuerySnapshot = await firebase.firestore().collection("todos")
    .where("todo_owner", "==", this.userId)
    .orderBy("todo_date", "desc")
    .get();

    this.todos = results.docs;


  }

  getEnabledStatus(todo) {

    if(todo.enabled == undefined) {
      return true;
    } else if(todo.enabled == false) {
      return false;
    } else {
      return true;
    }
  }

  async showCreateDialog() {
    let alert = await this.alertCtrl.create({
      header: "Create New ToDo",
      subHeader: "Enter the details about the todo item",
      inputs: [{
        name: "todo_title",
        type: "text",
        placeholder: "Buy Groceries"
      }, {
        name: "todo_description",
        type: "text",
        placeholder: "Get oranges, apples and more green stuff"
      }, {
        name: "todo_date",
        type: "date",
      }],
      buttons: [{
        text: "Cancel",
      }, {
        text: "Create",
        handler: (data) => {
          this.createTodo(data);
        }
      }]
    });

    alert.present();
  }

  async createTodo(data: any) {

    await firebase.firestore().collection("todos").add({
      "todo_title": data.todo_title,
      "todo_description": data.todo_description,
      "todo_date": new Date(data.todo_date),
      "todo_owner": this.userId
    })

    let toast = await this.toastCtrl.create({
      message: "Todo created successfully.",
      duration: 3000
    });

    toast.present();

    this.getUserTodos()

  }

}
