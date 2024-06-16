import User from "../../model/entity/public/user";
import { IExampleRepository } from "./IExampleRepository";

export class ExampleRepository implements IExampleRepository {
    async getUser(): Promise<any> {
        try {
            const user = await User.findAll({
                attributes: ['id', 'name', 'email'],
                logging: console.log
            })

            return user
        } catch (error) {
            throw error;
        }
    }
}