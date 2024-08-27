import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { SWAGGER_PREFIX } from './constants';
import { FarmersModule } from './modules/farmers/farmers.module';

export class SwaggerService {
  static async generate(app: INestApplication) {
    const document = SwaggerService.createDocument(app);
    const path = SWAGGER_PREFIX;
    SwaggerModule.setup(path, app, document);
  }

  static createDocument(app: INestApplication) {
    const config = new DocumentBuilder()
      .setTitle('Brain Agriculture API')
      .setDescription('API Nestjs and Nodejs')
      .setVersion('1.0.0')
      .addTag('Agricultores')
      .build();

    return SwaggerModule.createDocument(app, config, {
      include: [FarmersModule],
    });
  }
}
