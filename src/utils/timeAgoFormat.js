function timeAgoFormat(dateString) {
    const date = new Date(dateString)
    const now = new Date
    const seconds = Math.floor((now - date) / 1000)

    let interval = Math.floor(seconds/ 31536000)
    if(interval>=1) {
        return interval === 1 ? `${interval} years ago` : `${interval} years ago`
    }

    interval = Math.floor(seconds / 2592000)
    if(interval >= 1){
        return interval === 1 ? `${interval} month ago` : `${interval} month ago`
    }

    interval = Math.floor(seconds / 604800)
    if(interval >= 1) {
        return interval === 1 ? `${interval} week ago` : `${interval} week ago`
    }

    interval = Math.floor(seconds / 86400)
    if(interval >= 1) {
        return interval === 1 ? `${interval} day ago` : `${interval} day ago`
    }

    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
        return interval === 1 ? `${interval} hour ago` : `${interval} hours ago`;
    }

    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
        return interval === 1
        ? `${interval} minute ago`
        : `${interval} minutes ago`;
    }

    return seconds <= 1 ? `${seconds} seconds ago` : `${seconds} seconds ago`
}

export {timeAgoFormat}