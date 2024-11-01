import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
        .setTitle("RAG Backend")
        .addTag("rookedsysc")
        .build();
    const documents = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("swagger-ui/index.html", app, documents);

    await app.listen(29736);
}

bootstrap();
