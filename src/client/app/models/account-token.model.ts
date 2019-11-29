export class AccountTokenModel {
    constructor(
        public token_type: string,
        public access_token: string,
    ) { }
}