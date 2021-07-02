export class Todo {
    task: string;
    due: Date;

    dueToday(): boolean {
        return this.due.getTime() - new Date().getTime() <= 86400000
    }

    formatDate() {
        const days = Math.round(( this.due.getTime() - new Date().getTime())/86400000);
        if (Math.abs(days) < 1) {
            const hours = Math.round(( this.due.getTime() - new Date().getTime())/3600000);
            if (Math.abs(hours) < 1) {
                const minutes = Math.round(( this.due.getTime() - new Date().getTime())/60000);
                if (Math.abs(minutes) < 1) {
                    const seconds = Math.round(( this.due.getTime() - new Date().getTime())/1000)
                    return seconds.toString() + (seconds == 1 ? " seconds" : " seconds")
                }
                return minutes.toString() + (minutes == 1 ? " minute" : " minutes")
            }
            return hours.toString() + (hours == 1 ? " hour" : " hours")
        }
        return days.toString() + (days == 1 ? " day" : " days")
    }

    constructor(task: string, due: Date) {
        this.task = task;
        this.due = due;
    }
}

export const dueToday = (array: Array<Todo>): number => array.filter(date => date.due.getTime() - new Date().getTime() <= 86400000).length

