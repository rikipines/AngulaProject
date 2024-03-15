import { CanActivateFn } from '@angular/router';

export const gardGuard: CanActivateFn = (route, state) => {
  const isRegistered = sessionStorage.getItem("user")
  const isLecture=sessionStorage.getItem("lector")
  if (!isRegistered&&!isLecture) {
    return false;
  }
  return true;
};
