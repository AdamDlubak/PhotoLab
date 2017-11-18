export class User {
    // Note: Using only optional constructor properties without backing store disables typescript's type checking for the type
    constructor(id?: string, firstName?: string, lastName?: string, email?: string, phoneNumber?: string) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNumber = phoneNumber;
    }
    public id: string;
    public firstName: string;
    public lastName: string;
    public email: string;
    public phoneNumber: string;
}