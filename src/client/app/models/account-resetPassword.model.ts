export class ResetPasswordModle {
    constructor(
        public Code: string,
        public UserId: string,
        public NewPassword: string,
        public ConfirmPassword: string
    ) { }
}