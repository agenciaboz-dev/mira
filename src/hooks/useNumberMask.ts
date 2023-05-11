import { createNumberMask } from "text-mask-addons"

export const useNumberMask = (limit: number = 0) => {
    const numberMask = createNumberMask({
        prefix: "",
        suffix: "",
        thousandsSeparatorSymbol: ".",
        decimalSymbol: ",",
        allowDecimal: false,
        decimalLimit: 2,
        integerLimit: limit,
        allowNegative: false,
        allowLeadingZeroes: false,
    })

    return numberMask
}
