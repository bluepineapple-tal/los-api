import { Field } from "@nestjs/graphql";
import { IsString } from "class-validator";


export class KycCheckDto{

    @IsString()
    request_id: string; //check with AM for which data type to be used here.
    
    @Field()
    timestamp: Date; //check with AM for which data type to be used here.
    
    @IsString()
    requested_by: string; //check with AM for which data type to be used here.
    
    customer: Customer;
}

class Customer{
    first_name: string;
    last_name: string;
    date_of_birth: string;          //check with AM for which data type to be used here.
    nationality: string;            //check with AM for which data type to be used here.
    identification: Identification;
    address: Address;
    contact: Contact;
    documents: Documents;
}

class Identification{
    type: string;
    number: string;
    issuing_country: string;
    expiry_date: string;
}

class Address{
    street: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;  //check with AM for which data type to be used here.
}

class Contact{
    email: string;
    phone: string;
}

class Documents{
    document_type: string; //check with AM for which data type to be used here.
    document_number: string;
    issue_date: string; //check with AM for which data type to be used here.
    issuing_authority: string;
}