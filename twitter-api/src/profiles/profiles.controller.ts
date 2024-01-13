import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from 'src/app.service';

@Controller('profiles')
export class ProfilesController {
  constructor(private myMainSrv: AppService) {}

  @Get()
  getAllProfiles() {
    return this.myMainSrv.getallProfiles();
  }
  @Get(':handle')
  getProfileByHandle(@Param('handle') handle: string) {
    return this.myMainSrv.getProfileByHandle(handle);
  }
}
