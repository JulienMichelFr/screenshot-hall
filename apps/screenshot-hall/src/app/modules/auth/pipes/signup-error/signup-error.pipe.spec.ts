import { AuthErrorPipe } from './signup-error.pipe';

describe('SignupErrorPipe', () => {
  it('create an instance', () => {
    const pipe = new AuthErrorPipe();
    expect(pipe).toBeTruthy();
  });
});
