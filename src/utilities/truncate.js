export const truncateString = (string)=>{
    if(string === undefined) return '...'
    if (string === null) return "...";
    const maxLength = 105;
    const str = string.length > maxLength ? 
    `${string.substring(0,maxLength)}...`:
    string;
    return str;
}