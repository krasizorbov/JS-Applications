export async function getCode(name){
    const locationsURL = `https://judgetests.firebaseio.com/locations.json`;
    const response = await fetch(locationsURL);
    const result = await response.json();
    return result.find(l => l.name.toLowerCase() === name.toLowerCase()).code;
}

export async function getToday(code){
    let todayURL = `https://judgetests.firebaseio.com/forecast/today/${code}.json `;
    const response = await fetch(todayURL);
    const result = await response.json();
    return result;
}

export async function getUpcoming(code){
    let upcomingURL = `https://judgetests.firebaseio.com/forecast/upcoming/${code}.json`;
    const response = await fetch(upcomingURL);
    const result = await response.json();
    return result;
}