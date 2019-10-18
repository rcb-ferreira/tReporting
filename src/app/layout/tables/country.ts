export interface Country {
  dialed_at: string;
  trailref: string;
  contactref: string;
  extension: string;
  number: string;
  country: string;
  call_type: string;
  end_reason: string;
  end_code: string;
  calltime: number;
  holdtime: number;
  waittime: number;
  application: string;
  app_version: string;
}
