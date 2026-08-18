const names = ['Entrada', 'Almoço (Ida)', 'Almoço (Volta)', 'Saída'];

export function alternateName(type){
    if(type === 'entry' || type === "Entrada"){
        return names[0];
    }
    else if(type === 'lunch_start' || type === "Almoço (Ida)"){
        return names[1];
    }
    else if(type === 'lunch_end' || type === "Almoço (Volta)"){
        return names[2];
    }
    else {
        return names[3];
    }
}