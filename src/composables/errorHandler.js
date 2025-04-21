import { ref } from 'vue';

export function useErrorHandler(error) {
  if (error == undefined) {
    return '';
  }

  const message = ref('');

  switch (error.code) {
    case 'invalid_credentials':
      message.value = 'Las credenciales son incorrectas';
      break;

    case 'user_already_exists':
      message.value = 'El usuario ya se encuentra registrado';
      break;

    case '23502': // null value in column "user_id" of relation "..." violates not-null constraint
      message.value = 'Debe iniciar sesión';
      break;

    case '23503': // Error de foreing key
      message.value =
        'No es posible eliminar la Categoría ya que está siendo utilizada por un Item';
      break;

      case '23514': // new row for relation "Empresa" violates check constraint "username_length"
      message.value =
        'Error al actualizar los datos';
      break;
      23514

    case '42501': // new row violates row-level security policy for table ...'
      message.value = 'Debe iniciar sesión';
      break;

    default:
      message.value = error.message;
      break;
  }

  return message.value;
}