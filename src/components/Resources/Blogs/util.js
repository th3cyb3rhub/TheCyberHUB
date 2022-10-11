export function encodeURL(title) {
    let encoded = '';

    for(let i=0; i<title.length; i++) {
        if(title[i] >= 'a' && title[i] <= 'z') {
            encoded += title[i];
        } else if (title[i] >= 'A' && title[i] <= 'Z') {
            encoded += title[i];
        } else if(title[i] === ' ') {
            encoded += title[i];
        }
    }

    return encoded.split(' ').join('-').toLowerCase();
}