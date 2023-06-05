import { createNumberMask } from "text-mask-addons"

export const useNumberMask = (limit: number = 0, allowLeadingZeroes = false, thousandsSeparatorSymbol = ".") => {
    const numberMask = createNumberMask({
        prefix: "",
        suffix: "",
        thousandsSeparatorSymbol: thousandsSeparatorSymbol,
        decimalSymbol: ",",
        allowDecimal: false,
        decimalLimit: 2,
        integerLimit: limit,
        allowNegative: false,
        allowLeadingZeroes: allowLeadingZeroes,
    })

    return numberMask
}
