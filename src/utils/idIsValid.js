import mongoose from "mongoose";

export default function(id) {
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return false;
    }
    return true;
}