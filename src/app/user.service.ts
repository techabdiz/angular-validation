import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  save(usr: User) { 
    usr.id = Date.now() + ""
    let lst = this.load()
    lst.push(usr)
    this.store(lst)
  }

  delete(index: number): User[] { 
    let lst = this.load()
    lst = lst.slice(0, index).concat(lst.slice(index+1, lst.length))
    this.store(lst)
    return lst;
  }

  replace(index: number, usr: User) { 
    if(!usr.id) { 
      usr.id = Date.now() + ""
    }
    let lst = this.load()
    lst[index] = usr
    this.store(lst)
  }

  load(): User[] { 
    let lst  = localStorage.getItem('users') || '[]'
    let rval: User[] = JSON.parse(lst)
    return rval
  }

  private store(usr: User[]){ 
    localStorage.setItem('users', JSON.stringify(usr))
  }

  getById(id: string):  User | undefined{ 
    return this.load().find(u=> u.id === id)
  }
}
