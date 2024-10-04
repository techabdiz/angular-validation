import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit{

  deleteUser(index: number) {
    let form = this.formGroups[index].value
    let user= this.data[index]
    this.data = this.service.delete(index)
    this.refreshForms()
  }

  addNew() {
    let newUser: User = {
      firstName: '',
      lastName: '',
      email: '',
      editing: true
    };
    this.data.push(newUser)
    let userForm: FormGroup =  this.builder.group({
      firstName: [newUser.firstName,Validators.required],
    lastName: [newUser.lastName,Validators.required],
    email: [newUser.email,[Validators.required, Validators.email]]
    })
    console.log(userForm.value)
    this.formGroups.push(userForm)
  }

  refreshForms() { 
    this.formGroups = []
    this.data.forEach(d => {
      let userForm: FormGroup =  this.builder.group({
          firstName: [d.firstName,Validators.required],
        lastName: [d.lastName,Validators.required],
        email: [d.email,[Validators.required, Validators.email]]
        })
        this.formGroups.push(userForm)
    })
  }


  editValues(index: number) {
      let form = this.formGroups[index].value
      let user= this.data[index]
      this.service.replace(index, form)
      this.data[index] = form
      this.data[index].editing = false
  }

  data: User[] = []

  formGroups: FormGroup[] = []


  constructor(private service: UserService, private builder: FormBuilder) { 
    this.data = service.load()
    console.log(this.data)
  }

  
  ngOnInit(): void {
    this.refreshForms()
  }

}
