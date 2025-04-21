<template>
  <v-progress-linear v-if="showProgress" color="success" :model-value="segundos" :height="12"></v-progress-linear>

  <qrcode-stream :constraints="{ facingMode }" :formats="['qr_code']" :paused="false" @error="onError"
    @detect="onDetect" @camera-on="onCameraReady" @camera-off="onCameraOff">
  </qrcode-stream>

  <div class="text-center pa-4">
    <v-dialog v-model="showDialog" width="auto">
      <v-card max-width="400" prepend-icon="mdi-camera-outline" :text="error" title="Atención">
        <template v-slot:actions>
          <v-btn class="ms-auto" text="Aceptar" @click="cerrarDialogo()"></v-btn>
        </template>
      </v-card>
    </v-dialog>
  </div>

</template>

<script setup>
import { ref, watch, onMounted, computed } from 'vue'
//import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from 'vue-qrcode-reader'
import { useRouter } from 'vue-router'
import { useMenuStore } from "../stores/menu";

const menuStore = useMenuStore()
const router = useRouter()

const error = ref('')
const showDialog = ref(false)
const showProgress = ref(false)

const facingMode = 'environment'
const segundos = ref(100)
var intervalo = ref({})

onMounted(() => {

})

function onDetect(detectedCodes) {
  try {
    let pedidoLeidoTexto = detectedCodes.map((code) => code.rawValue);
    console.log(`Texto del QR: ${pedidoLeidoTexto}`);
    let pedidoLeidoArray = JSON.parse(pedidoLeidoTexto[0]);
    console.log(`Datos del QR: ${JSON.stringify(pedidoLeidoArray)}`);

    // console.log(`Pedido actual: ${JSON.stringify(menuStore.pedido)}`);

    for (let i = 0; i < pedidoLeidoArray.length; i++) {
      const itemPedidoLeido = pedidoLeidoArray[i];
      const itemEncontrado = menuStore.menuCompleto.find((itemMenuCompleto) => itemMenuCompleto.id == itemPedidoLeido.id);
      // console.log(`Item ${i} encontrado ${JSON.stringify(itemEncontrado)}`);
      if (itemEncontrado.favorito) { // El item ya existe en el pedido
        console.log(`Item ${i} encontrado => id: ${itemEncontrado.id}`);
        itemEncontrado.cantidad += itemPedidoLeido.cantidad;
      } else { // El item no existe en el pedido
        console.log(`Item ${i} No encontrado => id: ${itemEncontrado.id}`);
        itemEncontrado.favorito = true;
        itemEncontrado.cantidad = itemPedidoLeido.cantidad;
      }
      itemEncontrado.subtotal = (parseInt(itemEncontrado.cantidad) * parseFloat(itemEncontrado.precio)).toFixed(2);
    }

    menuStore.pedido = menuStore.menuCompleto.filter((item) => {
      return item.favorito == true;
    })

    menuStore.totalizar();

    router.push('/Pedido');
  } catch (error) {
    console.log("Error al leer el QR: " + error);
    clearInterval(intervalo);
    router.push('/Pedido');
  }
}

async function onCameraReady() {
  // NOTE: on iOS we can't invoke `enumerateDevices` before the user has given
  // camera access permission. `QrcodeStream` internally takes care of
  // requesting the permissions. The `camera-on` event should guarantee that this
  // has happened.
  const devices = await navigator.mediaDevices.enumerateDevices()
  const videoDevices = devices.filter(({ kind }) => kind === 'videoinput')

  error.value = ''
  showProgress.value = true;

  intervalo = setInterval(() => {
    segundos.value = segundos.value - 10;
    if (segundos.value <= 0) {
      clearInterval(intervalo);
      router.push('/Pedido');
    }
  }, 1000);

}

async function onCameraOff() {
  console.log("La cámara se apagó correctamente");
}

/*** track functons ***/

function paintOutline(detectedCodes, ctx) {
  for (const detectedCode of detectedCodes) {
    const [firstPoint, ...otherPoints] = detectedCode.cornerPoints

    ctx.strokeStyle = 'red'

    ctx.beginPath()
    ctx.moveTo(firstPoint.x, firstPoint.y)
    for (const { x, y } of otherPoints) {
      ctx.lineTo(x, y)
    }
    ctx.lineTo(firstPoint.x, firstPoint.y)
    ctx.closePath()
    ctx.stroke()
  }
}

function paintBoundingBox(detectedCodes, ctx) {
  for (const detectedCode of detectedCodes) {
    const {
      boundingBox: { x, y, width, height }
    } = detectedCode

    ctx.lineWidth = 2
    ctx.strokeStyle = '#007bff'
    ctx.strokeRect(x, y, width, height)
  }
}

function paintCenterText(detectedCodes, ctx) {
  for (const detectedCode of detectedCodes) {
    const { boundingBox, rawValue } = detectedCode

    const centerX = boundingBox.x + boundingBox.width / 2
    const centerY = boundingBox.y + boundingBox.height / 2

    const fontSize = Math.max(12, (50 * boundingBox.width) / ctx.canvas.width)

    ctx.font = `bold ${fontSize}px sans-serif`
    ctx.textAlign = 'center'

    ctx.lineWidth = 3
    ctx.strokeStyle = '#35495e'
    ctx.strokeText(detectedCode.rawValue, centerX, centerY)

    ctx.fillStyle = '#5cb984'
    ctx.fillText(rawValue, centerX, centerY)
  }
}

function onError(err) {
  clearInterval(intervalo);
  error.value = '';
  showDialog.value = true;
  showProgress.value = false;


  if (err.name === 'NotAllowedError') {
    error.value += 'Debe autorizar el acceso a la cámara'
  } else if (err.name === 'NotFoundError') {
    error.value += 'El dispositivo no posee una cámara'
  } else if (err.name === 'NotSupportedError') {
    error.value += 'Se requiere un contexto seguro (HTTPS, localhost)'
  } else if (err.name === 'NotReadableError') {
    error.value += 'La cámara ya está en uso'
  } else if (err.name === 'OverconstrainedError') {
    error.value += 'Las cámaras del dispositivo no son compatibles'
  } else if (err.name === 'StreamApiNotSupportedError') {
    error.value += 'Stream API no soportado'
  } else if (err.name === 'InsecureContextError') {
    error.value +=
      'El acceso a la cámara solo es permitido en un contexto seguro. Use HTTPS or localhost en lugar de HTTP.'
  } else {
    error.value += err.message
  }

}

function cerrarDialogo() {
  showDialog.value = false;
  router.push('/Pedido');
}
</script>

<style scoped>
.error {
  font-weight: bold;
  color: red;
}

.barcode-format-checkbox {
  margin-right: 10px;
  white-space: nowrap;
  display: inline-block;
}
</style>