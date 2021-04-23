// author : Jos Feenstra
// purpose : string helper functions

export function extractExtension(filename: string) : string
{
    // I found some black magic regex expression on stack overflow 
    // https://stackoverflow.com/questions/680929/how-to-extract-extension-from-filename-string-in-javascript
    let re = /(?:\.([^.]+))?$/;
    return re.exec(filename)![1];
}