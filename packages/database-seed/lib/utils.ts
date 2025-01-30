import { faker } from "@faker-js/faker";
import { add } from "date-fns";


export const getToFromDate = () => {
const today = new Date();
const from = add(today, {
    months: faker.number.int({ min: -12, max: 12})
})
const to = add(from, {
    months: faker.number.int({ min: 1, max: 12})
})
return {
    from,
    to
}

}

export const getDateStatus = (date: Date, props: {
    to: Date,
    from: Date
}): 'before' | 'after' | 'between' => {
    if(date.getTime() < props.from.getTime()) {
        return 'before';
    }
    if(date.getTime() > props.to.getTime()) {
        return 'after';
    }
    return 'between';
}

export const isBetween = (date: Date, props: {
    to: Date,
    from: Date
}) => {
    return date.getTime() >= props.from.getTime() && date.getTime() <= props.to.getTime();
}