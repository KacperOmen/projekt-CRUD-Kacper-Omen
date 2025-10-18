import mongoose from "mongoose";

const ClientSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter Client name"],
        },

        surname: {
            type: String,
            required: [true, "Please enter Client surname"],
        },

        rental_period: {
            type: Number,
            required: [true, "Please enter Client rental_period"],
        },

        rental_date: {
            type: Date,
            required: [true, "Please enter rental_date"],
        },
    },
    {
        timestamps: true,
    }
)

const Client = mongoose.model("Client", ClientSchema);

export default Client