import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('Biblioteca API')
    .setDescription('API para gerenciamento de autores e livros')
    .setVersion('1.0')
    .addTag('authors')
    .addTag('books')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Rota onde o Swagger estará disponível

  await app.listen(3000);
}
bootstrap();
