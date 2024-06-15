import { IExampleRepository } from "../../../repository/ExampleRepository/IExampleRepository";
import { ExampleRepository } from "../../../repository/ExampleRepository/exampleRepository";
import { IExampleHandler } from "./IExampleHandler";

export class ExampleHandler implements IExampleHandler {
    private repository: IExampleRepository = new ExampleRepository()

    async handleGetUSer(): Promise<any> {
        return await this.repository.getUser()
        // return this.exampleService.getUser();
    }
}