import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-mock-strategy';

@Injectable()
export class MockStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super();
  }

  // eslint-disable-next-line class-methods-use-this
  validate(): boolean {
    return true;
  }
}
