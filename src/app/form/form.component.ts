import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../user';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit {

  templateToggle: boolean = false
  message=""
  
  onSubmit() {
    let user: User = this.userForm.value
    this.service.save(user)
    this.message = "user saved successfully !"
    setTimeout(()=>{
      this.message = ""
      this.userForm.reset()
    }, 2000)
  }

  constructor(private formBuilder: FormBuilder,private service: UserService, 
    private activeRoute: ActivatedRoute
  ) { 
    this.userForm = formBuilder.group({
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      email: ['',[Validators.required, Validators.email]],
    })
  }
  ngOnInit(): void {
    let id = this.activeRoute.snapshot.paramMap.get('id')
    if(id) { 
      let user = this.service.getById(id)
      if(user) { 
        this.userForm.patchValue(user)
      }
    }
  }

  userForm: FormGroup = new FormGroup({});


}
