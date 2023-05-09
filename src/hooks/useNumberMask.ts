import { createNumberMask } from "text-mask-addons"

export const useNumberMask = () => {
    const numberMask = createNumberMask({
        prefix: "",
        suffix: "",
        thousandsSeparatorSymbol: ".",
        decimalSymbol: ",",
        allowDecimal: false,
        decimalLimit: 2,
        integerLimit: 3,
        allowNegative: false,
        allowLeadingZeroes: false,
    })

    return numberMask
}
