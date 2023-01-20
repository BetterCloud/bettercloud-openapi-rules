
const safe = require('safe-regex');
const validatePatternRegex = (item) => {
    if (item.pattern != null) {
        if (!safe(item.pattern)) {
            return [
                {
                    message: `${item.pattern} Possible Unsafe Regular Expression`,
                },
            ];
        }
    }
}