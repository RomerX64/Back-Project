import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
    private users = [
        {
            id: 1,
            email: "juan.perez@example.com",
            name: "Juan Pérez",
            password: "123456",
            address: "Calle Ficticia 123, Buenos Aires",
            phone: "+54 9 11 2345 6789",
            country: "Argentina",
            city: "Buenos Aires"
          },
          {
            id: 2,
            email: "maria.gomez@example.com",
            name: "María Gómez",
            password: "password123",
            address: "Avenida Siempre Viva 456, Madrid",
            phone: "+34 91 234 5678",
            country: "España",
            city: "Madrid"
          },
          {
            id: 3,
            email: "luis.martinez@example.com",
            name: "Luis Martínez",
            password: "123qweasd",
            address: "Calle Mayor 789, Ciudad de México",
            phone: "+52 55 1234 5678",
            country: "México",
            city: "Ciudad de México"
          },
          {
            id: 4,
            email: "ana.sanchez@example.com",
            name: "Ana Sánchez",
            password: "ana1234",
            address: "Plaza del Sol 101, Lima",
            phone: "+51 1 234 5678",
            country: "Perú",
            city: "Lima"
          },
          {
            id: 5,
            email: "pedro.rodriguez@example.com",
            name: "Pedro Rodríguez",
            password: "pedro5678",
            address: "Calle del Carmen 333, Bogotá",
            phone: "+57 1 234 5678",
            country: "Colombia",
            city: "Bogotá"
          }
    ]
    async getUsers() {
        return this.users;
    }
}
