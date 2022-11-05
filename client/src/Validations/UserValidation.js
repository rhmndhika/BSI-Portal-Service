import * as yup from "yup";

export const userSchema = yup.object().shape({
    email : yup.string().email().required(),
    invoiceNumber : yup.string().required(),
    invoiceDate : yup.date().required(),
    BuyerName : yup.string().required(),
    Amount : yup.number().required(),
    Subject : yup.string().required()
})