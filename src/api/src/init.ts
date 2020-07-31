import { INestApplication } from '@nestjs/common';
import { AdministratorsService } from './services/postgres/administrators/administrators.service';

export const doImport = false;

export async function init(app: INestApplication) {
    app.get(AdministratorsService)
        .registerUser(
            {
                email: 'admin@exmple.com',
                name: 'Example Admin',
                passwordHash: 'examplepass',
            } as any,
            null,
        )
        .catch(err => console.log('Administrator already exists, omitted'));
}
