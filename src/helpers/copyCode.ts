export const copyCode = async (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const textToCopy = target.innerText; 
    try {
        await navigator.clipboard.writeText(textToCopy); 
        alert('Текст скопирован: ' + textToCopy); 
    } catch (err) {
        console.error('Ошибка при копировании: ', err); 
    }
}