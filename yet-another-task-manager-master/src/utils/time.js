export function convertTime(time) {
    const dateObj = new Date(time);
    let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    let year = dateObj.getFullYear();
    let month = months[dateObj.getMonth()];
    let date = dateObj.getDate();
    let convertTime = date + ' ' + month + ' ' + year + ' ';
    return convertTime;

}