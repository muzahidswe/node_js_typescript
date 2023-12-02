import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('Apsis CRM API')
    .setDescription('')
    .setVersion('1.0')
    .addTag('')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true
      }
      //exception factory for custom validation error message as key value pair
      // exceptionFactory: (validationErrors: ValidationError[] = []) => {
      //     const response_data = {};
      //     validationErrors.filter(function (values) {
      //         response_data[values.property] = Object.keys(values.constraints).map(
      //             (k) => values.constraints[k],
      //         );
      //     });
      //     return new BadRequestException(response_data);
      // },
    })
  );
  //app.useGlobalInterceptors(new CustomResponseInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(8003);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
