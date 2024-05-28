import { Module } from "@nestjs/common";
import { TypeormHelperService } from "./typeormHelper.service";

@Module({
    providers: [TypeormHelperService],
    exports: [TypeormHelperService]
})
export default class TypeormHelperModule {

}