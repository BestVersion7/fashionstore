export const shortenTitle = (title: string) => {
    const limit = 60;
    return title.length > limit ? `${title.slice(0, limit)}...` : title;
};

export const formatCurrency = (total: number) => {
    return `$${(total / 100).toFixed(2)}`;
};

export const formatProductNameToUrl = (name: string) => {
    return name.toLowerCase().replaceAll(" ", "-");
};

export const formatUrlToProductName = (name: string) => {
    const split = name.split("-");
    const length = split.length;
    let newName: string[] = [];

    for (let i = 0; i < length; i++) {
        const properWord = split[i][0].toUpperCase() + split[i].slice(1);
        newName.push(properWord);
    }
    const newString = newName.reduce((arr, val) => arr + " " + val);
    return newString;
};

export const formatTimeDifference = (date: Date) => {
    let age: string;
    let divide: number;

    const newDate = new Date(date);
    const today = new Date();
    const difference = Number(today) - Number(newDate);

    const second = 1000;
    const secondLimit = second * 59;

    const minute = 60 * second;
    const minuteLimit = minute * 59;

    const hour = minute * 60;
    const hourLimit = hour * 23;

    const day = hour * 24;
    const dayLimit = day * 29;

    const month = day * 30;
    const monthLimit = 11 * month;

    const year = month * 12;

    if (difference < secondLimit) {
        divide = Math.floor(difference / second);
        if (divide < 2) {
            age = `1 second ago`;
        } else {
            age = `${divide} seconds ago`;
        }
    } else if (difference < minuteLimit) {
        divide = Math.floor(difference / minute);
        if (divide < 2) {
            age = `1 minute ago`;
        } else {
            age = `${divide} minutes ago`;
        }
    } else if (difference < hourLimit) {
        divide = Math.floor(difference / hour);
        if (divide < 2) {
            age = `1 hour ago`;
        } else {
            age = `${divide} hours ago`;
        }
    } else if (difference < dayLimit) {
        divide = Math.floor(difference / day);
        if (divide < 2) {
            age = `1 day ago`;
        } else {
            age = `${divide} hours ago`;
        }
    } else if (difference < monthLimit) {
        divide = Math.floor(difference / month);
        if (divide < 2) {
            age = `1 month ago`;
        } else {
            age = `${divide} months ago`;
        }
    } else {
        divide = Math.floor(difference / year);
        if (divide < 2) {
            age = `1 year ago`;
        } else {
            age = `${divide} years ago`;
        }
    }
    return age;
};
