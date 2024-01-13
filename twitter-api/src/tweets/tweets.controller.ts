import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { AppService, Tweet } from 'src/app.service';

@Controller('tweets')
export class TweetsController {
  constructor(private myMainSrv: AppService) {}
  @Get()
  getAllTweets() {
    return this.myMainSrv.getAllTweets();
  }
  @Get(':handle')
  getTweetsByHandle(@Param('handle') handle: string) {
    return this.myMainSrv.getTweetsByHandle(handle);
  }
  @Post()
  createTweet(@Body() tweet: Tweet) {
    this.myMainSrv.createTweet(tweet);
  }
  @Put('/update/:id')
  updateTweet(
    @Param('id') tweetId: string,
    @Body() updatedTweet: Partial<Tweet>,
  ) {
    const id = parseInt(tweetId);
    const result = this.myMainSrv.updateTweet(id, updatedTweet);
  }
  @Delete('delete/:id')
  deleteTweet(@Param('id') tweetId: string) {
    const id = parseInt(tweetId);
    this.myMainSrv.deleteTweet(id);
  }
}
