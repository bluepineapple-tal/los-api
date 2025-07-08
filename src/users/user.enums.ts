import { registerEnumType } from '@nestjs/graphql';

export enum UserRole {
  VENDOR = 'vendor',
  NBFC_PERSONNEL = 'nbfc_personnel',
  UNDERWRITER = 'underwriter',
  CONSUMER = 'consumer',
  ADMIN = 'admin',
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
}

export enum Country {
  INDIA = 'India',
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export enum MaritalStatus {
  SINGLE = 'single',
  MARRIED = 'married',
  DIVORCED = 'divorced',
  WIDOWED = 'widowed',
}

export enum SourceOfIncome {
  SALARIED = 'salaried',
  SELF_EMPLOYED = 'self_employed',
  BUSINESS = 'business',
  OTHER = 'other',
}

registerEnumType(UserRole, { name: 'UserRole' });
registerEnumType(UserStatus, { name: 'UserStatus' });
registerEnumType(Country, { name: 'Country' });
registerEnumType(Gender, { name: 'Gender' });
registerEnumType(MaritalStatus, { name: 'MaritalStatus' });
registerEnumType(SourceOfIncome, { name: 'SourceOfIncome' });
