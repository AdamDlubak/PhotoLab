export class UserRegister {
  public firstName: string;
  public lastName: string;
  public email: string;
  public password: string;
  public repeatedPassword: string;

  
  constructor(
  firstName: string = "",
  lastName: string = "",
  email: string = "",
  password: string = "",
  repeatedPassword: string = ""
  ) { }
}
