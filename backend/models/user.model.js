import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
    {
        login: {
            type: String,
            required: [true, "Please enter login"],
            unique: true,
        },
        email: {
            type: String,
            required: [true, "Please enter email"],
        },
        password: {
            type: String,
            required: [true, "Please enter password"],
        },
        role: {
            type: String,
            required: [true, "Please enter role (USER/ADMIN)"],
            enum: ["USER", "ADMIN"],
        }
    },
    {
        timestamps: true,
    },
)

const User = mongoose.model("User", UserSchema);

export default User