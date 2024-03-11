import { AuthProvider } from "@glue42/server-admin-ui";

export class CustomAuthProvider implements AuthProvider {
  public isLoading = false;
  public isAuthenticated = false;
  public addTokenToRequest = true;
  public addCredentialsToRequest = false;
  public addUsernameToRequest = false;
  public error: any = undefined;

  public async loginIfNeeded(): Promise<void> {
    // do nothing, we have hardcoded isAuthenticated to true, so this is never called
    console.log(`loginIfNeeded`);
    this.isAuthenticated = true;
    return Promise.resolve();
  }
  public async getAccessToken(): Promise<string | undefined> {
    return "user:admin";
  }

  public async getUserInfo(): Promise<{ id?: string | undefined; } | undefined> {
    return {
      id: "admin"
    };
  }
}
