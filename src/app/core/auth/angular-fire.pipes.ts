import { hasCustomClaim, redirectLoggedInTo, redirectUnauthorizedTo } from "@angular/fire/auth-guard";

export const adminOnly = (claim) => hasCustomClaim(claim);
export const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['sign-in']);
export const redirectLoggedInToApp = () => redirectLoggedInTo(['items']);
export const belongsToAccount = (next) => hasCustomClaim(`account-${next.params.id}`);