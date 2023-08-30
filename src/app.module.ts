import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { BlogModule } from './blog/blog.module';

@Module({
  imports: [AdminModule, BlogModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
