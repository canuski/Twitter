import { Injectable } from '@nestjs/common';
import * as data from './twitter.json';
@Injectable()
export class AppService {
  twitterData: Twitter = data;
  constructor() {}
  getAllTweets(): Tweet[] {
    return this.twitterData.tweets;
  }
  getTweetsByHandle(handle: string): Tweet[] {
    return this.twitterData.tweets.filter((p) => p.handle === handle);
  }
  postTweets() {}
  getallProfiles(): Profile[] {
    return this.twitterData.profiles;
  }
  getProfileByHandle(handle: string): Profile {
    return this.twitterData.profiles.find((p) => p.handle === handle);
  }
  createTweet(tweet: Tweet) {
    tweet.createdOn = new Date().toISOString();
    tweet.handle = 'JoeDoe';
    tweet.id = this.twitterData.tweets.length + 1;
    this.twitterData.tweets.push(tweet);
  }
  updateTweet(tweetId: number, updatedTweet: Partial<Tweet>) {
    let tweetIndex = this.twitterData.tweets.findIndex(
      (tweet) => tweet.id === tweetId,
    );
    this.twitterData.tweets[tweetIndex] = {
      ...this.twitterData.tweets[tweetIndex],
      ...updatedTweet,
    };
    return this.twitterData.tweets[tweetIndex];
  }
  deleteTweet(tweetId: number) {
    const tweetIndex = this.twitterData.tweets.findIndex(
      (tweet) => tweet.id === tweetId,
    );
    this.twitterData.tweets.splice(tweetIndex, 1);
  }
}
export interface Twitter {
  tweets: Tweet[];
  profiles: Profile[];
}
export interface Profile {
  id: number;
  verified: boolean;
  handle: string;
  name: string;
  bio: string;
}
export interface Tweet {
  id: number;
  handle: string;
  text: string;
  createdOn: string;
}
