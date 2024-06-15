import FormData from "form-data";
import fetch from "node-fetch";

/**
 *
 * ApiHandler
 *
 * this function will handle all API Request for communication between services.
 */
export namespace ApiHandler {

  /**
   * handleRequest
   *
   * This function will serve a HTTP Request.
   *
   * @param method
   * @param uri
   * @param data
   * @param header
   * @param multipart
   * @returns
   */
  export async function handleRequest(
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    uri: string,
    data?: any,
    header?: any,
    multipart: boolean = false,
  ): Promise<any> {

    const finalHeader: any = {};
    let finalData: any;
    let finalUri: string = uri;

    // Handle GET Method
    // Final productnya: url with query param
    // @example example.com/api/example?data1=value1&data2=value2
    if (method === 'GET' && data) {
      let queryParam: string = '?';

      // Loop every query param, and generate queryParam string
      for (const e in data) {
        queryParam += `${e}=${data[e]}&`;
      }

      finalUri = finalUri + queryParam;
      finalData = undefined;
    } else {

      // Handle anything other than GET Method
      if (multipart) {

        // Initialize FormData
        const formData = new FormData();

        // Masukin data-datanya ke FormData
        for (const e in data) {
          if (data[e] !== null) {
            formData.append(e, data[e]);
          }
        }

        finalData = formData;
      } else {
        Object.assign(finalHeader, {
          "Content-Type": "application/json"
        })
        finalData = JSON.stringify(data);
      }
    }

    if (header) {
      Object.assign(finalHeader, header);
    }

    const response = await fetch(finalUri, {
      "method": method,
      "headers": finalHeader,
      "body": finalData
    });

    return response.json();
  }
}
