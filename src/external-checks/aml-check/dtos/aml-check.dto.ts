import { Type } from "class-transformer";
import { IsDate, IsDateString, IsString } from "class-validator";

class Identification {
    @IsString() type: string;
    @IsString() number: string;
    @IsString() ssuing_country: string;
    @IsString() expiry_date: string;
}

class Address {
    @IsString() street: string;
    @IsString() city: string;
    @IsString() state: string;
    @IsString() postal_code: string;
    @IsString() country: string;                //check with AM for which data type to be used here.
}

class Contact {
    @IsString() email: string;
    @IsString() phone: string;
}

class Transactions {
    @IsString() transacion_id: string;
    amount: number;                     //check if it handles the floating points.
    @IsString() currency: string;
    date: Date;
    @IsString() transaction_type: string;
    originator: BankDetails;            //check if this could be taken from somewhere else.
    benificiary: BankDetails;
}

class BankDetails {
    @IsString() name: string;
    @IsString() account_number: string;
    @IsString() bank: string;
    @IsString() country: string;
}

export class Customer {
    @IsString() first_name: string;
    @IsString() last_name: string;
    @IsDateString() date_of_birth: Date;
    @IsString() nationality: string;            //check with AM for which data type to be used here.
    @Type(() => Identification) identification: Identification;
    @Type(() => Address) address: Address;
    @Type(() => Contact) contact: Contact;
    employment_status: string;
    source_of_funds: string;        // to be mapped with source of income.
    pep_status: Boolean;            // pep: politically exposed person
}

export class AmlCheckDto {
    @IsString() request_id: string;
    @IsDateString() timestamp: Date;
    @IsString() requested_by: string;
    @Type(() => Customer) customer: Customer;
    @Type(() => Transactions) transactions: Transactions[];
}