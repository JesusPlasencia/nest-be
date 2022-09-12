import { Injectable, NotFoundException } from '@nestjs/common';
import { Order } from 'src/order/entity/order.entity';
import { CreateUserDTO } from '../dto/user.dto';
import { User } from '../entity/user.entity';

@Injectable()
export class UserService {
    private users: User[] = [
        {
            id: 1,
            username: "hs-wmsugar-10",
            password: "harrypassword",
            state: true,
            created: new Date(),
            modified: new Date()
        },
        {
            id: 2,
            username: "ts-red-13",
            password: "passwordversion",
            state: true,
            created: new Date(),
            modified: new Date()
        }
    ];

    findAll(): User[] {
        return this.users;
    }

    findById(id: number): User {
        const user = this.users.find(user => user.id === id);
        if (!user) {
            throw new NotFoundException("User Not Found.");
        }
        return user;
    }

    findOrdersById(id: number): Order[] {
        const user = this.findById(id);
        return ([
            {
                id: 1,
                user,
                address: "Av. ABC 160",
                delivery: new Date(2022, 8, 25),
                state: true,
                created: new Date(2022, 8, 15),
                modified: new Date(2022, 8, 17)
            },
            {
                id: 2,
                user: user,
                address: "Av. ABC 160",
                delivery: new Date(2022, 9, 11),
                state: true,
                created: new Date(2022, 9, 1),
                modified: new Date(2022, 9, 1)
            }
        ])
    }

    create(payload: CreateUserDTO): User {
        console.log(payload);
        let idArray = this.users.map(user => {
            return user.id;
        });
        let newId = Math.max(...idArray) + 1;
        const newUser: User = {
            id: newId,
            username: payload.username,
            password: payload.password,
            state: true,
            created: new Date(),
            modified: new Date()
        };
        this.users.push(newUser);
        return newUser;
    }

    update(id: number, payload: any): User {
        let foundUser = this.findById(id);
        if (foundUser) {
            let index = this.users.findIndex(user => user.id === id);
            this.users[index] = {
                ...foundUser,
                ...payload,
                modified: new Date()
            };
            return this.users[index];
        }
        return null;
    }

    delete(id: number): User {
        let foundUser = this.findById(id);
        if (foundUser) {
            this.users = this.users.filter(user => user.id !== id);
            return foundUser;
        }
        return null;
    }
}
