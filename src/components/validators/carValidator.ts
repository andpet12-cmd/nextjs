import Joi from "joi";

const carValidator = Joi.object({
    brand: Joi.string().pattern(new RegExp('^[a-zA-Zа-яА-яёЁіІїЇєЄҐґ]{1,20}$'))
        .messages({'string.pattern.base': 'Your brand value didnt match pattern'}),
    price: Joi.number().min(0).max(1000000).messages({
        "number.min": "min price is 0",
        "number.max": "max price is 1 000 000",
    }),
    year: Joi.number().min(1990).max(2024).messages({
        "number.min": "min year is 1990",
        "number.max": "max year is 2024",
    }),
})
export default carValidator;