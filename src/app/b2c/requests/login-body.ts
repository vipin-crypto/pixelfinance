export class LoginBody {
  email: string;
  password: string;
  type: string = 'b2c';
  country: any = "kuwait";
}

export class SuperAdminBody
{
  email:string;
  password:string;
}