import { isSafe } from 'redos-detector';
const validatePatternRegex = (param) => {
    for (const [key, value] of Object.entries(param)) {
        if (key.toLowerCase().includes('pattern')) {
            if (!isSafe(new RegExp(value)).safe) {
                return [
                    {
                        message: `${value} This pattern is not safe from ReDoS attacks`,
                    }
                ]
            }
        }
    }
}

export default validatePatternRegex
