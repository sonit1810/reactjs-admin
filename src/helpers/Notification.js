import { notification, message } from 'antd';
import React from "react";
message.config({
    top: 100,
    duration: 2,
    maxCount: 1,
});


class Notification {
    success(msg) {
        // notification.success({
        //     message: msg,
        //     duration: 5,
        // });
        message.success(msg);
    }
    error(msg) {
        let i = 0;
        if (Array.isArray(msg)) {
            // notification.error({
            //     message: msg.map((item) => {
            //         i++;
            //         return (<div key={i}>{item}</div>);
            //     }),
            //     duration: 4,
            // });
            message.error(
                msg.map((item) => {
                    i++;
                    return (<div key={i}>{item}</div>);
                })
            );
        } else {
            // notification.error({
            //     message: msg,
            //     duration: 4,
            // });
            message.error(msg);
        }

    }
    warning(msg) {
        // notification.warning({
        //     message: msg,
        //     duration: 4,
        // });
        message.warning(msg);
    }
    info(msg) {
        // notification.info({
        //     message: msg,
        //     duration: 4,
        // });
        message.info(msg);
    }
}

export default new Notification();