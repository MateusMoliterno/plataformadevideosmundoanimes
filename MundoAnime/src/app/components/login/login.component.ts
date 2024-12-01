import { RouterOutlet } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy {
  private authSubscription: Subscription;

  constructor(
    private auth: AuthService,
    private router: Router,
    private userService: UserService
  ) {
    this.authSubscription = this.auth.user$.subscribe((user) => {
      if (user) {
        this.saveUserToDb(user);

        this.router.navigate(['/video-selection']);
      }
    });
  }

  login() {
    this.auth.loginWithRedirect();
  }

  saveUserToDb(user: any) {
    const userData = {
      userId: user.sub,
      name: user.name,
      email: user.email,
      picture: user.picture,
      socialLoginProvider: user.sub.includes('google') ? 'Google' : 'Unknown'
    };

    this.userService.saveUser(userData).subscribe({
      next: (result) => console.log('Usuário salvo ou encontrado:', result),
      error: (err) => console.error('Erro ao salvar usuário:', err)
    });
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
      console.log('Assinatura do auth.user$ cancelada');
    }
  }
}