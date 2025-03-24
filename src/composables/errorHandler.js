import { ref } from 'vue'

export function useErrorHandler(error) {

  if (error == undefined) {
    return '';
  }

  const message = ref('')

  switch (error.code) {
    case "invalid_credentials":
      message.value = 'Las credenciales son incorrectas';
      break;

      case "user_already_exists":
        message.value = 'El usuario ya se encuentra registrado';
        break;      

    default:
      message.value = error.message;
      break;
  }

  return message.value
}