import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as fs from 'fs';
async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync(
      '/etc/letsencrypt/live/proskill-academy.com/privkey.pem',
    ),
    cert: fs.readFileSync(
      '/etc/letsencrypt/live/proskill-academy.com/fullchain.pem',
    ),
  };
  const app = await NestFactory.create(AppModule, { httpsOptions });

  const config = new DocumentBuilder()
    //    .addServer('/api')
    .setTitle('Pro-Skill')
    .setDescription('The Pro-Skill API description')
    .setVersion('0.4')
    .addBearerAuth({
      description:
        'Admin: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsIm5hbWUiOiJhZG1pbiIsImlhdCI6MTcxNjM3MDg0NywiZXhwIjoxNzE4OTYyODQ3fQ.P9pY301MTP0YJYY06bfjbJIVRr-4_SeunXc_GcBcr-M ',
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      filter: true,
      showRequestDuration: true,
    },
  });
  app.enableCors();
  await app.listen(5000);
}
bootstrap();
