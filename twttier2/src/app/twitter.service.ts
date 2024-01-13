import { Injectable } from '@angular/core';
import * as data from './twitter.json';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class TwitterService {
  twitterData: Twitter = data;
  tweets: Tweet[] = [];
  profiles: Profile[] = [];
  constructor(private http: HttpClient) {
    this.loadTweets();
    this.loadProfiles();
  }
  getAllTweets(): Tweet[] {
    return this.twitterData.tweets;
  }
  getAllProfiles(): Profile[] {
    return this.twitterData.profiles;
  }
  loadTweets(): void {
    const tweetUrl = 'http://localhost:3000/tweets';
    this.http.get<Tweet[]>(tweetUrl).subscribe((data) => (this.tweets = data));
  }
  loadProfiles(): void {
    const profileUrl = 'http://localhost:3000/profiles';
    this.http
      .get<Profile[]>(profileUrl)
      .subscribe((data) => (this.profiles = data));
  }

  postTweet(text: string): Observable<Tweet> {
    let tweetUrl = 'http://localhost:3000/tweets';
    let handle = 'JonDoe';
    let createdOn = new Date().toISOString();

    let newTweet: Tweet = {
      id: 0,
      handle,
      text,
      createdOn,
    };
    return this.http.post<Tweet>(tweetUrl,newTweet)
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
