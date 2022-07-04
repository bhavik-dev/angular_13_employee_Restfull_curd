import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalVariable } from 'src/app/shared/classes/globalVariable';
import { fadeIn } from 'src/app/shared/common-animations/common-animations';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.css'],
  animations: [fadeIn]
})
export class LoginScreenComponent implements OnInit {

  // Declairation-Initialization
  loginForm: FormGroup | any;
  title = 'material-login';

  // Instantiate
  constructor(
    public globalVariable: GlobalVariable,
    private router: Router
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email, Validators.pattern(
        '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,63}$',
      ),]),
      password: new FormControl('', [Validators.required, Validators.pattern(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$'
      )])
    });
  }

  ngOnInit(): void { }

  // On SignIn click
  onSubmit() {
    if (!this.loginForm.valid) {
      return;
    }
    localStorage.setItem('user', JSON.stringify(this.loginForm.value));
    this.globalVariable.userName = this.loginForm.get('email').value;
    this.router.navigate(['/dashboard'])
  }
}