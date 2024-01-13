import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Profile, Tweet, Twitter, TwitterService } from '../twitter.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private myTwitterSrv: TwitterService,
    private http: HttpClient
  ) {}
  handle: string | null = '';
  bannerUrl: string = ``;
  profilePicUrl: string = ``;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.handle = params.get('handle');
      this.bannerUrl = `/assets/images/banners/${this.handle}.png`;
      this.profilePicUrl = `/assets/images/avatars/${this.handle}.png`;
    });
  }

  public get allProfiles(): Profile[] | undefined {
    return this.myTwitterSrv.profiles;
  }
  public get allTweets(): Tweet[] {
    return this.myTwitterSrv.tweets;
  }
  isProfileVerified(tweetHandle: string): boolean | undefined {
    let profiles: Profile[] = this.myTwitterSrv.getAllProfiles();
    let profile = profiles.find((p) => p.handle === tweetHandle);
    return profile?.verified;
  }
  getTweetsByProfile(): Tweet[] {
    return this.allTweets.filter((p) => p.handle === this.handle);
  }
  getOneProfile(): Profile | undefined {
    return this.allProfiles?.find((p) => p.handle === this.handle);
  }
  handleLink(tweet: string) {
    return `@${tweet}`;
  }
}
