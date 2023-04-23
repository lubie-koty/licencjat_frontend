import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './services/authentication.service';

export const authGuard = () => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  if (authService.isUserLoggedIn()) {
    return true;
  }

  return router.parseUrl('/authenticate/login');
};