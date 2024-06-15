
import {Request, Response} from "express";

/**
 * ActivityLogWritter
 * This function created just for writing data manipulation activity log.
 * There are few things that run within these functions:.
 *
 * @param {'WRITE_CREATIONAL_LOG' | 'WRITE_UPDATE_PROCESS_LOG' | 'WRITE_ACTIVITY_LOG' | 'WRITE_SYSTEM_LOG' | 'WRITE_API_BRIDGE_LOG'} command
 * This parameter contains command that available to be logged within this service.
 *
 * @param {{"response": Response, "activity": string, "payload": any}} options
 * This parameter contains 3 elements described as below:
 * 1. response
 * Response is taken from Express Response. This for ease the taking of current session.
 *
 * 2. activity
 * This attribute defining the activity or error type. ActivityLogWritter will convert this attribute into tidier format. UPPER_SNAKE_CASE
 *
 * 3. payload
 * In-fact, payload contains 3 different object type to be possed with:
 * {"data": Object} | {"data": {"before": Object, "after": Object}} | any
 */
export namespace ActivityLogWritter {

    export async function logWriter(
            command: 'WRITE_CREATIONAL_LOG' | 'WRITE_UPDATE_PROCESS_LOG' | 'WRITE_ACTIVITY_LOG' | 'WRITE_SYSTEM_LOG',
            options: {
                "request": Request,
                "response": Response,
                "log_type": string,
                "activity": string,
                "payload": any
            }): Promise<boolean> {
        
        // Generate report time
        const reportTime: Date = new Date();

        // Generate and tiding up Service Name
        const serviceName: string = (process.env.APP_NAME ?? "boilerplate-express").toUpperCase().replace("-", "_").replace(" ", "_");

        // Tiding up activity name
        options.activity.toUpperCase().replace("-", "_").replace(" ", "_");

        // Assigning report time to the payload
        Object.assign(options.payload, {
            "report_time": reportTime,
            "service_name": serviceName,
        });

            try {
                console.log(`==> ${command}:`, JSON.stringify(options))
            } catch (error) {
                console.log(`==> ${command}:`, options)
            }
        
        return false;
    }
}
