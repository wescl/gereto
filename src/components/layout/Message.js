import React, { useState, useEffect } from "react";
import styles from "./Message.module.scss";
import { MdError } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";

const Message = ({ message, customClass }) => {
    const [visible, setVisible] = useState(false);
    const [currentMessage, setCurrentMessage] = useState("");

    useEffect(() => {
        setVisible(true);
        setCurrentMessage(message);

        const timer = setTimeout(() => {
            setVisible(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, [message]);

    const getStyle = () => {
        switch (customClass) {
            case "success":
                return styles.success;
            case "error":
                return styles.error;
            default:
                return styles.default;
        }
    };

    const messageClasses = [styles.toast];

    if (visible) {
        messageClasses.push(styles.visible);
    }

    return (
        <div className={`${messageClasses.join(" ")} ${getStyle()}`}>
            <MdError className={styles.errorIcon} /><FaCheckCircle className={styles.successIcon} />{currentMessage}
        </div>
    );
};

export default Message;
