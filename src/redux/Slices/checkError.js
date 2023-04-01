//Функция проверки ошибок
function checkError(error_code, error_text) {
  if (error_code) {
    console.error(error_code, error_text);
    throw new Error(error_text);
  }
}
export default checkError;
