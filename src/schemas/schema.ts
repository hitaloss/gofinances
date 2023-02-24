import * as yup from "yup"

export const categorySchema = yup.object().shape({
    name: yup.string().required("Nome é obrigatório"),
    amount: yup
    .number()
    .typeError("Informe um valor numérico")
    .positive("O valor deve ser positivo")
})