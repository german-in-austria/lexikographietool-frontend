export default class Login {
    constructor(username,email,password, password2, location, age) {
        this.username=username;
        this.email=email;
        this.password=password;
        this.password2=password2;
        this.home = location;
        this.age=age;
    }
}