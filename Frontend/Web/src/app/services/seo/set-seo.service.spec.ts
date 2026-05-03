import { TestBed } from '@angular/core/testing';
import { SetSeoService } from './set-seo.service';
import { Title, Meta } from '@angular/platform-browser';

describe('SetSeoService', () => {
  let service: SetSeoService;
  let mockTitle: jasmine.SpyObj<Title>;
  let mockMeta: jasmine.SpyObj<Meta>;

  beforeEach(() => {
    mockTitle = jasmine.createSpyObj('Title', ['setTitle']);
    mockMeta = jasmine.createSpyObj('Meta', ['updateTag']);

    TestBed.configureTestingModule({
      providers: [
        SetSeoService,
        { provide: Title, useValue: mockTitle },
        { provide: Meta, useValue: mockMeta },
      ],
    });

    service = TestBed.inject(SetSeoService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should set title when provided', () => {
    service.setSeo({ title: 'Test Title' });

    expect(mockTitle.setTitle).toHaveBeenCalledWith('Test Title');
  });

  it('should set description meta tag when provided', () => {
    service.setSeo({ description: 'Test Description' });

    expect(mockMeta.updateTag).toHaveBeenCalledWith({
      name: 'description',
      content: 'Test Description',
    });
  });

  it('should set keywords meta tag when provided', () => {
    service.setSeo({ keyword: 'angular, testing' });

    expect(mockMeta.updateTag).toHaveBeenCalledWith({
      name: 'keywords',
      content: 'angular, testing',
    });
  });

  it('should set all SEO fields when all data provided', () => {
    const data = {
      title: 'Full Title',
      description: 'Full Description',
      keyword: 'full, keywords',
    };

    service.setSeo(data);

    expect(mockTitle.setTitle).toHaveBeenCalledWith('Full Title');
    expect(mockMeta.updateTag).toHaveBeenCalledWith({
      name: 'description',
      content: 'Full Description',
    });
    expect(mockMeta.updateTag).toHaveBeenCalledWith({
      name: 'keywords',
      content: 'full, keywords',
    });
  });

  it('should not call anything if empty object is passed', () => {
    service.setSeo({});

    expect(mockTitle.setTitle).not.toHaveBeenCalled();
    expect(mockMeta.updateTag).not.toHaveBeenCalled();
  });

  it('should handle partial data correctly', () => {
    service.setSeo({ title: 'Only Title' });

    expect(mockTitle.setTitle).toHaveBeenCalled();
    expect(mockMeta.updateTag).not.toHaveBeenCalled();
  });
});
