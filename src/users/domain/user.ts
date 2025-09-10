import { uuid } from "uuidv4";

export class User {
    id: string;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    constructor(
        id: string,
        name: string,
        email: string,
        password: string,
        createdAt: Date,
        updatedAt: Date
    ) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public static created(name: string, email: string, password: string, createdAt: Date = new Date(), updatedAt: Date = new Date()): User {
        if (!email || !name) {
            throw new Error('Invalid user data');
        }
        const userId = uuid();
        const user = new User(userId, name, email, password, createdAt, updatedAt);
        return user;
    }
}