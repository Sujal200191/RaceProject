export function handleApiErrors (response) {  
    // console.log("RESPONSE received in handleApiErrors() in api-errors: ", response.data);
    if (response.error) throw Error(response.statusText);
    // if (response && response.length == 0) throw Error;
    return response
}