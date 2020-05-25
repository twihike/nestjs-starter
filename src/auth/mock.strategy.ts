import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Strategy = require('passport-mock-strategy');
// import { Strategy } from 'passport-mock-strategy';

@Injectable()
export class MockStrategy extends PassportStrategy(Strategy) {
  // eslint-disable-next-line class-methods-use-this
  validate(): boolean {
    return true;
  }
}
