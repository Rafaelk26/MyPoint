export function formatCPF(CPF){

    const firstPart = CPF.slice(0, 3);
    const secondPart = CPF.slice(3, 6);
    const thirdPart = CPF.slice(6, 9);
    const fouryPart = CPF.slice(9, 11);

    return `${firstPart}.${secondPart}.${thirdPart}-${fouryPart}`;
}