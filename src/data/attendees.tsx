import { faker } from '@faker-js/faker';

export const attendees = Array.from({ length: 231 }).map((_, index) => {
    return {
        id: faker.number.int({min: 1000, max: 9999}),
        name: faker.person.fullName(),
        email: faker.internet.email(),
        createdAt: faker.date.recent({ days: 30}),
        checkInAt: faker.date.recent({ days: 7}),
    }
})