import { Test, TestingModule } from '@nestjs/testing';
import { ScreenshotService } from './screenshot.service';

describe('ScreenshotService', () => {
  let service: ScreenshotService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScreenshotService],
    }).compile();

    service = module.get<ScreenshotService>(ScreenshotService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
