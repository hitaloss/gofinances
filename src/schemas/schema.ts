import * as yup from "yup"

export const categorySchema = yup.object().shape({
    name: yup.string().required("Nome é obrigatório"),
    amount: yup
    .number()
    .required("Preço é obrigatório")
    .typeError("Informe um valor numérico")
    .positive("O valor deve ser positivo")
})