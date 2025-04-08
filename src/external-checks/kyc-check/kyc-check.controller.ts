import { Body, Controller, Get, Post } from '@nestjs/common';
import { KycCheckDto } from './dtos/kyc-check.dto';
import { KycCheckService } from './kyc-check.service';


let responseBody = {
    status: false,
    response: {},
    err: true
}


@Controller('kyc-check')
export class KycCheckController {
    constructor(private readonly kycService: KycCheckService){}

    @Get()
    test(){
        return('in kyc-check.test: working...')
    }

    @Post('kyc/initiate')
    async initiateCheck(@Body() kycCheckDto: any){
    // KycCheckDto){
        try{
            console.log(`[initiateCheck].try: entry.\n`)
            let res = await this.kycService.initiate_check(kycCheckDto);
            console.log(`response received back from [kycService.initiate_check]: ${JSON.stringify(res)}`)
            responseBody = {
                status: true,
                response: res,  //use JSON.stringify if required here.
                err: false
            }
            console.log(`[initiateCheck].try: exit.\n`)
            return responseBody;
        }
        catch(e){
            console.log(`[kyc/initiate] err: ${e}`)
            responseBody.status=false;
            responseBody.response=null;
            responseBody.err=e
            return responseBody
        }
    }

    @Post('kyc/get_status')
    getKycStatus(@Body() request_id: string){
        try{
            return('in kyc-check.kyc.get_status: working...')
        }
        catch(e){
            console.log(`[kyc/initiate] err: ${e}`)
            return 'err occurred.'
        }
    }
}
