import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AccountService, AlertService} from '@app/_services';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService
  ) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.alertService.clear();
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.router.navigate(['/users']);
    this.accountService.login(this.f.username.value, this.f.password.value).then((res: any) => {
      const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
      this.accountService.getMenuById().then(dataM => {
        this.router.navigateByUrl(returnUrl);
      });
    }).catch(error => {
      this.alertService.error(error);
      this.loading = false;
    });
  }
}
