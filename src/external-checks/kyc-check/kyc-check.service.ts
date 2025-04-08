import { Injectable } from '@nestjs/common';
import { KycCheckDto } from './dtos/kyc-check.dto';
import { KycCheckResponse, Recc, RiskAssessment, Status, Verification } from './entity/kyc-check.entity';


@Injectable()
export class KycCheckService {

    async initiate_check(kycCheckDto: KycCheckDto): Promise<KycCheckResponse> {
        try {
            console.log(`[(service)KycCheckService.initiate_check].try: entry.\n`)
            const responseBody = new KycCheckResponse();
            let kycDto = kycCheckDto;
            responseBody.response_id = crypto.randomUUID();
            responseBody.request_id = kycCheckDto.request_id;
            responseBody.timestamp = new Date().toISOString();

            // console.log(`Dto received: ${kycCheckDto}`)
            //save and send the received DTO from request to the actual API.

            let rand = Math.floor(Math.random() * 5)+1; // returns 0, 1, 2, 3, or 4
            console.log(`[(service)KycCheckService.initiate_check] random value generated = ${rand}.`)
            let result = await this.scenarioSeperator(kycCheckDto, rand, responseBody)
            console.log(`[(service)KycCheckService.initiate_check].try: exit.\n`)
            return (result)
        } catch (err) {
            throw new Error(err)
        }
    }

    scenarioSeperator = (kycCheckBody: KycCheckDto, val: number, responseBody: KycCheckResponse) => {

        switch (val) {
            case 0: //Scenario 1: Fully Verified Customer 
                {   
                    console.log('case 1:')
                    return this.generateScenario1(kycCheckBody, responseBody)
                }
            case 1: //Scenario 2: Missing or Invalid Document 
                {
                    console.log('case 2:')
                    return this.generateScenario2(kycCheckBody, responseBody)
                }
            case 2: //Scenario 3: High-Risk Customer 
                {
                    console.log('case 3:')
                    return this.generateScenario3(kycCheckBody, responseBody)
                }
            case 3: //Scenario 4: KYC System Failure 
                {
                    console.log('case 4:')
                    return this.generateScenario4(kycCheckBody, responseBody)
                } default: //Scenario 4: KYC System Failure 
                {
                    console.log('case default:')
                    return this.generateScenario_unknown(kycCheckBody, responseBody)
                }
        }
    }

    /**
     * 
     * Scenario 0: Fully Verified Customer 
     * Identity Verification: Verified 
     * Document Verification: All documents valid 
     * Address Verification: Confirmed 
     * Risk Assessment: Low 
     * Recommendation: Approved 
     * 
     */
    generateScenario1 = (kycCheckBody: KycCheckDto, responseBody: KycCheckResponse) => {
        //------------set values for basic parameters----------------
        responseBody.status = Status.COMPLETED;
        responseBody.address_verification = Verification.CONFIRMED;
        responseBody.risk_assessment = RiskAssessment.LOW;
        responseBody.recommendation = Recc.APPROVED;
        responseBody.comments = "All provided information is valid and meets compliance standards."
        //------------------------------------------

        //document + identity verification:
        const result: Record<string, string> = {};
        const idType = kycCheckBody.customer?.identification?.type;
        if (idType) {
            result[idType] = Verification.VERIFIED;
        }

        // Add each document type
        const documents = kycCheckBody.customer?.documents || [];
        if (Array.isArray(documents)) {
            for (const doc of documents) {
                if (doc.document_type) {
                    result[doc.document_type] = Verification.VALID;
                }
            }
        }
        responseBody.document_verification = result;

        return responseBody;
    }


    /**
     * Scenario 1: Missing or Invalid Document 
     * Identity Verification: Verified 
     * Document Verification: Passport valid, utility bill invalid 
     * Address Verification: Unconfirmed 
     * Risk Assessment: Medium 
     * Recommendation: Resubmit valid address proof 
     * 
     */
    generateScenario2 = (kycCheckBody: KycCheckDto, responseBody: KycCheckResponse) => {
        //------------set values for basic parameters----------------
        responseBody.status = Status.COMPLETED;
        responseBody.address_verification = Verification.UNCONFIRMED;
        responseBody.risk_assessment = RiskAssessment.MEDIUM;
        responseBody.recommendation = Recc.RESUBMIT;
        responseBody.comments = "Please resubmit the documents again for KYC."
        //------------------------------------------

        //document + identity verification:
        const result: Record<string, string> = {};
        const idType = kycCheckBody.customer?.identification?.type;
        if (idType) {
            result[idType] = Verification.VERIFIED;
        }

        // Add each document type
        const documents = kycCheckBody.customer?.documents || [];
        if (Array.isArray(documents)) {
            for (const doc of documents) {
                if (doc.document_type) {
                    result[doc.document_type] = Verification.INVALID;
                }
            }
        }
        responseBody.document_verification = result;

        return responseBody;
    }

    /**
     * 
     * Scenario 2: High-Risk Customer 
     * Identity Verification: Verified 
     * Document Verification: Valid 
     * Address Verification: Confirmed 
     * Risk Assessment: High (Customer flagged in watchlists) 
     * Recommendation: Manual review required 
     * 
     */
    generateScenario3 = (kycCheckBody: KycCheckDto, responseBody: KycCheckResponse) => {
        //------------set values for basic parameters----------------
        responseBody.status = Status.COMPLETED;
        responseBody.address_verification = Verification.CONFIRMED;
        responseBody.risk_assessment = RiskAssessment.HIGH;
        responseBody.recommendation = Recc.MANUAL;
        responseBody.comments = "Customer flagged in watchlists."
        //------------------------------------------

        //document + identity verification:
        const result: Record<string, string> = {};
        const idType = kycCheckBody.customer?.identification?.type;
        if (idType) {
            result[idType] = Verification.VERIFIED;
        }

        // Add each document type
        const documents = kycCheckBody.customer?.documents || [];
        if (Array.isArray(documents)) {
            for (const doc of documents) {
                if (doc.document_type) {
                    result[doc.document_type] = Verification.VALID;
                }
            }
        }
        responseBody.document_verification = result;

        return responseBody;
    }

    /**
     * 
     * Scenario 3: KYC System Failure 
     * Status: "Failed" 
     * Reason: "Incomplete data or system error" 
     * Recommendation: Retry with complete information or escalate to compliance team 
     * 
     */
    generateScenario4 = (kycCheckBody: KycCheckDto, responseBody: KycCheckResponse) => {
        //------------set values for basic parameters----------------
        responseBody.status = Status.FAILED;
        responseBody.recommendation = Recc.RETRY;
        responseBody.comments = "Incomplete data or system error."
        //------------------------------------------
        return responseBody;
    }

    generateScenario_unknown = (kycCheckBody: KycCheckDto, responseBody: KycCheckResponse) => {
        //------------set values for basic parameters----------------
        responseBody.status = Status.UNKOWN;
        responseBody.recommendation = Recc.RETRY;
        responseBody.comments = "Unknown error occurred."
        //------------------------------------------
        return responseBody;
    }
}