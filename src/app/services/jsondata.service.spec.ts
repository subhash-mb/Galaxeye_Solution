import { TestBed } from '@angular/core/testing';

import { JsondataService } from './jsondata.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('JsondataService', () => {
  let service: JsondataService;
  let httpTestingcontroller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [JsondataService],
    });
    service = TestBed.inject(JsondataService);
    httpTestingcontroller = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingcontroller.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should fetch data from given API karnataka.geojson file', () => {
    const testData = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {
            fill: '#00f',
          },
          geometry: {
            type: 'Polygon',
            coordinates: [
              [
                [75.09160410950545, 16.810177981518162],
                [74.94630809601885, 16.847691729659726],
                [74.9466763879968, 16.84922253642116],
                [74.94653824779498, 16.849257511748792],
                [74.94661012987126, 16.849559067659648],
                [74.94652079543283, 16.849581777046563],
                [74.94664071163815, 16.85008328281972],
                [74.94455445534247, 16.850615567273007],
                [74.94466225780121, 16.851066494031716],
                [74.94458610193651, 16.851085953489978],
                [74.94459520213309, 16.851124097547036],
                [74.73719293797149, 16.904219573332806],
                [74.73642011148344, 16.900954923672533],
                [74.50670222393065, 16.95589178236086],
                [74.5070983155925, 16.957558249103553],
                [74.50705673615602, 16.95756790643262],
                [74.50715607298585, 16.957989616621997],
                [74.50711975172277, 16.95799806923907],
                [74.50726932220931, 16.958631157547806],
                [74.50529879456947, 16.95909040308299],
                [74.50538176605771, 16.959441702035576],
                [74.50533118437919, 16.95945349726306],
                [74.50538880385878, 16.959698053889646],
                [74.30076512095756, 17.007445357508214],
                [74.30008759045104, 17.004560843637183],
                [74.07199070296406, 17.05502463408969],
                [74.07252435721274, 17.057303462027086],
                [74.07035991386572, 17.057761429689172],
                [74.07049201394524, 17.058325495667734],
                [74.0704532883918, 17.05833368659086],
                [74.0705025977159, 17.058544783061247],
                [74.05987001393444, 17.06079312681164],
                [74.05927469786958, 17.18279909105971],
                [75.09178254228604, 17.184971484736877],
                [75.09160410950545, 16.810177981518162],
              ],
            ],
          },
        },
      ],
    };

    service.getJSON().subscribe((data) => {
      expect(data).toEqual(testData);
    });

    const req = httpTestingcontroller.expectOne(service.geoUrl);
    expect(req.request.method).toBe('GET');
    req.flush(testData);
  });
});
