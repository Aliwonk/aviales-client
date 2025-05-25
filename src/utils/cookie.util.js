export function getCookie(name) {
    const cookies = document.cookie.split(';');
    
    for (const cookie of cookies) {
        const [cookieName, ...cookieValueParts] = cookie.trim().split('=');
        const cookieValue = cookieValueParts.join('=');
        if (decodeURIComponent(cookieName) === name) {
            return decodeURIComponent(cookieValue);
        }
    }
    
    return undefined;
}

export function setCookie(name, value, live) {
    const date = new Date();
    date.setTime(date.getTime() + (live * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; ${expires}; path=/`;
}

export function deleteCookie(name) {
    setCookie(name, '', -1);
}