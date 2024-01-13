import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TweetsController } from './tweets/tweets.controller';
import { ProfilesController } from './profiles/profiles.controller';

@Module({
  imports: [],
  controllers: [AppController, TweetsController, ProfilesController],
  providers: [AppService],
})
export class AppModule {}
