import { Injectable } from '@nestjs/common';
import { AmlCheckDto } from './dtos/aml-check.dto';
import { AmlCheckResponse, CustomerRiskAssessment, MatchedEntity, RiskAssessment, SanctionsCheck, Status, TransactionRiskAssessment } from './entity/aml-check.entity';

@Injectable()
export class AmlCheckService {

    async initate_check(amlCheckDto: AmlCheckDto)
        : Promise<AmlCheckResponse> {
        try {

            console.log(`[(service)AmlCheckService.initiate_check].try: entry.\n`)
            const responseBody = new AmlCheckResponse();

            // let amlDto = amlCheckDto;
            // console.log(`[(service)AmlCheckService.initiate_check] object recieved:\n ${JSON.stringify(amlDto)}.`)

            // console.log(`Dto received: ${kycCheckDto}`)
            //save and send the received DTO from request to the actual API.

            responseBody.response_id = crypto.randomUUID();
            responseBody.request_id = amlCheckDto.request_id;
            responseBody.timestamp = new Date();

            let rand = Math.floor(Math.random() * 3) + 1; // returns 1, 2, or 3
            console.log(`[(service)AmlCheckService.initiate_check] random value generated = ${rand}.`)

            //check if any value is missing.
            if (
                amlCheckDto.customer.first_name == '' ||
                amlCheckDto.customer.first_name == '' ||
                amlCheckDto.customer.date_of_birth == null ||
                amlCheckDto.customer.first_name == '' ||
                amlCheckDto.customer.identification == null
            ) {
                rand = 4;
                console.log(`[(service)AmlCheckService.initiate_check] fields missing: random value updated = ${rand}.`)
            }

            let result = await this.scenarioSeperator(amlCheckDto, rand, responseBody)

            //based on 
            console.log(`[(service)KycCheckService.initiate_check].try: exit.\n`)
            return (result)
        } catch (err) {
            throw new Error(err)
        }
    }

    scenarioSeperator = (amlCheckDto: AmlCheckDto, val: number, responseBody: AmlCheckResponse) => {

        switch (val) {
            case 1: //Scenario 1: Low Risk – Clear AML Status
                {
                    console.log('[(service)KycCheckService.scenarioSeperator] case 1: Low Risk - Clear AML Status')
                    return this.generateScenario1(amlCheckDto, responseBody)
                }
            case 2: //Scenario 2: Medium Risk – Potential Sanctions Match 
                {
                    console.log('[(service)KycCheckService.scenarioSeperator] case 2: Medium Risk – Potential Sanctions Match')
                    return this.generateScenario2(amlCheckDto, responseBody)
                }
            case 3: //Scenario 3: High Risk – Confirmed PEP and Sanctions Match
                {
                    console.log('[(service)KycCheckService.scenarioSeperator] case 3: High Risk – Confirmed PEP and Sanctions Match')
                    return this.generateScenario3(amlCheckDto, responseBody)
                }
            case 4: //Scenario 4: AML Check Failure – Bad Input 
                {
                    console.log('[(service)KycCheckService.scenarioSeperator] case 4: AML Check Failure – Bad Input')
                    return this.generateScenario4(amlCheckDto, responseBody)

                }
            default: //Scenario 4: AML Check Failure – System Error 
                {
                    console.log('[(service)KycCheckService.scenarioSeperator] case default: AML Check Failure – System Error')
                    return this.generateScenario_unknown(responseBody)
                }
        }
    }

    generateScenario1 = (amlCheckDto: AmlCheckDto, responseBody: AmlCheckResponse) => {
        try {
            //----------set basic values----
            responseBody.status = Status.COMPLETED;
            responseBody.customer_risk_assessment = new CustomerRiskAssessment();

            responseBody.customer_risk_assessment.risk_score = 10;
            responseBody.customer_risk_assessment.risk_category = RiskAssessment.LOW;
            responseBody.customer_risk_assessment.pep_check = {
                status: "Clear",
                details: []
            }
            responseBody.customer_risk_assessment.sanctions_check = {
                status: "Clear",
                matched_entities: []
            }
            responseBody.customer_risk_assessment.watchlist_check = {
                status: "Clear",
                matched_entities: []
            }
            responseBody.customer_risk_assessment.adverse_media_check = {
                status: "Clear",
                matched_entities: []
            }
            responseBody.transaction_risk_assessment = amlCheckDto.transactions.map(this.assessTransactionRisk);

            responseBody.recommendation = "Approved";
            responseBody.comments = "No matches found. Customer is low risk."

            return responseBody
        } catch (err) {
            throw new Error(err)
        }
    }

    generateScenario2 = (amlCheckDto: AmlCheckDto, responseBody: AmlCheckResponse) => {
        try {
            //----------set basic values----
            responseBody.status = Status.COMPLETED;
            responseBody.customer_risk_assessment = new CustomerRiskAssessment();
            responseBody.customer_risk_assessment.sanctions_check = new SanctionsCheck();

            responseBody.customer_risk_assessment.risk_score = 30;
            responseBody.customer_risk_assessment.risk_category = RiskAssessment.MEDIUM;


            if (amlCheckDto.customer.pep_status === false)
                responseBody.customer_risk_assessment.pep_check = {
                    status: "Clear",
                    details: []
                }
            else
                responseBody.customer_risk_assessment.pep_check = {
                    status: "Matched",
                    details: []
                }

            responseBody.customer_risk_assessment.sanctions_check = {
                status: "Match Found",
                matched_entities: [{
                    name: `${amlCheckDto.customer.first_name} ${amlCheckDto.customer.last_name}`,
                    sanctions_list: "OFAC SDN List",
                    match_confidence: 85,
                }]
            }

            responseBody.transaction_risk_assessment = amlCheckDto.transactions.map(this.assessTransactionRisk);

            responseBody.customer_risk_assessment.watchlist_check = {
                status: "Clear",
                matched_entities: []
            }
            responseBody.customer_risk_assessment.adverse_media_check = {
                status: "Clear",
                matched_entities: []
            }

            responseBody.recommendation = "Further review required";
            responseBody.comments = "The customer has a potential match on the OFAC SDN List. Manual verification is recommended."

            return responseBody
        } catch (err) {
            throw new Error(err)
        }
    }

    generateScenario3 = (amlCheckDto: AmlCheckDto, responseBody: AmlCheckResponse) => {
        try {
            //----------set basic values----
            responseBody.status = Status.COMPLETED;
            responseBody.customer_risk_assessment = new CustomerRiskAssessment();
            responseBody.customer_risk_assessment.sanctions_check = new SanctionsCheck();

            responseBody.customer_risk_assessment.risk_score = 90;
            responseBody.customer_risk_assessment.risk_category = RiskAssessment.HIGH;


            if (amlCheckDto.customer.pep_status === false)
                responseBody.customer_risk_assessment.pep_check = {
                    status: "Clear",
                    details: []
                }
            else
                responseBody.customer_risk_assessment.pep_check = {
                    status: "Matched",
                    details: [{
                        "name": "Antal Rogán",
                        "position": `Minister of the Prime Minister's Cabinet Office`,
                        "country": "Hungary"
                    }
                    ]
                }

            responseBody.customer_risk_assessment.sanctions_check = {
                status: "Match Found",
                matched_entities: [{
                    name: `Antal Rogán`,
                    sanctions_list: "OFAC SDN List",
                    match_confidence: 85,
                }]
            }

            responseBody.transaction_risk_assessment = amlCheckDto.transactions.map(this.assessTransactionRisk);

            responseBody.customer_risk_assessment.watchlist_check = {
                status: "Match Found",
                matched_entities: [{
                    name: "Antal Rogán",
                    watchlist_name: "Interpol Red Notice"
                }]
            }
            responseBody.customer_risk_assessment.adverse_media_check = {
                status: "Match Found",
                matched_entities: [
                    {
                        title: 'Antal Rogán Accused of Fraud',
                        source: 'The Daily News',
                        date: '2023-07-01'
                    }
                ]
            }

            responseBody.recommendation = "Rejected";
            responseBody.comments = "Found confirmed links with PEP and sanctioned person(s). High risk of money laundering."

            return responseBody
        } catch (err) {
            throw new Error(err)
        }
    }

    generateScenario4 = (amlCheckDto: AmlCheckDto, responseBody: AmlCheckResponse) => {
        try {
            const requiredFields = [
                "first_name",
                "last_name",
                "date_of_birth",
                "nationality",
                "identification"
            ];

            const customer = amlCheckDto.customer || {};
            const missingFields = [];

            for (const field of requiredFields) {
                const value = customer[field];
                if (value === undefined || value === null || value === "") {
                    missingFields.push(field);
                }
            }
            //----------set basic values----
            responseBody.status = Status.FAILED;

            //----------set response specific values----
            responseBody.error_code = "400";
            responseBody.error_message = `Missing mandatory fields: ${missingFields}`;
            responseBody.recommendation = "Correct input and retry";

            return responseBody
        } catch (err) {
            throw new Error(err)
        }
    }

    generateScenario_unknown = (responseBody: AmlCheckResponse) => {
        try {
            //----------set basic values----
            responseBody.status = Status.FAILED;

            //----------set response specific values----
            responseBody.error_code = "503";
            responseBody.error_message = "AML service is currently unavailable. Please try again later."
            responseBody.recommendation = "Retry after some time.";

            return responseBody
        } catch (err) {
            throw new Error(err)
        }
    }

    //method to iterate over the array of txns and return.
    assessTransactionRisk = (txn) => {
        const highRiskCountries = ["IR", "KP", "SY", "SD", "CU", "VE", "AF", "MM", "RU", "BY"]; // Example high-risk country codes
        const flags = [];

        let risk_score = 10; // base risk score
        let risk_category = RiskAssessment.LOW;

        // Increase score for high-risk country
        if (highRiskCountries.includes(txn.beneficiary.country)) {
            risk_score += 10;
            flags.push("Beneficiary in high-risk jurisdiction");
        }
        // Increase score for high transaction amount
        if (txn.amount > 1000) {
            risk_score += 10;
            flags.push("Large transaction amount");
        }

        const highThreshold = 10 + (10 * 0.7); // 70% above base
        const mediumThreshold = 10 + (10 * 0.4); // 40% above base

        console.log(`risk_score: ${risk_score}`)
        if (risk_score >= highThreshold) {
            risk_category = RiskAssessment.HIGH;
        } else if (risk_score > mediumThreshold && risk_score < highThreshold) {
            risk_category = RiskAssessment.MEDIUM;
        }
        return {
            transaction_id: txn.transaction_id,
            risk_score,
            risk_category,
            flags,
        };
    }

    returnSanctionsEntity = (count: number) => {
        const sanctionsEntities = [
            "OFAC SDN List",                     // US Treasury's Specially Designated Nationals
            "EU Consolidated Sanctions List",   // European Union
            "UN Sanctions List",                // United Nations
            "UK HMT Consolidated List",         // United Kingdom
            "Canada Sanctions List",            // Global Affairs Canada
            "Australia DFAT Consolidated List", // Australian Government
            "Swiss SECO Sanctions List",        // Switzerland
            "Interpol Red Notices",             // International Criminal Notices
            "FBI Most Wanted"                   // US Criminal Watchlist
        ];
    }

}