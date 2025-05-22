import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Habilita CORS para todas las rutas
  app.setGlobalPrefix('api'); // Cambia el prefijo de la API a 'api'
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
