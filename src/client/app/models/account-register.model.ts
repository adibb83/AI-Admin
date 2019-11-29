export class AccountRegisterModel {
    constructor(
        public Email: string,
        public Password: string,
        public ConfirmPassword: string,
        public FullName:string,
        public PhoneNumber:string,
        public Company: string,
        public GreetingName:string,
        public RedirectUrl: string
    ) { }
}