import { Body, Controller, Get, Post } from '@nestjs/common';
import { AmlCheckDto } from './dtos/aml-check.dto';
import { AmlCheckService } from './aml-check.service';


let responseBody = {
    status: false,
    response: {},
    err: true
}


@Controller('aml-check')
export class AmlCheckController {
constructor(private readonly amlCheckService: AmlCheckService){}
    @Get()
    amlCheckTest(){
        return ' amlCheckTest '
    }

    @Post('aml/initaite')
    async initateCheck(@Body() amlCheckDto: 
    any){
    // AmlCheckDto){
        try{
            console.log(`[(controller)aml/initiate].try: entry.\n`)
            // console.log(`response received in [kycService.initiate_check]: ${JSON.stringify(amlCheckDto)}`)
            let res = await this.amlCheckService.initate_check(amlCheckDto);

            // console.log(`response received back from [kycService.initiate_check]: ${JSON.stringify(res)}`)
            responseBody = {
                status: true,
                response: res,//JSON.stringify(res),
                err: false
            }
            console.log(`[(controller)aml/initiate].try: exit.\n`)
            return responseBody;
        }catch (e) {
            console.log(`[(controller)aml/initiate] err: ${e}`)
            responseBody.status = false;
            responseBody.response = null;
            responseBody.err = e;
            return responseBody
        }
    }
}
