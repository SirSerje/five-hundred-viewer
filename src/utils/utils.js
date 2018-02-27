/**
 * Проверяем на наличие значений в объекте
 * @param value - входящий объект
 * @returns {boolean} - true / false ответ, содерижт ли что либо объект
 */
export function isEmptyObject(value) {
    return Object.keys(value).length === 0 && value.constructor === Object;
}