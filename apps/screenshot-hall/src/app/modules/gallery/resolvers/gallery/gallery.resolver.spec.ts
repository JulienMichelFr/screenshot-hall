import { Test, TestingModule } from '@nestjs/testing';
import { GalleryResolver } from './gallery.resolver';

describe('GalleryResolver', () => {
  let resolver: GalleryResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GalleryResolver],
    }).compile();

    resolver = module.get<GalleryResolver>(GalleryResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
