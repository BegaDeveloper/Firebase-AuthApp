import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubSink } from 'subsink';
import { User } from '../../interfaces/user';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  addUserForm: FormGroup;
  userModel: User = new User();
  newUser: any = [];
  subs = new SubSink();

  constructor(private http: HttpService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.addUserForm = this.fb.group({
      user: ['', [Validators.required]],
      mail: ['', [Validators.required, Validators.email]],
      pass: ['', [Validators.required, Validators.minLength(6)]],
      pass2: ['', [Validators.required, Validators.minLength(6)]],
    });

    //Auto Unsubscribe using SubSink
    this.subs.add(
      this.http.getUsers().subscribe((res) => {
        this.newUser = res;
      })
    );
  }

  //ngSubmit
  submitUser() {
    console.log('Credetials: ', this.addUserForm.value);
    this.addUserForm.reset();
  }

  get user() {
    return this.addUserForm.get('user');
  }

  get mail() {
    return this.addUserForm.get('mail');
  }

  get pass() {
    return this.addUserForm.get('pass');
  }

  get pass2() {
    return this.addUserForm.get('pass2');
  }

  //HTTP calls
  ///
  getAllUsers() {
    this.http.getUsers().subscribe((res) => {
      this.newUser = res;
    });
  }
  ///
  postUser() {
    this.userModel.user = this.addUserForm.value.user;
    this.userModel.mail = this.addUserForm.value.mail;
    this.userModel.pass = this.addUserForm.value.pass;
    this.userModel.pass2 = this.addUserForm.value.pass2;

    this.http.postUser(this.userModel).subscribe((res) => {
      console.log(res);
      this.addUserForm.reset();
      this.getAllUsers();
    });
  }

  ///
  editUser(list: any) {
    this.userModel.id = list.id;
    this.addUserForm.controls['user'].setValue(list.user);
    this.addUserForm.controls['mail'].setValue(list.mail);
    this.addUserForm.controls['pass'].setValue(list.pass);
    this.addUserForm.controls['pass2'].setValue(list.pass2);
  }
  updateUser() {
    this.userModel.user = this.addUserForm.value.user;
    this.userModel.mail = this.addUserForm.value.mail;
    this.userModel.pass = this.addUserForm.value.pass;
    this.userModel.pass2 = this.addUserForm.value.pass2;
    this.http.editUser(this.userModel, this.userModel.id).subscribe((res) => {
      console.log(res);
      alert('Updated');
      this.addUserForm.reset();
      this.getAllUsers();
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
