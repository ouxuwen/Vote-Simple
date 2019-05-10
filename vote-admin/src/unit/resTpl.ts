// 指定响应格式
export const RT = {
    success(data: any, message: any = "success") {
        return {
            code: 1,
            message: getMessage(message),
            data
        }
    },
    error(data: any, message: any = "error") {
        return {
            code: -1,
            message: getMessage(message),
            data
        }
    },
    warn(data: any, message: any = "warn") {
        return {
            code: 0,
            message: getMessage(message),
            data
        }
    },
}

function getMessage(message) {
    if (message && message['errors'] && message['errors'][0]['message']) {
        return message['errors'][0]['message'];
    } else if (message && message['message']) {
        return message['message'];
    } else {
        return message;
    }
}