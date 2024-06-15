import User from "../../model/entity/User";
import { IExampleRepository } from "./IExampleRepository";

export class ExampleRepository implements IExampleRepository {
    async getUser(): Promise<any> {
        try {
            const user = await User.findAll()

            return user
        } catch (error) {
            throw error;
        }
    }
}