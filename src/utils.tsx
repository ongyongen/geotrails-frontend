import React from "react";

export const dateFormatter = (date:string) => {
    if (date === undefined) {
        return ""
    } else {
        return date.split(" ")[0]
    }
}
