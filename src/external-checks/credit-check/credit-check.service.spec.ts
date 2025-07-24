import { Test, TestingModule } from '@nestjs/testing';
import { CreditCheckService } from './credit-check.service';
import {
  Gender,
  MaritalStatus,
  SourceOfIncome,
} from 'src/users/user.enums';
import { ScoreBand, ScoreProvider } from './credit-check.enums';

jest.setTimeout(10000);

describe('CreditCheckService', () => {
  let service: CreditCheckService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreditCheckService],
    }).compile();

    service = module.get<CreditCheckService>(CreditCheckService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should generate a valid credit score', async () => {
    const input = {
      customer_name: 'John Doe',
      gender: Gender.MALE,
      PAN: 'ABCDE1234F',
      aadhaar_number: '234567890123',
      monthly_income: 20000,
      marital_status: MaritalStatus.SINGLE,
      sourceOfIncome: SourceOfIncome.SALARIED,
      date_of_birth: '1990-01-01',
      phone_number: '9876543210',
      email_id: 'john@example.com',
      address: '123 Street',
      postcode: '560001',
    };

    const result = await service.generateScore(input as any);

    expect(result.credit_score).toBeGreaterThanOrEqual(300);
    expect(result.credit_score).toBeLessThanOrEqual(900);
    expect(result.score_provider).toBeDefined();
    expect(result.score_band).toBeDefined();
  });
});
