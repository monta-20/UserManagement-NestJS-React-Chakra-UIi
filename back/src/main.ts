import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import {
  ValidationException,
  ValidationFilter,
} from './models/util/filter.validator';
import { ValidationError } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); //enable cors
  app.setGlobalPrefix('/api'); //means prefix global : localhost:port/api
  // app.useGlobalPipes(new ValidationPipe()); //for using validators
  //For return champ of data JSON and canb use in frontend
  app.useGlobalFilters(new ValidationFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      skipMissingProperties: false,
      exceptionFactory: (errors: ValidationError[]) => {
        const errMsg = {};
        errors.forEach((err) => {
          errMsg[err.property] = [...Object.values(err.constraints)];
        });
        return new ValidationException(errMsg);
      },
    }),
  );
  const port = process.env.PORT; //listen on port 5000 now
  await app.listen(port);
}
bootstrap();
