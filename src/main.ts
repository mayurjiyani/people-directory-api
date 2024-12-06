import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

// Main bootstrap function to initialize the application
async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Global validation pipe
    app.useGlobalPipes(new ValidationPipe({ transform: true }));

    const config = new DocumentBuilder()
        .setTitle("People Management API")
        .setDescription(
            "API for managing people and their contact information including emails, phones, and addresses"
        )
        .setVersion("1.0")
        .addTag("People")
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api", app, document);

    await app.listen(3000);
    console.log(`Application is running on: http://localhost:3000`);
}
bootstrap();
