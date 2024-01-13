import { Component, OnInit } from '@angular/core';
import { Profile, Tweet, Twitter, TwitterService } from '../twitter.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private myTwitterSrv: TwitterService) {}

  tweetText: string = '';

  public get allTweets(): Tweet[] | undefined {
    return this.myTwitterSrv.getAllTweets();
  }

  public get allProfiles(): Profile[] | undefined {
    return this.myTwitterSrv.getAllProfiles();
  }
  postTweet(): void {
    this.myTwitterSrv.postTweet(this.tweetText).subscribe((newTweet) => {
      this.myTwitterSrv.tweets.unshift(newTweet);
      this.tweetText = '';
      this.myTwitterSrv.loadTweets();
    });
  }

  isProfileVerified(tweetHandle: string): boolean | undefined {
    let profiles: Profile[] = this.myTwitterSrv.getAllProfiles();
    let profile = profiles.find((p) => p.handle === tweetHandle);
    return profile?.verified;
  }

  getProfilePicture(handle: string) {
    return `/assets/images/avatars/${handle}.png`;
  }
  handleLink(tweet: string) {
    return `@${tweet}`;
  }
  ngOnInit(): void {}
}
