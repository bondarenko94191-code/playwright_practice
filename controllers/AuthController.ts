export default class AuthController {
  async signIn(request: any, email: string, password: string) {
    const response = await request.post("/api/auth/signin", {
      data: {
        email,
        password,
      },
    });
    return response;
  }
}
